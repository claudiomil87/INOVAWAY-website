# Security Audit Report — INOVAWAY Website

**Target:** https://inovaway.org (teste: https://lawyers-specifics-section-hydraulic.trycloudflare.com)  
**Projeto:** `/home/ubuntu/projects/INOVAWAY-website`  
**Date:** 2026-03-05  
**Auditor:** Shield 🛡️  
**Stack:** Next.js 16.1.6 · React 19.2.3 · TypeScript · Tailwind v4 · Cloudflare Tunnel

---

## Findings Summary

| # | Severidade | Issue | Local | Status |
|---|-----------|-------|-------|--------|
| 1 | 🟠 HIGH | Ausência total de HTTP Security Headers | next.config.ts | ❌ Aberto |
| 2 | 🟠 HIGH | Formulário de contato sem backend — dados do usuário perdidos | contato/page.tsx | ❌ Aberto |
| 3 | 🟡 MEDIUM | `x-powered-by: Next.js` — technology disclosure | next.config.ts | ❌ Aberto |
| 4 | 🟡 MEDIUM | `dangerouslySetInnerHTML` para JSON-LD (padrão, mas monitorar) | layout.tsx | ⚠️ Monitorar |
| 5 | 🔵 LOW | CNPJ exposto no bundle client-side | Footer.tsx | ⚠️ Intencional |
| 6 | 🔵 LOW | Sem validação de formato de telefone/email no formulário | contato/page.tsx | ❌ Aberto |
| 7 | ⚪ INFO | npm audit: 0 vulnerabilidades | package.json | ✅ OK |
| 8 | ⚪ INFO | Source maps não expostos em produção | /_next/static/ | ✅ OK |
| 9 | ⚪ INFO | Nenhum arquivo .env commitado no git | git history | ✅ OK |
| 10 | ⚪ INFO | Sem API routes — nenhuma surface de ataque server-side | src/app/ | ✅ OK |

---

## Finding Details

---

### [#1] 🟠 HIGH — Ausência total de HTTP Security Headers

**Descrição:**  
Nenhum header de segurança está sendo enviado pelo servidor. A resposta HTTP atual contém apenas:
```
content-type: text/html; charset=utf-8
cache-control: no-store, must-revalidate
x-powered-by: Next.js   ← tecnologia exposta
```

Headers ausentes:
- ❌ `Content-Security-Policy` — permite XSS irrestrito
- ❌ `X-Frame-Options` — permite clickjacking (iframe do site em domínios maliciosos)
- ❌ `X-Content-Type-Options` — permite MIME-type sniffing
- ❌ `Strict-Transport-Security` — sem proteção contra downgrade HTTP
- ❌ `Referrer-Policy` — URL completa vazada em requisições externas
- ❌ `Permissions-Policy` — câmera, microfone, geolocalização sem restrição

**Impacto:**  
- Atacante pode embedar o site em iframe para ataques de clickjacking
- Sem CSP, scripts injetados por extensões de browser ou third-parties rodam sem restrição
- URL de páginas internas vaza para serviços externos via Referer header

**Reprodução:**
```bash
curl -sI https://inovaway.org | grep -iE "content-security|x-frame|x-content|strict-transport|referrer|permissions"
# Resultado esperado: nenhuma linha (headers ausentes)
```

**Fix — Implementar no `next.config.ts`:**

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts (necessário para hidratação)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Fontes Google (Inter, JetBrains Mono)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Imagens: self + data: (para base64) + cloudflare
      "img-src 'self' data: https:",
      // Conexões permitidas (WhatsApp link, analytics futuros)
      "connect-src 'self'",
      // Frames: apenas SAMEORIGIN
      "frame-ancestors 'self'",
      // Formulários só submetem para o próprio domínio
      "form-action 'self'",
      // Base URI restrita
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // Remove "x-powered-by: Next.js"
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

> **Nota sobre CSP:** `unsafe-inline` e `unsafe-eval` em `script-src` são necessários para o Next.js App Router funcionar. Para um CSP mais restrito, usar nonces (complexidade extra). Para o nível atual do projeto, a config acima é adequada.

---

### [#2] 🟠 HIGH — Formulário de contato sem backend (dados perdidos)

**Descrição:**  
O formulário em `/contato` captura nome, email, telefone, empresa, serviços desejados, mensagem e orçamento — mas ao submeter, **os dados não são enviados a lugar nenhum**. A função `handleSubmit` apenas seta `submitted = true`:

```typescript
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitted(true);  // ← dados evaporam aqui
}
```

**Impacto:**  
- Prospects que preenchem o formulário **nunca recebem resposta** (os dados são descartados)
- Problema de negócio direto: perda de leads
- Do ponto de vista de segurança: indica que a implementação está incompleta, o que pode sugerir que futuras adições de backend serão feitas às pressas sem controles de segurança

**Fix — Opção 1: Integrar com Formspree (rápido, sem backend):**

```typescript
// src/app/contato/page.tsx
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  const res = await fetch("https://formspree.io/f/SEU_FORM_ID", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (res.ok) {
    setSubmitted(true);
  } else {
    // Mostrar erro ao usuário
    alert("Erro ao enviar. Tente o WhatsApp!");
  }
}
```

**Fix — Opção 2: API Route Next.js + Envio por email (Resend/Nodemailer):**

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // Validação server-side
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  // Enviar via Resend, Nodemailer, etc.
  // await sendEmail({ to: "inovaway@inovaway.org", ...body });
  
  return NextResponse.json({ success: true });
}
```

> **Segurança adicional ao implementar API Route:** adicionar rate limiting (ex: `@upstash/ratelimit`) e verificação de CSRF com `SameSite=Strict` no cookie.

---

### [#3] 🟡 MEDIUM — Technology Disclosure via `x-powered-by`

**Descrição:**  
O header `x-powered-by: Next.js` está presente em todas as respostas HTTP, revelando o framework utilizado e potencialmente a versão — facilitando ataques direcionados caso CVEs sejam publicados para a versão em uso.

**Impacto:** Baixo isolado, mas reduz a eficácia de "security through obscurity" e facilita fingerprinting.

**Fix:** Uma linha no `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  poweredByHeader: false, // ← adicionar isso
  // ...
};
```

---

### [#4] 🟡 MEDIUM — `dangerouslySetInnerHTML` para JSON-LD (monitorar)

**Descrição:**  
Em `layout.tsx`, dois blocos de JSON-LD (Schema.org) são injetados via `dangerouslySetInnerHTML`:

```typescript
<Script
  id="schema-organization"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

**Avaliação atual:** ✅ SEGURO — os objetos `organizationSchema` e `websiteSchema` são constantes estáticas hardcoded, sem input de usuário. `JSON.stringify` sanitiza automaticamente caracteres especiais. Não há risco de XSS aqui.

**Risco futuro:** Se qualquer campo desses schemas passar a ser dinâmico (ex: vindo de CMS, banco de dados, query params), o risco de XSS se torna real.

**Recomendação:** Manter como está, mas documentar que esses schemas devem permanecer estáticos ou ter sanitização explícita se tornarem dinâmicos.

---

### [#5] 🔵 LOW — CNPJ exposto no bundle client-side

**Descrição:**  
O CNPJ `18.652.375/0001-00` está hardcoded no `Footer.tsx` e é entregue ao browser em cada page load:

```typescript
© {currentYear} INOVAWAY — CNPJ 18.652.375/0001-00
```

**Avaliação:** Para empresas brasileiras, exibir o CNPJ no site é **exigência legal** (Lei nº 12.965/2014, Marco Civil da Internet, e normas do CDC). Portanto isso é intencional e correto do ponto de vista legal.

**Impacto real:** Nenhum. Apenas registrado para consciência.

---

### [#6] 🔵 LOW — Validação de formulário apenas via atributos HTML5

**Descrição:**  
O formulário de contato usa `required` e `type="email"` do HTML5 para validação, mas não há validação programática (JavaScript) nem, por enquanto, server-side. Isso significa que a validação pode ser bypassada desabilitando JavaScript ou interceptando a requisição.

**Impacto atual:** Baixo, pois o formulário não tem backend ainda. Crítico quando o backend for implementado.

**Fix ao implementar backend:**

```typescript
// Validação client-side (além do HTML5):
function validateForm(data: FormData): string | null {
  const email = data.get("email") as string;
  const name = data.get("name") as string;
  const message = data.get("message") as string;
  
  if (!name.trim() || name.length < 2) return "Nome inválido";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email inválido";
  if (!message.trim() || message.length < 10) return "Mensagem muito curta";
  if (message.length > 5000) return "Mensagem muito longa";
  
  return null; // válido
}
```

---

## Análise por Área

### ✅ Dependências (npm audit)

```
0 vulnerabilities found
```

- **Next.js 16.1.6** — versão atual em uso ✅
- **React 19.2.3** — versão atual ✅  
- **Framer Motion 12.x** — sem CVEs conhecidos ✅
- **Radix UI 1.x** — sem CVEs conhecidos ✅
- Nenhuma dependência com vulnerabilidade publicada

**Recomendação:** Configurar GitHub Dependabot ou `npm audit` no CI/CD para alertas automáticos.

---

### ✅ Source Maps

Source maps não estão acessíveis publicamente:

```
GET /_next/static/chunks/main.js.map → 404
```

Next.js, por padrão, não gera source maps em `next build`. Código-fonte não está exposto. ✅

---

### ✅ Informações Sensíveis

- Nenhum arquivo `.env` commitado no repositório git ✅
- Histórico git limpo — sem secrets acidentais em commits anteriores ✅
- Nenhuma API key, token, ou credencial no código-fonte ✅
- `NEXT_PUBLIC_*` vars: nenhuma variável de ambiente usada ✅

---

### ✅ API Routes

Não há nenhuma API route em `src/app/api/`. Portanto:
- Sem surface de ataque server-side ✅
- Sem necessidade de rate limiting (por enquanto) ✅
- Sem validação server-side necessária (por enquanto) ✅

> ⚠️ Quando o formulário de contato for integrado com um backend, criar API route com rate limiting e validação completa.

---

### ⚠️ Formulário de Contato — Análise CSRF/XSS

**XSS:** Risco BAIXO. Os inputs não são renderizados de volta no DOM de forma insegura. React escapa automaticamente o conteúdo de JSX. O `submitted = true` apenas mostra uma mensagem estática.

**CSRF:** N/A por enquanto — não há backend. Quando houver, implementar com `SameSite=Strict` nos cookies de sessão.

**Injection:** N/A — sem banco de dados ou processamento server-side.

---

## Configuração Recomendada para Produção

### `next.config.ts` — Versão final segura

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Garantir que source maps não são gerados em produção
  productionBrowserSourceMaps: false,
};

export default nextConfig;
```

---

### Checklist de Segurança Pré-Produção

- [ ] **[#1]** Implementar security headers no `next.config.ts` (código acima)
- [ ] **[#2]** Integrar formulário de contato com backend (Formspree ou API Route)
- [ ] **[#3]** Remover `x-powered-by` via `poweredByHeader: false`
- [ ] Configurar Dependabot ou `npm audit` no CI/CD
- [ ] Ao adicionar analytics/GTM: atualizar CSP para incluir os domínios necessários
- [ ] Ao implementar backend: adicionar rate limiting + validação server-side
- [ ] Verificar Cloudflare WAF rules na conta de produção
- [ ] Testar headers com [securityheaders.com](https://securityheaders.com) após deploy

---

## Score de Segurança Atual

| Categoria | Score | Nota |
|-----------|-------|------|
| HTTP Headers | 1/10 | Nenhum header de segurança |
| Dependências | 10/10 | 0 vulnerabilidades |
| Source Maps | 10/10 | Não expostos |
| Secrets/Env | 10/10 | Limpo |
| Formulário | 3/10 | Sem backend, sem validação |
| Configuração Next.js | 1/10 | Config praticamente vazia |
| **TOTAL** | **5.8/10** | Aceitável para dev, inadequado para prod |

**Score estimado pós-fix:** 8.5/10

---

*Auditoria realizada por Shield 🛡️ — "Não encontrei vulnerabilidades críticas... por enquanto."*  
*Para dúvidas ou reteste após fixes: reportar ao squad via Discord.*
