# 🔬 QA Report — INOVAWAY Website

**Executado por:** Lens (QA Frontend Agent)
**Data:** 2026-03-05
**URL testada:** https://lawyers-specifics-section-hydraulic.trycloudflare.com
**Projeto:** /home/ubuntu/projects/INOVAWAY-website
**Ambiente:** Next.js em modo **DEV** (`next dev -p 3002`) via Cloudflare Tunnel

---

## ⚠️ Nota Importante — Ambiente de Teste

O site está sendo servido em modo **desenvolvimento** (`next dev`), não produção. Isso significa:
- Performance será significativamente inferior ao que será em produção
- O indicador de desenvolvimento do Next.js (botão "N" flutuante) está visível
- Hot-reload ativo pode afetar comportamento durante testes
- **Recomendação:** Testar produção com `next build && next start` antes de lançar

---

## 📊 Resumo Executivo

| Severidade | Quantidade |
|-----------|-----------|
| 🔴 Critical | 4 |
| 🟠 High | 6 |
| 🟡 Medium | 8 |
| 🟢 Low | 5 |
| **Total** | **23** |

### Resultado por Página
| Página | Visual | Acessibilidade | Performance | Funcionalidade |
|--------|--------|----------------|-------------|----------------|
| `/` Home | 🟡 | 🟠 | 🔴 | 🟡 |
| `/servicos` | 🟡 | 🟡 | 🔴 | ✅ |
| `/produtos` | 🟡 | 🟡 | 🔴 | 🟡 |
| `/sobre` | 🟡 | 🟠 | 🔴 | 🟡 |
| `/contato` | ✅ | 🟡 | 🔴 | ✅ |

---

## 🔴 CRITICAL — Bloqueadores de Produção

---

### [C-01] Imagens dos Squad Avatars com tamanho absurdo
**Severidade:** 🔴 Critical
**Páginas:** `/` (Home), `/sobre`
**Viewports:** Todos

**Problema:**
Todos os 8 avatars dos AI Agents são arquivos PNG gigantescos:
```
arch-avatar.png   → 8.3MB
forge-avatar.png  → 7.6MB
lens-avatar.png   → 6.6MB
nova-avatar.png   → 7.1MB
pixel-avatar.png  → 7.2MB
scout-avatar.png  → 7.7MB
shield-avatar.png → 7.2MB
spark-avatar.png  → 7.4MB
TOTAL             → ~59MB apenas para avatars!
```

Um usuário mobile carregando a home page (com SquadSection) ou a página /sobre vai baixar dezenas de MB de imagens. Isso causa:
- LCP (Largest Contentful Paint) catastrófico
- Time-to-Interactive enorme
- Bounce rate altíssimo em mobile
- Custo de banda desnecessário

**Fix:**
```bash
# Compactar cada avatar para WebP com qualidade 80:
cd /home/ubuntu/projects/INOVAWAY-website/public/squad/
for img in *.png; do
  cwebp -q 80 "$img" -o "${img%.png}.webp"
done
# Resultado esperado: < 200KB por avatar (redução de ~97%)
```

No código, usar WebP com fallback:
```tsx
// Em SquadSection.tsx e AgentCard.tsx
<Image
  src={agent.avatar.replace('.png', '.webp')}
  alt={`${agent.name} avatar`}
  fill
  className="object-cover"
  sizes="80px"
  loading="lazy"
  quality={80}
/>
```
Ou simplesmente configurar o `next.config.ts` para converter automaticamente:
```js
// next.config.ts
images: {
  formats: ['image/webp'],
}
```

---

### [C-02] Stats Counter exibe "0" em vez de "8"
**Severidade:** 🔴 Critical
**Página:** `/` (Home)
**Viewports:** Todos

**Problema:**
A seção "Números que falam" exibe `0` no lugar de `8` para o contador de "AI Agents especializados". O contador animado usa `useInView` + Framer Motion, mas ao capturar a página o valor inicial `0` é exibido antes da animação disparar.

Screenshot evidência — accessibility snapshot retornou:
```
text: "0"
paragraph: AI Agents especializados
```

Em produção, usuários com scroll rápido ou conexão lenta podem ver o valor `0` congelado.

**Fix:**
```tsx
// Em StatsSection.tsx — iniciar com o valor final se já visível
// Adicionar threshold adequado no viewport
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.5 }} // aguarda 50% visível
>
```
Ou usar `useEffect` com `requestAnimationFrame` para garantir o valor correto:
```tsx
// Alternativa mais robusta:
const [count, setCount] = useState(numeric);
// Começar do valor real, animar para cima apenas se quiser efeito
```

---

### [C-03] Links do Footer (LinkedIn/Instagram) apontam para homepages genéricas
**Severidade:** 🔴 Critical
**Páginas:** Todas (Footer está no layout)

**Problema:**
Os links de redes sociais no footer apontam para:
- `https://linkedin.com` ← homepage genérica do LinkedIn
- `https://instagram.com` ← homepage genérica do Instagram

Esses links são **placeholder** — não levam à página real da INOVAWAY.

Além disso, as imagens dos ícones sociais não têm texto alternativo adequado na accessibility tree (aparecem como `img` sem alt).

**Fix:**
```tsx
// Em Footer.tsx — atualizar os hrefs:
const socialLinks = [
  { href: "https://linkedin.com/company/inovaway", icon: LinkedinIcon, label: "LinkedIn da INOVAWAY" },
  { href: "https://instagram.com/inovaway", icon: InstagramIcon, label: "Instagram da INOVAWAY" },
];

// E adicionar aria-label nos links:
<Link href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
  <link.icon />
</Link>
```

---

### [C-04] Botão fechar do Modal sem aria-label
**Severidade:** 🔴 Critical
**Página:** `/sobre` (Modal dos Agents)

**Problema:**
O botão de fechar o modal em `AgentModal.tsx` não tem `aria-label`:
```tsx
// Linha 32 em AgentModal.tsx — ATUAL (problema):
<button onClick={onClose} className="...">
  ×
</button>
```
O `×` é apenas um caractere visual — leitores de tela vão anunciar "botão" sem contexto.

**Fix:**
```tsx
<button
  onClick={onClose}
  aria-label="Fechar modal"
  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
>
  <span aria-hidden="true">×</span>
</button>
```

---

## 🟠 HIGH — Problemas Sérios

---

### [H-01] Site servido em modo DEV — não usar em produção
**Severidade:** 🟠 High
**Páginas:** Todas

**Problema:**
O servidor roda `next dev` (`/home/ubuntu/projects/INOVAWAY-website/node_modules/.bin/next dev -p 3002`). Modo dev:
- Performance 5-10x pior que produção
- Hot Module Replacement ativo (instável sob carga)
- Sem otimizações de bundle
- Indicador flutuante do Next.js visível ("N")
- Source maps completos expostos

**Fix:**
```bash
cd /home/ubuntu/projects/INOVAWAY-website
npm run build
pm2 start "npm run start" --name inovaway-website
# ou
next start -p 3002
```

---

### [H-02] Navbar se sobrepõe ao conteúdo durante scroll
**Severidade:** 🟠 High
**Páginas:** `/servicos`, `/contato`, `/sobre`, `/produtos`
**Viewports:** Desktop

**Problema:**
Durante o scroll, a navbar sticky com `backdrop-blur-md` e `bg-navy/90` (semi-transparente) permite que o conteúdo "vaze" por baixo dela, criando sobreposição visual ilegível. Em alguns estados capturados nos screenshots, os cards de serviços e informações do WhatsApp ficaram ocultos sob a navbar.

**Causa provável:** O `bg-navy/90` (90% de opacidade) não garante opacidade total, e o `backdrop-blur` sem fundo sólido pode criar artefatos visuais.

**Fix:**
```tsx
// Em Header.tsx — linha atual:
className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/90 backdrop-blur-md"

// Fix — aumentar opacidade:
className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/95 backdrop-blur-md"
// Ou usar opacidade total em scroll:
// Adicionar listener de scroll para mudar para bg-navy quando scrolled > 0
```

---

### [H-03] Framer Motion `whileInView` — cards invisíveis em renderização rápida
**Severidade:** 🟠 High
**Páginas:** `/sobre` (AgentCards), `/` (ServicesSection, BenefitsSection)
**Viewports:** Todos

**Problema:**
Todos os cards/seções usam:
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

Quando o IntersectionObserver não dispara (scroll rápido, headless browsers, problemas de viewport), os elementos ficam em `opacity: 0` permanentemente. Usuários que fazem scroll muito rápido podem ver conteúdo vazio.

Adicionalmente, nenhum componente respeita `prefers-reduced-motion`.

**Fix:**
```tsx
// Adicionar fallback CSS para garantir visibilidade:
// Em globals.css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// Em cada componente animado:
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }} // threshold menor = dispara mais cedo
>
```

---

### [H-04] Indicadores de foco (focus rings) insuficientes
**Severidade:** 🟠 High
**Páginas:** Todas
**WCAG:** 2.4.7 (Focus Visible) — Nível AA

**Problema:**
O `globals.css` define apenas `outline-ring/50` como estilo de foco padrão. Elementos interativos (botões, links, inputs) não têm focus rings claramente visíveis sobre fundos escuros. Em temas dark com cores sutis, o indicador de foco padrão do navegador pode ser invisível ou quase invisível.

**Fix:**
```css
/* Em globals.css — adicionar focus rings consistentes */
:focus-visible {
  outline: 2px solid #06B6D4; /* cyan — cor da marca */
  outline-offset: 3px;
  border-radius: 4px;
}

/* Para botões específicos */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #06B6D4;
  outline-offset: 3px;
}
```

---

### [H-05] Imagem de logo no footer sem alt text nas redes sociais
**Severidade:** 🟠 High
**Páginas:** Todas (Footer)

**Problema:**
Os ícones de LinkedIn e Instagram no footer são `<img>` dentro de links sem texto alternativo adequado. A accessibility tree mostra `img` sem descrição dentro de links "LinkedIn" e "Instagram" — mas o texto visível do link NÃO está no código, vem do aria tree provavelmente via atributo `alt` vazio ou ausente.

**Fix:**
```tsx
// Em Footer.tsx
<Link href={socialLink.href} aria-label={`${socialLink.name} da INOVAWAY`} target="_blank">
  <Image src={socialLink.icon} alt="" aria-hidden="true" width={24} height={24} />
</Link>
```

---

### [H-06] Formulário de contato — botões de chips sem role adequado
**Severidade:** 🟠 High
**Página:** `/contato`
**WCAG:** 4.1.2 (Name, Role, Value) — Nível AA

**Problema:**
Os chips/botões de seleção ("Criação de site", "Funil de vendas", etc.) e chips de orçamento são `<button>` mas não indicam seu estado selecionado para tecnologias assistivas. Um usuário de leitor de tela não sabe se o chip está selecionado ou não.

**Fix:**
```tsx
// Em contato/page.tsx — adicionar aria-pressed para chips toggle
<button
  onClick={() => toggleService(service)}
  aria-pressed={selectedServices.includes(service)}
  className={`... ${selectedServices.includes(service) ? 'ring-2 ring-cyan' : ''}`}
>
  {service}
</button>
```

---

## 🟡 MEDIUM — Melhorias Necessárias

---

### [M-01] Contraste de texto secundário — marginal para WCAG AA
**Severidade:** 🟡 Medium
**Páginas:** Todas
**WCAG:** 1.4.3 (Contrast) — Nível AA

**Problema:**
Textos em `text-white/60` e `text-white/50` sobre fundo `bg-navy` (#0F172A ≈ RGB 15,23,42) têm contraste estimado de 3.0–3.8:1. O mínimo WCAG AA para texto normal é 4.5:1.

Elementos afetados:
- Subtítulo do hero: "AI Agents autônomos trabalhando 24/7..."
- Parágrafos de descrição em cards
- Textos de role dos agents (white/50)
- Textos de ajuda no formulário de contato

**Fix:**
```tsx
// Substituir white/60 e white/50 por tonalidades com maior contraste:
// white/70 sobre bg-navy → ~4.8:1 ratio ✅
// white/80 sobre bg-navy → ~6.1:1 ratio ✅

// Em globals.css adicionar tokens:
.text-muted { @apply text-white/75; } /* substitui white/60 em textos corporais */
```

---

### [M-02] Home page — serviços truncados (mostra 4 de 13)
**Severidade:** 🟡 Medium
**Página:** `/` (Home)

**Problema:**
A `ServicesSection` na home page exibe apenas os 4 primeiros serviços, com um link "Ver todos os serviços →". No entanto, o accessibility snapshot não mostra heading para todos os 13 serviços listados em `/servicos`. Confirmar se é intencional truncar em 4 na home.

Se for intencional: adicionar contagem explícita ("Veja todos os 13 serviços →").

**Fix (se intencional — melhoria de copy):**
```tsx
<Link href="/servicos">
  Ver todos os {allServices.length} serviços →
</Link>
```

---

### [M-03] Sem "skip to content" link para navegação por teclado
**Severidade:** 🟡 Medium
**Páginas:** Todas
**WCAG:** 2.4.1 (Bypass Blocks) — Nível A

**Problema:**
Não há link "Pular para o conteúdo principal" no início da página. Usuários de teclado/screen reader precisam navegar por todos os itens do header (logo + 4 links + CTA) em cada página.

**Fix:**
```tsx
// Em layout.tsx — antes do <Header />:
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-cyan focus:text-navy focus:px-4 focus:py-2 focus:rounded"
>
  Pular para o conteúdo
</a>

// E no main:
<main id="main-content" className="flex-1">{children}</main>
```

---

### [M-04] Links de navegação sem estado ativo
**Severidade:** 🟡 Medium
**Páginas:** Todas

**Problema:**
Os links de navegação no header (`/servicos`, `/produtos`, `/sobre`, `/contato`) não mostram estado ativo quando na página correspondente. Um usuário não tem indicação visual de onde está no site.

**Fix:**
```tsx
// Em Header.tsx — usar usePathname() do next/navigation:
import { usePathname } from "next/navigation";

const pathname = usePathname();

<Link
  href={link.href}
  className={`text-sm font-medium transition-colors hover:text-cyan ${
    pathname === link.href ? "text-cyan font-semibold" : "text-white/70"
  }`}
  aria-current={pathname === link.href ? "page" : undefined}
>
  {link.label}
</Link>
```

---

### [M-05] Placeholder de contraste baixo nos inputs do formulário
**Severidade:** 🟡 Medium
**Página:** `/contato`
**WCAG:** 1.4.3

**Problema:**
Textos de placeholder ("Seu nome", "seu@email.com", etc.) sobre fundo escuro dos inputs têm contraste estimado de ~2.5:1, abaixo do mínimo de 4.5:1 para texto normal.

Nota: WCAG 2.1 não exige que placeholder atinja 4.5:1, mas é recomendado para usabilidade.

**Fix:**
```css
/* Em globals.css */
input::placeholder, textarea::placeholder {
  color: rgba(255, 255, 255, 0.55); /* ~4.5:1 sobre bg dark */
}
```

---

### [M-06] Produtos `/produtos` — segundo produto (HNBCRM) aparece inconsistentemente
**Severidade:** 🟡 Medium
**Página:** `/produtos`

**Problema:**
Nos screenshots, o HNBCRM (segundo produto) não aparecia em alguns viewpoints mas aparecia em outros. A página usa `"use client"` com componentes de lista estáticos, então não deveria ser um problema de carregamento assíncrono. Pode ser um problema com a altura do container e scroll insuficiente nos testes. 

Verificar se há algum `whileInView` que não dispara para o segundo produto na lista.

**Fix:**
Verificar se `hnbcrmFeatures` e a seção correspondente têm o mesmo padrão de animação `whileInView` e testar o scroll em produção.

---

### [M-07] Ícones de emoji — inconsistência cross-platform
**Severidade:** 🟡 Medium
**Páginas:** `/servicos`, `/produtos`, `/sobre`, `/`

**Problema:**
Todos os ícones de features/valores usam emojis Unicode (🌐, 🤖, ⚙️, 🧠, etc.). Emojis renderizam de forma completamente diferente entre:
- macOS vs Windows vs Android vs iOS
- Diferentes versões de SO
- Screen readers anunciam nomes de emojis completos ("Global com meridianos" em vez de "Web")

**Fix:**
Substituir emojis por ícones SVG do Lucide React (já instalado):
```tsx
import { Globe, Bot, Zap, Brain } from "lucide-react";
// Adicionar aria-hidden="true" e usar label separado
<Globe className="w-6 h-6 text-cyan" aria-hidden="true" />
<span>Criação de Sites</span>
```

---

### [M-08] Links sociais do footer com URLs de placeholder e faltando `rel="noopener"`
**Severidade:** 🟡 Medium  
**Páginas:** Todas (Footer)

**Problema:**
Além dos links incorretos (já reportado em C-03), os links externos abrindo em `target="_blank"` sem `rel="noopener noreferrer"` são uma vulnerabilidade de segurança (tab-napping) e uma falha de SEO.

**Fix:**
```tsx
<Link
  href="https://linkedin.com/company/inovaway"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn da INOVAWAY"
>
```

---

## 🟢 LOW — Melhorias de Polimento

---

### [L-01] Hierarquia de headings — h1 duplicado na /sobre
**Severidade:** 🟢 Low
**Página:** `/sobre`

**Problema:**
A página `/sobre` tem **dois** `<h1>`:
1. "Não somos uma agência. Somos um movimento." (layout principal)
2. "INOVAWAY ELITE SQUAD" (no componente EliteSquadSection)

WCAG recomenda um único `<h1>` por página.

**Fix:**
Mudar o heading "INOVAWAY ELITE SQUAD" para `<h2>` no `SquadHero.tsx`.

---

### [L-02] Área de toque dos links do footer — menor que 44x44px no mobile
**Severidade:** 🟢 Low
**Páginas:** Todas (Footer)
**WCAG:** 2.5.5 (Target Size) — Nível AAA

**Problema:**
Os links de texto do footer ("Sobre Nós", "Serviços", "Produtos", etc.) no mobile têm área de toque estimada em ~20-24px de altura, abaixo do mínimo recomendado de 44x44px.

**Fix:**
```css
/* Em Footer.tsx — adicionar padding aos links */
footer a {
  @apply py-2 inline-block; /* mínimo 44px com line-height adequado */
  min-height: 44px;
  display: flex;
  align-items: center;
}
```

---

### [L-03] Copyright e CNPJ em fonte muito pequena
**Severidade:** 🟢 Low
**Páginas:** Todas (Footer)

**Problema:**
O texto de copyright "© 2026 INOVAWAY — CNPJ 18.652.375/0001-00" e o endereço estão em fonte muito pequena no mobile, praticamente ilegível.

**Fix:**
```tsx
// Em Footer.tsx — garantir mínimo de 12px (0.75rem):
<p className="text-xs text-white/40 mt-4">  // text-xs = 12px ✅
```
Verificar se a classe atual não é `text-[10px]` ou menor.

---

### [L-04] Favicon e OG Image
**Severidade:** 🟢 Low
**Páginas:** Todas

**Problema:**
O `favicon.ico` existe em `/public` mas não foi verificado se existe um `og-image.png` (referenciado no metadata do `layout.tsx` como `/og-image.png`). Se não existir, o Open Graph mostrará imagem quebrada no compartilhamento.

**Verificar:**
```bash
ls /home/ubuntu/projects/INOVAWAY-website/public/og-image.png
```

---

### [L-05] HTML lang correto mas sem `hreflang`
**Severidade:** 🟢 Low
**Páginas:** Todas

**Observação positiva:** O layout usa `<html lang="pt-BR">` corretamente ✅

**Melhoria:** Para sites com potencial de internacionalização, adicionar `hreflang` no `<head>`:
```tsx
<link rel="alternate" hreflang="pt-BR" href="https://inovaway.org/" />
```

---

## ✅ Pontos Positivos Encontrados

| Item | Detalhe |
|------|---------|
| ✅ Overflow horizontal | Nenhuma página tem overflow horizontal em nenhum viewport |
| ✅ HTML lang | `lang="pt-BR"` corretamente definido |
| ✅ Alt text de avatars | `alt="${agent.name} avatar"` consistente |
| ✅ Alt text do logo | `alt="INOVAWAY"` nos logos |
| ✅ Hamburger menu | aria-label="Abrir menu" presente ✅ |
| ✅ WhatsApp link | URL correta: `wa.me/5581981392929` |
| ✅ Email link | `mailto:inovaway@inovaway.org` correto |
| ✅ Formulário | Campos ricos (8 tipos + orçamento), labels visíveis, asteriscos em obrigatórios |
| ✅ Navegação keyboard | Links de nav aparecem no accessibility tree corretamente |
| ✅ Heading hierarchy | Home e Contato têm hierarquia h1→h2→h3 correta |
| ✅ mobile-first | Nenhum overflow horizontal detectado em nenhum viewport |
| ✅ Schema.org | JSON-LD de Organization e Website implementados |
| ✅ CSP Header | Content-Security-Policy configurado no servidor |
| ✅ Terminal animado | SquadTerminal renderizando com logs e indicador LIVE |
| ✅ Modal dos agents | Abre/fecha corretamente (verificado no DOM) |

---

## 🖼️ Screenshots de Evidência

> Screenshots capturados em: `/home/ubuntu/clawd/skills/qa-frontend/reports/inovaway/`

### Home — Mobile 375px
![Home Mobile](../../../clawd/skills/qa-frontend/reports/inovaway/01-home_2026-03-05_024113/screenshots/01_Abrir_Home_mobile.png)

### Home — Desktop 1440px
![Home Desktop](../../../clawd/skills/qa-frontend/reports/inovaway/01-home_2026-03-05_024113/screenshots/01_Abrir_Home_desktop.png)

### Serviços — Mobile 375px
![Servicos Mobile](../../../clawd/skills/qa-frontend/reports/inovaway/02-servicos_2026-03-05_024217/screenshots/01_Abrir_Servios_mobile.png)

### Serviços — Desktop 1440px
![Servicos Desktop](../../../clawd/skills/qa-frontend/reports/inovaway/02-servicos_2026-03-05_024217/screenshots/01_Abrir_Servios_desktop.png)

### Sobre — Desktop com Squad
![Sobre Desktop](../../../clawd/skills/qa-frontend/reports/inovaway/04-sobre_2026-03-05_024519/screenshots/01_Abrir_Sobre_desktop.png)

### Contato — Desktop
![Contato Desktop](../../../clawd/skills/qa-frontend/reports/inovaway/05-contato_2026-03-05_024617/screenshots/01_Abrir_Contato_desktop.png)

---

## 🛠️ Prioridades de Correção

### Sprint 1 — Crítico (antes de qualquer lançamento)
1. **[C-01]** Comprimir avatars PNG → WebP (59MB → ~1.6MB)
2. **[C-02]** Fix contador de stats (0 → 8)
3. **[C-03]** Atualizar links LinkedIn/Instagram para perfis reais
4. **[C-04]** Adicionar aria-label no botão fechar do modal
5. **[H-01]** Mudar para modo produção (`next build && next start`)

### Sprint 2 — High
6. **[H-02]** Fix navbar opacity durante scroll
7. **[H-03]** Adicionar `prefers-reduced-motion` e `viewport: { amount: 0.1 }` nas animações
8. **[H-04]** Implementar focus rings visíveis (`:focus-visible`)
9. **[H-05]** Fix alt text nos ícones sociais do footer
10. **[H-06]** Adicionar `aria-pressed` nos chips do formulário

### Sprint 3 — Medium/Low
11. **[M-01]** Aumentar contraste de texto secundário (white/60 → white/75)
12. **[M-03]** Implementar skip-to-content link
13. **[M-04]** Adicionar active state nos links de navegação
14. **[M-08]** Adicionar `rel="noopener noreferrer"` nos links externos
15. **[L-01]** Corrigir h1 duplicado na /sobre
16. **[L-02]** Aumentar área de toque dos links do footer no mobile

---

## 📋 Testes de Regressão

Após as correções, re-executar:
```bash
cd ~/clawd/skills/qa-frontend
bash scripts/qa-test.sh tests/inovaway/ --viewport mobile
bash scripts/qa-test.sh tests/inovaway/ --viewport desktop
```

E verificar visualmente os screenshots gerados em:
`/home/ubuntu/clawd/skills/qa-frontend/reports/inovaway/`

---

*Report gerado por Lens 🔬 — QA Frontend Agent*
*Ferramenta: qa-frontend skill v2 + análise visual com Claude Vision*
*Viewports testados: 375px (iPhone SE), 768px (iPad), 1440px (Desktop)*
