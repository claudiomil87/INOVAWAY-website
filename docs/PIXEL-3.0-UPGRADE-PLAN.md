# 🎨 PIXEL 3.0 — Worldclass Creative Agent Upgrade Plan

**Autor:** Arch 🧠  
**Data:** 2026-03-05  
**Status:** AGUARDANDO APROVAÇÃO DO ERIC  
**Baseado em:** PIXEL-UPGRADE-RESEARCH.md (Scout 🔍)

---

## Por que 3.0?

- **Pixel 1.0** = Geração de imagens via Gemini (nano-banana-pro) ← skill nativo do OpenClaw
- **Pixel 2.0** = + Pipeline MD→PDF com Playwright + Pillow (já implementado, gerou Brand Identity INOVAWAY + Rancho81)
- **Pixel 3.0** = Worldclass Creative Agent com manipulação completa, social templates, docs, QA visual

---

## Visão do Pixel 3.0

```
                    ┌──────────────┐
   Prompt/Task ────▶│  AI GENERATE  │──▶ Imagem bruta
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
                    │ POST-PROCESS │──▶ Crop, resize, watermark, format
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
                    │  VISION QA   │──▶ Score ≥ 70? ✅ : 🔄 retry
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
                    │   DELIVER    │──▶ Multi-format, named, organized
                    └──────────────┘
```

---

## Capacidades Novas

### Tier 1 — Image Processing (Sharp)
| Capacidade | Exemplo |
|---|---|
| **Auto-crop** | Remover padding transparente (como fizemos com a logo) |
| **Resize inteligente** | Avatar 2K → WebP 400px otimizado |
| **Format conversion** | PNG → WebP (97% menor), AVIF |
| **Watermark** | Logo overlay em fotos de produto |
| **Compositing** | Colagem de múltiplas imagens |
| **Compress** | Target 500KB para web, 100KB para thumbnail |
| **Batch processing** | 8 avatares de uma vez |

### Tier 2 — Social Media Templates (node-canvas)
| Template | Dimensões | Uso |
|---|---|---|
| Instagram Post | 1080×1080 | Feed |
| Instagram Story | 1080×1920 | Stories/Reels cover |
| Instagram Carousel | 1080×1350 | Slides |
| LinkedIn Post | 1200×627 | Feed |
| Facebook Cover | 820×312 | Página |
| Twitter/X Header | 1500×500 | Perfil |
| YouTube Thumbnail | 1280×720 | Vídeos |
| OG Image | 1200×630 | Compartilhamento |

### Tier 3 — Document Generation
| Documento | Engine | Formato |
|---|---|---|
| Brand Identity | Playwright HTML→PDF | PDF |
| Proposta Comercial | Playwright HTML→PDF | PDF |
| Social Media Kit | Sharp batch + PDF | PDF + PNGs |
| Relatório de Performance | Playwright HTML→PDF | PDF |
| Contrato/Proposta editável | docxtemplater | DOCX |
| Apresentação | docxtemplater | PPTX |

### Tier 4 — Vision QA (Auto-verificação)
- Cada imagem gerada passa por Claude Vision antes de entregar
- Checklist automático: logo visível? texto legível? proporções corretas? marca consistente?
- Score < 70 = retry automático com feedback do QA
- Score ≥ 70 = entrega aprovada
- Meta: taxa de rejeição humana < 5%

---

## Stack Técnica

| Ferramenta | Linguagem | Função | Custo |
|---|---|---|---|
| **Sharp** | Node.js | Image processing core | Grátis |
| **node-canvas** | Node.js | Templates com texto/fontes | Grátis |
| **Playwright** | Node.js | HTML→PDF | Grátis |
| **Pillow** | Python | Fallback + compression | Grátis |
| **docxtemplater** | Node.js | DOCX/PPTX | Grátis (core) |
| **Claude Vision** | API | QA visual | ~$0.01/img |

**Custo total estimado:** ~$15-30/mês para 100 assets/dia (só Vision API)

---

## Implementação — 4 Fases

### Fase 1: Core Processing 🔴 (2-3 dias)
**Impacto: ALTO | Esforço: BAIXO**

Criar skill `pixel-tools` com scripts:
1. `image-processor.js` — Sharp wrapper (resize, crop, convert, watermark, compress, metadata)
2. `brand-config.json` — Configuração por cliente (cores, fontes, logo path, watermark)
3. Atualizar SKILL.md do Pixel para referenciar as novas ferramentas

**Resultado:** Pixel entrega imagens no tamanho/formato correto. Problema da logo 2048x2048 NUNCA mais acontece.

### Fase 2: Vision QA 🔴 (1-2 dias)
**Impacto: ALTO | Esforço: MÉDIO**

1. `vision-qa.js` — Script que envia imagem para Claude Vision com prompt de QA
2. Rubrics por tipo de asset (logo, avatar, social post, document)
3. Auto-retry loop: gera → QA → feedback → re-gera (max 3 tentativas)
4. Integrar no SKILL.md como step obrigatório antes de entregar

**Resultado:** Qualidade garantida antes de chegar ao cliente. Auto-policing.

### Fase 3: Social Templates 🟠 (3-5 dias)
**Impacto: ALTO | Esforço: MÉDIO**

1. `social-template-engine.js` — node-canvas templates parametrizados
2. 8 templates base (Instagram, LinkedIn, Facebook, Twitter, YouTube, OG)
3. Cada template aceita: brand config + título + subtítulo + imagem de fundo + CTA
4. Batch: gera todos os formatos de uma vez com um comando

**Resultado:** Pixel entrega kit completo de social media para qualquer cliente.

### Fase 4: Document Generation 2.0 🟠 (3-5 dias)
**Impacto: MÉDIO | Esforço: MÉDIO**

1. Templates HTML profissionais (proposta, brand book, relatório)
2. `doc-generator.js` — pipeline JSON → HTML → PDF
3. docxtemplater para DOCX/PPTX editáveis
4. Reuso do pipeline MD→PDF já existente

**Resultado:** Documentos profissionais para qualquer cliente, em PDF e DOCX.

---

## Pixel Upgrade — Skill Files

```
~/clawd/skills/pixel-tools/
├── SKILL.md                    # Instruções do Pixel 3.0
├── scripts/
│   ├── image-processor.js      # Sharp wrapper
│   ├── vision-qa.js            # Claude Vision QA
│   ├── social-templates.js     # node-canvas templates
│   ├── doc-generator.js        # HTML→PDF pipeline
│   └── brand-config/
│       ├── inovaway.json       # Config INOVAWAY
│       └── rancho81.json       # Config Rancho81
├── templates/
│   ├── social/                 # Templates de social media
│   ├── docs/                   # Templates HTML para PDFs
│   └── brand/                  # Templates de brand identity
└── fonts/                      # Fontes brand (Inter, JetBrains Mono)
```

---

## Cronograma

| Fase | Tempo | Quem implementa | Prioridade |
|---|---|---|---|
| Fase 1: Core Processing | 2-3 dias | Forge ⚙️ | 🔴 Urgente |
| Fase 2: Vision QA | 1-2 dias | Forge ⚙️ | 🔴 Urgente |
| Fase 3: Social Templates | 3-5 dias | Forge ⚙️ + Pixel 🎨 | 🟠 Alta |
| Fase 4: Doc Generation 2.0 | 3-5 dias | Forge ⚙️ | 🟠 Alta |
| **Total** | **~2 semanas** | | |

---

## Lens QA Upgrade (complementar)

### Problema identificado
O Lens deixou passar a logo minúscula — um erro visual ÓBVIO.

### Fix: Checklist visual obrigatório

Antes de fechar qualquer relatório QA, o Lens DEVE verificar:

```markdown
## Checklist Visual Obrigatório (NUNCA PULAR)
- [ ] Logo visível e legível em TODAS as viewports (mobile 375px, tablet 768px, desktop 1280px)
- [ ] Logo proporcional ao header (mín 32px altura)
- [ ] Textos legíveis (mín 14px body, contraste WCAG AA)
- [ ] Imagens carregando (verificar HTTP status, não apenas path)
- [ ] Nenhum overflow horizontal (verificar todas as páginas em 375px)
- [ ] CTA principal visível above-the-fold
- [ ] Formulários preenchíveis e com labels
- [ ] Links de navegação funcionais
- [ ] Favicon presente
- [ ] OG image renderizando
```

### Implementação
Atualizar o SKILL.md do Lens com esse checklist como step obrigatório ANTES de gerar o relatório. Se qualquer item falhar = CRITICAL automático.

---

## Decisão necessária

Eric, preciso da sua aprovação para:

1. ✅ Implementar Fase 1 + 2 do Pixel 3.0 (Core Processing + Vision QA) — **prioridade máxima**
2. ✅ Atualizar SKILL.md do Lens com checklist visual obrigatório
3. 📋 Agendar Fase 3 + 4 para a semana seguinte
4. 💰 Budget de ~$15-30/mês para Vision API QA

**Aprovado?**
