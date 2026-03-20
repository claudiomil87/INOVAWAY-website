# Template: Radar INOVAWAY — Boletim Semanal

Use este template para criar cada nova edição do Radar INOVAWAY.
Substitua os placeholders `[...]` e siga as instruções em cada seção.

---

## 📁 Nome do Arquivo

```
content/blog/pt/radar-inovaway-edicao-NNN.mdx
```

Onde `NNN` é o número da edição com 3 dígitos (001, 002, 003...).

---

## 📋 Frontmatter

```mdx
---
title: "Radar INOVAWAY #NNN — Boletim Semanal de Tendências"
slug: "radar-inovaway-edicao-NNN"
date: "AAAA-MM-DD"
author: "INOVAWAY"
description: "O boletim semanal que separa sinal de ruído no universo de AI agents, automação e marketing digital. Edição #NNN — semana de DD a DD de mês de AAAA."
tags: ["radar", "tendencias", "ai-agents", "automacao", "marketing-digital", "semanal"]
image: "/blog/radar-inovaway-NNN.png"
locale: "pt"
readingTime: "8 min"
---
```

---

## 🗂️ Estrutura do Post

### Header

```
# Radar INOVAWAY #NNN
**Boletim Semanal · Semana de DD–DD de mês de AAAA**

> [1-2 linhas de contexto da semana — o que está acontecendo no macro que molda os sinais desta edição]
```

---

### 🟢 Sinais Fortes (3–5 itens)
*Tendências em aceleração — vale investir atenção agora*

**Critérios para incluir:**
- Dado novo publicado esta semana (lançamento, relatório, benchmark)
- Adoção acelerando com métricas mensuráveis
- Impacto direto em AI agents, automação ou marketing digital

**Formato de cada item:**

```markdown
### [N]. [Título direto e descritivo — sem exagero]

[Parágrafo 1: O que aconteceu. Dados concretos. Quem anunciou. Qual o impacto real.]

[Parágrafo 2 (opcional): Contexto ou implicação mais profunda. Por que isso muda algo.]

**O que fazer:** [Ação prática e direta para quem lê. Uma frase. Sem vagueza.]
```

**Extensão por item:** 80–120 palavras
**Tom:** Analítico, sem superlativo. Dados > opinião.

---

### 🔴 Sinais Fracos (3–5 itens)
*Tendências em declínio — redirecione energia daqui*

**Critérios para incluir:**
- Queda de adoção, receita ou interesse documentada
- Expectativa versus realidade com dados de suporte
- Tecnologia ou estratégia que o mercado está abandonando

**Formato de cada item:**

```markdown
### [N]. [Título que indica o declínio — sem dramatizar]

[Parágrafo 1: O que está declinando. Dados. Contexto.]

[Parágrafo 2 (opcional): Causa raiz do declínio.]

**O que fazer:** [Como redirecionar o investimento ou energia.]
```

**Extensão por item:** 80–120 palavras
**Tom:** Direto. Sem pânico. Foco em realocação de recurso.

---

### ⚪ Ruído (3–4 itens)
*Hype sem substância — ignore ou aguarde 12+ meses*

**Critérios para incluir:**
- Trend sendo vendida sem case real de ROI
- Buzzword que não corresponde à tecnologia descrita
- Promessas desproporcionais em relação ao estágio técnico atual

**Formato de cada item:**

```markdown
### [N]. [Nome do hype]

[Parágrafo: O que está sendo prometido, por que não entrega, qual o risco de seguir.]

**Por que é ruído:** [Diagnóstico em 1–2 frases. Sem concessões.]
```

**Extensão por item:** 60–100 palavras
**Tom:** Cético, fundamentado. Não arrogante — analítico.

---

### 📡 Radar da Próxima Semana

```markdown
## 📡 Radar da Próxima Semana

Ficaremos de olho em:
- **[Evento/Release/Relatório]** — [por que importa]
- **[Evento/Release/Relatório]** — [por que importa]
- **[Evento/Release/Relatório]** — [por que importa]
```

---

### Rodapé padrão

```markdown
*Radar INOVAWAY é publicado toda sexta-feira. Baseado em pesquisa de fontes primárias, relatórios de analistas e dados de mercado da semana. Sem patrocínio, sem agenda de vendor.*

*Próxima edição: DD de mês de AAAA — [Assine para receber em primeira mão →](/contato)*
```

---

## 🔍 Processo de Pesquisa (Scout — Perplexity)

Execute antes de escrever cada edição:

```bash
# Sinais Fortes — o que está crescendo
/home/ubuntu/instagram-automation/venv/bin/python3 \
  ~/clawd/skills/perplexity-search/scripts/perplexity.py \
  "AI agents tendências semana [DATA] automação vendas marketing digital lançamentos" \
  --max-tokens 2000

# Sinais Fracos — o que está declinando
/home/ubuntu/instagram-automation/venv/bin/python3 \
  ~/clawd/skills/perplexity-search/scripts/perplexity.py \
  "tendências em declínio AI 2026 o que não funciona automação marketing chatbots" \
  --max-tokens 1500

# Ruído — hype sem substância
/home/ubuntu/instagram-automation/venv/bin/python3 \
  ~/clawd/skills/perplexity-search/scripts/perplexity.py \
  "hype sem substância IA 2026 promessas exageradas buzzwords que não entregam" \
  --max-tokens 1200
```

---

## ✅ Checklist pré-publicação

- [ ] Frontmatter completo (slug, date, tags, locale)
- [ ] 3–5 itens em Sinais Fortes
- [ ] 3–5 itens em Sinais Fracos
- [ ] 3–4 itens em Ruído
- [ ] Cada item tem "O que fazer" ou "Por que é ruído"
- [ ] Nenhum item sem dado concreto (número, fonte, empresa)
- [ ] Radar da Próxima Semana preenchido
- [ ] Rodapé com data da próxima edição
- [ ] Commit: `feat: radar INOVAWAY semanal #NNN`

---

## 📐 Métricas de qualidade

| Métrica | Alvo |
|---|---|
| Palavras por seção | 300–400 |
| Itens por seção | 3–5 |
| Dados concretos por item | ≥ 1 |
| Tempo de leitura total | 7–10 min |
| Proporção opinião/dado | < 40% / > 60% |

---

*Template criado em março/2026. Atualizar quando o formato evoluir.*
