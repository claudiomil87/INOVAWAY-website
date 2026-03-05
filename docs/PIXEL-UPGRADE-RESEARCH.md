# 🎨 PIXEL UPGRADE RESEARCH — Worldclass Creative Agent
**Autor:** Scout 🔍  
**Data:** 2026-03-05  
**Objetivo:** Expandir o Agent Pixel de gerador de imagens para um agente criativo completo (manipulação de imagens, geração de documentos, QA visual, social media assets)

---

## Resumo Executivo

O Pixel hoje é um "prompt → imagem" via Gemini 3 (nano-banana-pro). Para se tornar um **worldclass creative agent**, ele precisa de três camadas adicionais:

1. **Processamento pós-geração** (crop, resize, watermark, compositing, format conversion)
2. **Geração de documentos** (PDFs, DOCX, PPTX, infográficos, social media assets)
3. **QA visual** (análise via Vision AI para garantir qualidade antes de entregar)

**Recomendação stack primária:** `Sharp` (Node.js) + `Playwright/Puppeteer` (HTML→PDF) + `docxtemplater` (DOCX/PPTX) + `Claude Vision / Gemini Vision` (QA).

**Impacto vs Esforço:** Sharp → 🟢 Alta/Baixo | Playwright HTML→PDF → 🟢 Alta/Baixo | Vision QA → 🟡 Alta/Médio | docxtemplater → 🟡 Média/Médio | Social Templates → 🟡 Alta/Médio

---

## 1. Image Manipulation Libraries

### 1.1 Sharp (Node.js) ⭐ RECOMENDADO PRIMÁRIO

**Linguagem:** Node.js  
**Use case:** Resize, crop, format conversion, compositing, watermarks, metadata  
**GitHub:** [lovell/sharp](https://github.com/lovell/sharp) — 30k+ ⭐

#### Performance (benchmark EC2 c7a.xlarge)
| Biblioteca | imagens/seg | Relativo ao Sharp |
|---|---|---|
| **sharp** | **11.16** | **1x (baseline)** |
| sharp (SIMD) | 10.57 | ~1x |
| gm (GraphicsMagick) | 5.58 | 0.5x |
| gm-imagemagick | 4.94 | 0.44x |
| canvas | 6.66 | 0.6x |
| jimp (pure JS) | 0.72 | 0.06x |

> Sharp usa **libvips** internamente. 4–5x mais rápido que ImageMagick para resize. Memória ~70% menor que Jimp.

#### Pros
- Mais rápido de todos (libvips com SIMD)
- Streaming pipeline (sem memória intermediária)
- Suporta JPEG, PNG, WebP, AVIF, TIFF, GIF, SVG
- API fluent e chainable
- Compositing com blend modes (overlay, multiply, screen, etc.)
- Metadata read/write (EXIF, IPTC, XMP)
- Maturidade: v0.34+ com suporte ativo

#### Cons
- Apenas Node.js (não Python)
- Texto sobre imagem requer SVG intermediário ou node-canvas
- Binários nativos (pode ter issues em ARM sem pre-build)

#### Instalação
```bash
npm install sharp
```

#### Exemplos de uso

**Resize + WebP conversion:**
```javascript
const sharp = require('sharp');

await sharp('input.png')
  .resize(1080, 1080, { fit: 'cover', position: 'centre' })
  .webp({ quality: 85 })
  .toFile('output.webp');
```

**Watermark / Logo overlay:**
```javascript
const { width } = await sharp('photo.jpg').metadata();
const logoWidth = Math.floor(width * 0.2); // 20% da largura

const resizedLogo = await sharp('logo.png')
  .resize(logoWidth)
  .toBuffer();

await sharp('photo.jpg')
  .composite([{ input: resizedLogo, gravity: 'southeast' }])
  .jpeg({ quality: 90 })
  .withMetadata()
  .toFile('photo-watermarked.jpg');
```

**Collage (múltiplas imagens):**
```javascript
await sharp({
  create: { width: 2160, height: 1080, channels: 3, background: '#ffffff' }
})
.composite([
  { input: 'img1.jpg', left: 0, top: 0 },
  { input: 'img2.jpg', left: 1080, top: 0 }
])
.jpeg()
.toFile('collage.jpg');
```

**Compress para web:**
```javascript
await sharp('large.jpg')
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 80, progressive: true, mozjpeg: true })
  .toFile('optimized.jpg');
```

---

### 1.2 Pillow/PIL (Python)

**Linguagem:** Python  
**Use case:** Full image manipulation, filtros, efeitos, color manipulation

#### Pros
- Biblioteca Python mais madura para imagens
- Enorme ecossistema (OpenCV, scikit-image integram)
- Suporte total a formatos (JPEG, PNG, GIF, BMP, TIFF, WebP)
- Operações de color: HSV, LAB, histogramas
- Filtros avançados: blur, sharpen, emboss, contour

#### Cons
- Mais lento que Sharp para operações simples de resize
- Python runtime (se o agent é Node.js, adiciona complexidade)
- Menos adequado para uso em servidor Node.js puro

#### Quando usar
- Processamento de imagens com Python scripts
- Análise de cores, histogramas, detecção de objetos (com PIL+OpenCV)
- Geração de thumbnails em batch jobs Python

```python
from PIL import Image, ImageDraw, ImageFont

img = Image.open("input.jpg")
img = img.resize((1080, 1080), Image.LANCZOS)

# Adicionar texto
draw = ImageDraw.Draw(img)
font = ImageFont.truetype("Arial.ttf", 48)
draw.text((50, 50), "© INOVAWAY 2026", fill="white", font=font)

img.save("output.jpg", quality=85)
```

---

### 1.3 ImageMagick (CLI)

**Linguagem:** CLI (bash/shell)  
**Use case:** Batch processing, conversão de formatos, operações complexas em script

#### Pros
- Extremamente versátil (suporta 200+ formatos)
- Ideal para batch via shell scripts
- Operações: composite, annotate, convert, mogrify (in-place)
- Disponível na maioria dos servidores Linux

#### Cons
- **4–5x mais lento que Sharp** para resize
- Processo separado por operação (fork overhead)
- API via string commands (menos type-safe)
- Vulnerabilidades históricas (ImageTragick 2016) — manter sempre atualizado

#### Quando usar
- Conversões batch via shell
- Formatos raros (EPS, PS, PCX)
- Integração com sistemas legados

```bash
# Resize + convert
convert input.jpg -resize 1080x1080^ -gravity center -extent 1080x1080 output.webp

# Watermark
composite -gravity SouthEast -geometry +20+20 watermark.png photo.jpg output.jpg

# Batch resize pasta
mogrify -resize 800x800 -format webp -quality 85 *.jpg
```

---

### 1.4 node-canvas (Canvas API)

**Linguagem:** Node.js  
**Use case:** Desenho programático, texto overlay, infográficos, geração de cards

#### Pros
- API idêntica ao browser Canvas (fácil para dev front-end)
- Texto com fontes customizadas, gradientes, paths
- Ideal para social media cards, thumbnails com texto dinâmico
- Integra bem com Sharp para compositing final

#### Cons
- Mais lento que Sharp para operações de imagem pura
- Requer bibliotecas de sistema (cairo, libpng, libjpeg)
- Build complexo em alguns ambientes

#### Quando usar
- Geração de cards com texto dinâmico (nome, data, estatísticas)
- Thumbnails automáticas para blog/YouTube
- Open Graph images
- Social media posts com template + dados

```javascript
const { createCanvas, loadImage, registerFont } = require('canvas');

registerFont('./fonts/Inter-Bold.ttf', { family: 'Inter', weight: 'bold' });

const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, 1200, 630);

// Logo
const logo = await loadImage('./logo.png');
ctx.drawImage(logo, 40, 40, 150, 60);

// Título
ctx.font = 'bold 64px Inter';
ctx.fillStyle = '#ffffff';
ctx.fillText('Título do Post', 60, 280);

// Subtítulo
ctx.font = '32px Inter';
ctx.fillStyle = '#a0a0cc';
ctx.fillText('INOVAWAY • 2026', 60, 360);

// Salvar
const buffer = canvas.toBuffer('image/png');
require('fs').writeFileSync('og-image.png', buffer);
```

---

### Tabela Comparativa — Image Manipulation

| Critério | Sharp | Pillow | ImageMagick | node-canvas |
|---|---|---|---|---|
| **Velocidade** | 🥇 11.16 img/s | 🥈 ~3-5 img/s | 🥉 ~5 img/s | ~6.6 img/s |
| **Crop/Resize** | ✅ Excelente | ✅ Bom | ✅ Bom | ⚠️ Manual |
| **Format Conv.** | ✅ JPEG/PNG/WebP/AVIF | ✅ Todos | ✅ 200+ formatos | ⚠️ PNG/JPEG |
| **Text Overlay** | ⚠️ Via SVG | ✅ Nativo | ✅ Nativo | ✅ Excelente |
| **Watermark** | ✅ composite() | ✅ paste() | ✅ composite | ✅ drawImage() |
| **Collage** | ✅ composite multi | ✅ paste multi | ✅ append | ✅ drawImage multi |
| **Metadata** | ✅ EXIF/IPTC/XMP | ✅ Completo | ✅ Completo | ❌ |
| **Compressão** | ✅ mozjpeg/webp | ✅ | ✅ | ⚠️ |
| **Linguagem** | Node.js | Python | CLI/Any | Node.js |
| **Setup complexidade** | Baixa | Baixa | Baixa (apt) | Alta (cairo) |

**🏆 Recomendação:** Sharp como primário + node-canvas para cards com texto dinâmico

---

## 2. Document Generation

### 2.1 Puppeteer / Playwright (HTML→PDF) ⭐ JÁ USADO

**Linguagem:** Node.js  
**Use case:** Renderizar HTML/CSS completo → PDF de alta fidelidade

#### Pros
- **Fidelidade perfeita** — renderiza exatamente como o browser vê
- Suporta CSS moderno, SVG, web fonts, @media print
- Ideal para proposals, relatórios com branding complexo
- Headless Chrome = qualidade gráfica de nível profissional
- Playwright é mais moderno que Puppeteer (multi-browser)

#### Cons
- Processo pesado (Chromium ~150MB)
- Lento para documentos simples (cold start ~2-3s)
- Menos controle programático sobre layout vs PDFKit

#### Quando usar
- Proposals e pitch decks (design complexo)
- Relatórios com charts/gráficos
- Brand identity documents (preview do brand)
- Qualquer PDF onde o design importa mais que o tamanho

```javascript
const { chromium } = require('playwright');

async function htmlToPdf(htmlContent, outputPath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
  });
  await browser.close();
}
```

---

### 2.2 PDFKit (Node.js)

**Linguagem:** Node.js  
**Use case:** Geração programática de PDFs com controle fino sobre layout

#### Pros
- Controle pixel-perfect de posicionamento
- Leve e rápido (sem browser)
- Suporte a fontes TTF/OTF, imagens, paths, vetores
- Ideal para recibos, certificados, contratos com layout fixo
- Streams nativas (pode fazer pipe para HTTP response)

#### Cons
- Layout manual (sem HTML/CSS — você posiciona tudo em x,y)
- Curva de aprendizado maior
- Sem suporte a CSS moderno

#### Instalação
```bash
npm install pdfkit
```

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: 'A4', margin: 50 });
doc.pipe(fs.createWriteStream('proposta.pdf'));

// Header com logo
doc.image('logo.png', 50, 45, { width: 150 });

// Título
doc.fontSize(28).font('Helvetica-Bold').fillColor('#1a1a2e')
   .text('Proposta Comercial', 50, 120);

// Linha separadora
doc.moveTo(50, 160).lineTo(545, 160).stroke('#e0e0e0');

// Corpo
doc.fontSize(12).font('Helvetica').fillColor('#333333')
   .text('Prezado Cliente,', 50, 180);

doc.end();
```

---

### 2.3 React-PDF (@react-pdf/renderer)

**Linguagem:** Node.js/React  
**Use case:** Criar PDFs usando componentes React (declarativo)

#### Pros
- Sintaxe declarativa (familiar para devs React)
- Componentes reutilizáveis para templates
- Suporte a flexbox para layout
- Pode renderizar server-side (Node.js)

#### Cons
- Não é HTML/CSS real — é um subset
- Menos flexível que Puppeteer para designs complexos
- Bundle size maior

#### Quando usar
- Templates de documento reutilizáveis
- Time com experiência em React
- Documentos com estrutura consistente (invoices, relatórios)

```jsx
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';

const PropostaPDF = ({ cliente, valor }) => (
  <Document>
    <Page size="A4" style={{ padding: 40 }}>
      <Image src="logo.png" style={{ width: 150 }} />
      <Text style={{ fontSize: 24, marginTop: 20 }}>Proposta para {cliente}</Text>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Text style={{ flex: 1 }}>Valor Total:</Text>
        <Text style={{ fontWeight: 'bold' }}>R$ {valor}</Text>
      </View>
    </Page>
  </Document>
);
```

---

### 2.4 Docxtemplater (DOCX/PPTX/XLSX) ⭐

**Linguagem:** Node.js  
**Use case:** Gerar Word/PowerPoint/Excel a partir de templates com dados JSON

**GitHub:** [open-xml-templating/docxtemplater](https://github.com/open-xml-templating/docxtemplater)  
**NPM:** v3.68.3 (atualizado 6 dias atrás — 2026-02-28)

#### Pros
- Templates criados no **Word/PowerPoint real** (designer pode criar sem código)
- Substitui variáveis `{nome}`, `{empresa}` com dados JSON
- Suporta loops, condicionais, imagens nos templates
- Funciona para DOCX, PPTX e XLSX
- Open source (core) + plugins pagos (imagens, html, chart)

#### Cons
- Core gratuito; recursos avançados (imagens embutidas) são pagos
- Depende de ter um template base bem feito
- Menos controle de layout que Puppeteer

#### Instalação
```bash
npm install docxtemplater pizzip
```

#### Exemplo — Gerar proposta DOCX
```javascript
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');

const content = fs.readFileSync('./templates/proposta-template.docx', 'binary');
const zip = new PizZip(content);
const doc = new Docxtemplater(zip, { paragraphLoop: true });

doc.render({
  empresa: 'INOVAWAY',
  cliente: 'Tech Corp',
  valor: 'R$ 15.000,00',
  servicos: [
    { nome: 'Identidade Visual', valor: 'R$ 5.000,00' },
    { nome: 'Landing Page', valor: 'R$ 7.000,00' },
    { nome: 'Social Media Kit', valor: 'R$ 3.000,00' }
  ],
  data: '05/03/2026'
});

const buf = doc.getZip().generate({ type: 'nodebuffer' });
fs.writeFileSync('./output/proposta-techcorp.docx', buf);
```

---

### Tabela Comparativa — Document Generation

| Critério | Puppeteer/Playwright | PDFKit | React-PDF | Docxtemplater |
|---|---|---|---|---|
| **Fidelidade visual** | 🥇 Perfeita | 🥈 Boa | 🥈 Boa | 🥇 (usa template real) |
| **Facilidade** | Alta (CSS) | Baixa (x,y coords) | Média | Alta (templates Word) |
| **Performance** | Lenta (Chromium) | Rápida | Média | Rápida |
| **Formato saída** | PDF | PDF | PDF | DOCX/PPTX/XLSX |
| **Design flexível** | ✅ Total | ⚠️ Manual | ✅ Flexbox | ✅ (no Word/PPT) |
| **Templates editáveis** | ⚠️ Via HTML | ❌ | ⚠️ Via JSX | ✅ Designer edita |
| **Caso ideal** | Proposals complexas | Recibos/Certificados | Relatórios React | Brand docs/Contratos |

---

## 3. Image Analysis & Quality Control

### 3.1 Vision Models para QA

O Pixel pode usar **Claude Vision** (já disponível) ou **Gemini Vision** para analisar imagens geradas e detectar problemas **antes** de entregar ao usuário.

#### Prompt de QA para Claude Vision
```
Analise esta imagem como um designer sênior e responda em JSON:
{
  "aprovada": boolean,
  "problemas": [
    {
      "tipo": "logo_pequena|texto_ilegivel|cor_fundo_conflito|proporção_errada|qualidade_baixa",
      "severidade": "crítico|médio|leve",
      "descrição": "string",
      "sugestão": "string"
    }
  ],
  "score_qualidade": 0-100,
  "resolucao_adequada": boolean,
  "texto_legivel": boolean,
  "brand_consistency": boolean
}
```

#### Checklist Automático de QA

**Verificações técnicas (Sharp):**
- Resolução mínima: 1080px para social media, 300 DPI para print
- Proporção correta para o formato (1:1 Instagram, 16:9 YouTube, 9:16 Stories)
- Tamanho de arquivo dentro do limite (Instagram: max 8MB)
- Formato correto (WebP para web, PNG para logos, JPEG para fotos)

**Verificações visuais (Vision AI):**
- Logo visível e legível (mínimo 10% da área)
- Texto tem contraste suficiente (WCAG AA: ratio 4.5:1)
- Não há artefatos de compressão visíveis
- Elementos não cortados nas bordas (safe zone)
- Paleta de cores consistente com brand

```javascript
// Pipeline de QA para imagens geradas
async function qaCheck(imagePath, brand) {
  // 1. Verificações técnicas com Sharp
  const meta = await sharp(imagePath).metadata();
  const techChecks = {
    resolution: meta.width >= 1080 && meta.height >= 1080,
    format: ['jpeg', 'png', 'webp'].includes(meta.format),
    hasAlpha: meta.hasAlpha
  };

  // 2. Verificação visual com Vision AI
  const imageBase64 = fs.readFileSync(imagePath, 'base64');
  const qaResult = await claude.vision({
    image: imageBase64,
    prompt: `Analise esta imagem para uso em social media da marca "${brand.name}". 
    Cores da marca: ${brand.colors.join(', ')}. 
    Responda em JSON com: aprovada, problemas (tipo, severidade, descrição), score_qualidade (0-100)`
  });

  return { techChecks, visualQA: JSON.parse(qaResult) };
}
```

---

### 3.2 Gemini Agentic Vision (2026)

Em Janeiro 2026, Google lançou **Agentic Vision** no Gemini 3 Flash — converte entendimento de imagem de ato estático para processo agêntico.

- Pode **navegar** por imagens em sequência
- Detectar problemas e sugerir correções
- Integrar com fluxo de aprovação automático

---

### 3.3 Lighthouse Image Optimization

```bash
# Verificar otimização de imagens via CLI
npx lighthouse --only-audits=uses-optimized-images,uses-webp-images,uses-responsive-images \
  --output json https://seusite.com
```

Métricas relevantes:
- `uses-optimized-images`: JPEG sem compressão excessiva
- `uses-webp-images`: Conversão para WebP moderna
- `uses-responsive-images`: Tamanhos corretos para cada breakpoint
- `efficient-animated-content`: GIFs devem ser MP4/WebM

---

## 4. Social Media Asset Generation

### 4.1 Especificações por Plataforma

| Plataforma | Formato | Dimensões | Observações |
|---|---|---|---|
| Instagram Post | Square | 1080×1080 | Ratio 1:1 |
| Instagram Post | Landscape | 1080×566 | Ratio 1.91:1 |
| Instagram Story | Vertical | 1080×1920 | Ratio 9:16 |
| Instagram Carousel | Square | 1080×1080 | Até 10 slides |
| Instagram Reels Cover | Vertical | 1080×1920 | |
| Facebook Post | Landscape | 1200×630 | Open Graph |
| LinkedIn Post | Landscape | 1200×627 | |
| Twitter/X Card | Landscape | 1200×675 | Ratio 16:9 |
| YouTube Thumbnail | Landscape | 1280×720 | HD mínimo |
| LinkedIn Banner | Wide | 1584×396 | |
| Facebook Cover | Wide | 820×312 | |
| Open Graph | Landscape | 1200×630 | Para qualquer site |

### 4.2 Sistema de Templates com node-canvas

```javascript
// Template engine para social media posts
class SocialMediaTemplate {
  constructor(platform, style) {
    this.platform = platform;
    this.dimensions = PLATFORM_SPECS[platform];
    this.style = style; // brand style guide
  }

  async render(data) {
    const { width, height } = this.dimensions;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 1. Background (gradiente ou cor sólida)
    await this.drawBackground(ctx);

    // 2. Imagem principal (gerada pelo Gemini)
    if (data.heroImage) {
      const img = await loadImage(data.heroImage);
      ctx.drawImage(img, 0, 0, width, height * 0.6);
    }

    // 3. Overlay gradiente para legibilidade
    this.drawGradientOverlay(ctx, width, height);

    // 4. Logo
    const logo = await loadImage(this.style.logoPath);
    ctx.drawImage(logo, 40, 40, 120, 48);

    // 5. Texto principal
    ctx.font = `bold ${this.style.titleSize}px ${this.style.fontFamily}`;
    ctx.fillStyle = this.style.textColor;
    this.wrapText(ctx, data.title, 60, height * 0.65, width - 120, this.style.titleSize * 1.4);

    // 6. CTA / Hashtags
    ctx.font = `${this.style.bodySize}px ${this.style.fontFamily}`;
    ctx.fillStyle = this.style.accentColor;
    ctx.fillText(data.cta || '@inovaway', 60, height - 60);

    return canvas.toBuffer('image/png');
  }
}
```

### 4.3 Open Graph Images Automáticas

```javascript
// Gerar OG image para qualquer post do blog
async function generateOGImage(post) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Background brand
  ctx.fillStyle = '#0f0f23';
  ctx.fillRect(0, 0, 1200, 630);

  // Accent bar esquerda
  ctx.fillStyle = '#6c63ff';
  ctx.fillRect(0, 0, 8, 630);

  // Logo top-right
  const logo = await loadImage('./assets/logo-white.png');
  ctx.drawImage(logo, 1050, 30, 120, 48);

  // Título (auto-wrap)
  ctx.font = 'bold 56px Inter';
  ctx.fillStyle = '#ffffff';
  wrapText(ctx, post.title, 60, 200, 1080, 72);

  // Autor + data
  ctx.font = '28px Inter';
  ctx.fillStyle = '#8888aa';
  ctx.fillText(`${post.author} • ${post.date}`, 60, 560);

  // URL
  ctx.font = '24px Inter';
  ctx.fillStyle = '#6c63ff';
  ctx.fillText('inovaway.com.br', 60, 600);

  // Salvar + retornar URL
  const buffer = canvas.toBuffer('image/png');
  const filename = `og-${post.slug}.png`;
  fs.writeFileSync(`./public/og/${filename}`, buffer);
  return `/og/${filename}`;
}
```

---

## 5. Best Practices — Worldclass Creative Agent

### 5.1 Pipeline Completo do Pixel (Proposta)

```
[Request] → [Pixel Agent]
     ↓
1. ANALYZE REQUEST
   - Entender formato, dimensões, estilo
   - Verificar brand guidelines
   - Identificar tipo de asset (post, doc, banner)
     ↓
2. GENERATE
   - Imagem: Gemini nano-banana-pro (prompt otimizado)
   - Documento: Template + dados JSON
   - Social card: node-canvas + template
     ↓
3. POST-PROCESS (Sharp)
   - Resize para dimensões corretas
   - Format conversion (PNG→WebP para web)
   - Watermark/logo overlay se necessário
   - Compress para tamanho alvo
   - Metadata embedding (autor, data, brand)
     ↓
4. QA (Vision AI)
   - Análise técnica: resolução, formato, tamanho
   - Análise visual: legibilidade, brand consistency, qualidade
   - Score de qualidade (0-100)
   - Se score < 70: re-gerar com feedback
     ↓
5. DELIVER
   - Upload para CDN/S3
   - Retornar URL + metadata
   - Log no asset management system
```

### 5.2 Brand Consistency Automation

**Abordagem: Brand Config JSON**

```json
{
  "brand": "INOVAWAY",
  "colors": {
    "primary": "#6c63ff",
    "secondary": "#0f0f23",
    "accent": "#ff6584",
    "text": "#ffffff",
    "textMuted": "#8888aa"
  },
  "typography": {
    "headingFont": "Inter",
    "bodyFont": "Inter",
    "weights": { "heading": 700, "body": 400 }
  },
  "logo": {
    "light": "./assets/logo-white.png",
    "dark": "./assets/logo-dark.png",
    "icon": "./assets/icon.png",
    "minSize": 80
  },
  "templates": {
    "instagram_post": "./templates/ig-post.json",
    "story": "./templates/ig-story.json",
    "linkedin": "./templates/linkedin.json",
    "og_image": "./templates/og.json"
  },
  "watermark": {
    "enabled": true,
    "position": "southeast",
    "opacity": 0.7,
    "margin": 20
  }
}
```

### 5.3 Asset Management

**Naming Convention:**
```
{cliente}_{tipo}_{plataforma}_{dimensão}_{versão}_{data}.{ext}

Exemplos:
inovaway_post_instagram_1080x1080_v1_20260305.webp
techcorp_banner_linkedin_1584x396_v2_20260305.jpg
inovaway_proposta_a4_v3_20260305.pdf
```

**Estrutura de Pastas:**
```
/assets/
├── brands/
│   └── inovaway/
│       ├── logo/ (SVG, PNG, WebP em vários tamanhos)
│       ├── colors.json
│       └── fonts/
├── templates/
│   ├── social/
│   ├── documents/
│   └── presentations/
├── generated/
│   └── YYYY/MM/DD/
│       ├── raw/          (saída direta da AI)
│       ├── processed/    (após Sharp)
│       └── delivered/    (aprovados, prontos)
└── archive/
```

### 5.4 Workflow das Top Agências (como replicar)

**Superside (referência mundial):**
- Midjourney + Adobe Photoshop AI → 675 imagens únicas, 85% economia de tempo
- Pipeline: AI generate → Human review → Post-process → Deliver

**Para o Pixel replicar:**
1. **AI Generate** (Gemini/DALL-E/Midjourney API)
2. **Auto post-process** (Sharp: crop, resize, watermark)
3. **Vision QA** (Claude/Gemini Vision para aprovar)
4. **Human-in-loop opcional** (Discord preview para aprovação)
5. **Deliver** (CDN upload + metadata)

**Brand Consistency via Prompts:**
```
Sistema: Sempre incluir no prompt do Gemini:
"Estilo: [brand_style_description]. Paleta: [colors]. 
Fontes: [typography]. Elementos proibidos: [restrictions].
Referência visual: [reference_url_or_description]"
```

---

## 6. Tools/Libraries Summary

### Tabela Master — Todas as Ferramentas

| Nome | Linguagem | Use Case Principal | Pros | Cons | Instalação | Prioridade |
|---|---|---|---|---|---|---|
| **Sharp** | Node.js | Resize, crop, format conv., watermark, compress | Mais rápido (libvips), API fluent, WebP/AVIF | Texto básico sem SVG | `npm install sharp` | 🔴 CRÍTICO |
| **node-canvas** | Node.js | Cards com texto, OG images, social posts | API Canvas familiar, fontes custom | Build complexo (cairo) | `npm install canvas` | 🟠 ALTO |
| **Pillow** | Python | Manipulação completa, filtros, análise | Maturidade, ecossistema Python | Mais lento, Python runtime | `pip install Pillow` | 🟡 MÉDIO |
| **ImageMagick** | CLI | Batch, formatos raros, scripts | 200+ formatos, ubíquo | 5x mais lento, vulnerabilidades | `apt install imagemagick` | 🟡 MÉDIO |
| **Playwright** | Node.js | HTML→PDF de alta fidelidade | CSS moderno, SVG, fonts | Lento (Chromium), pesado | `npm install playwright` | 🔴 CRÍTICO |
| **PDFKit** | Node.js | PDFs programáticos simples | Leve, rápido, streams | Layout manual (x,y) | `npm install pdfkit` | 🟡 MÉDIO |
| **React-PDF** | Node.js/React | PDFs com componentes React | Declarativo, reutilizável | Bundle maior, CSS subset | `npm install @react-pdf/renderer` | 🟢 BAIXO |
| **docxtemplater** | Node.js | DOCX/PPTX/XLSX com templates | Templates editáveis no Word | Core free, plugins pagos | `npm install docxtemplater pizzip` | 🟠 ALTO |
| **Claude Vision** | API | QA visual de imagens geradas | Alta precisão, já integrado | Custo por chamada | Já disponível | 🔴 CRÍTICO |
| **Gemini Vision** | API | QA + Agentic Vision (2026) | Multimodal nativo | Custo por chamada | Já disponível | 🟠 ALTO |
| **Bannerbear** | SaaS API | Social media assets automatizados | Templates visuais, API simples | Custo mensal ($49+) | `npm install bannerbear` | 🟢 OPCIONAL |
| **Skia Canvas** | Node.js | Canvas de alta performance (ARM) | Melhor que node-canvas em ARM | Menor ecossistema | `npm install skia-canvas` | 🟡 MÉDIO |

---

## 7. Roadmap de Implementação

### Fase 1 — Core Image Processing (1-2 semanas) 🔴

**Objetivo:** Pixel pode processar imagens geradas antes de entregar

Tasks:
- [ ] Instalar e configurar Sharp no ambiente do Pixel
- [ ] Criar módulo `image-processor.js` com funções:
  - `resize(path, width, height, fit)`
  - `convert(path, format, quality)`
  - `watermark(path, logoPath, position)`
  - `compress(path, targetKB)`
  - `crop(path, x, y, width, height)`
  - `metadata(path)` — ler/escrever EXIF
- [ ] Criar Brand Config JSON para cada cliente
- [ ] Implementar naming convention automática

**Resultado:** Pixel entrega imagens no tamanho e formato correto, com watermark

---

### Fase 2 — Social Media Templates (2-3 semanas) 🟠

**Objetivo:** Pixel gera posts prontos para Instagram, LinkedIn, etc.

Tasks:
- [ ] Instalar node-canvas + fontes brand
- [ ] Criar 5 templates base (post, story, carousel, linkedin, og)
- [ ] Implementar `SocialMediaTemplate` engine
- [ ] Open Graph generator automático para blog
- [ ] YouTube thumbnail generator

**Resultado:** Pixel entrega assets prontos para publicação em todas as plataformas

---

### Fase 3 — Document Generation (2-3 semanas) 🟠

**Objetivo:** Pixel cria proposals, brand books, contratos

Tasks:
- [ ] Configurar Playwright para HTML→PDF
- [ ] Criar templates HTML para:
  - Proposta comercial
  - Brand identity guide
  - Social media kit
  - Relatório de performance
- [ ] Criar templates DOCX/PPTX com docxtemplater
- [ ] Implementar pipeline: dados JSON → documento formatado

**Resultado:** Pixel entrega documentos profissionais em DOCX e PDF

---

### Fase 4 — Vision QA (1-2 semanas) 🔴

**Objetivo:** Pixel verifica qualidade antes de entregar

Tasks:
- [ ] Implementar `qa-checker.js` com Claude Vision
- [ ] Definir rubrics de QA por tipo de asset
- [ ] Auto-retry: se QA score < 70, re-gerar com feedback
- [ ] Dashboard de métricas de qualidade

**Resultado:** Taxa de rejeição humana cai para <5%

---

### Fase 5 — Asset Management (1 semana) 🟡

**Objetivo:** Organização e rastreabilidade de todos os assets

Tasks:
- [ ] Implementar estrutura de pastas padronizada
- [ ] Naming convention automática
- [ ] Metadata embedding em imagens (EXIF)
- [ ] Log de geração (quem pediu, quando, params)

---

## 8. Estimativa de Custos

| Componente | Tipo | Custo |
|---|---|---|
| Sharp | Open source | Grátis |
| node-canvas | Open source | Grátis |
| Playwright | Open source | Grátis |
| PDFKit | Open source | Grátis |
| docxtemplater (core) | Open source | Grátis |
| docxtemplater (image plugin) | Pago | $249/ano |
| Claude Vision (QA) | API | ~$0.01/imagem |
| Gemini Vision (QA) | API | ~$0.005/imagem |
| Bannerbear (alternativa) | SaaS | $49+/mês |

**Stack recomendada (100% open source):** Sharp + node-canvas + Playwright + docxtemplater core + Claude Vision
**Custo mensal estimado (100 assets/dia):** ~$15-30 (apenas Vision API calls)

---

## 9. Conclusões e Próximos Passos

### Top 5 Ações Imediatas (por impacto/esforço)

1. **🔴 Instalar Sharp** — 1h de esforço, impacto imediato: imagens no formato/tamanho correto
2. **🔴 Vision QA** — 1 dia de esforço, elimina 90% dos retrabalhos
3. **🟠 Social Media Templates** — 1 semana, Pixel entrega posts prontos
4. **🟠 Playwright HTML→PDF** — 2 dias, proposals profissionais
5. **🟠 docxtemplater** — 2 dias, brand docs editáveis para clientes

### O que o Pixel vai se tornar

**Hoje:** Prompt → Imagem bruta (Gemini)  
**Após upgrade:**  
Prompt → AI Generate → Post-process → QA → Format → Deliver  

Com:
- ✅ Imagens no tamanho e formato certo para cada plataforma
- ✅ Watermark/logo automático
- ✅ Proposals e brand books em PDF profissional  
- ✅ Templates DOCX/PPTX editáveis pelo cliente
- ✅ Social media kit completo (todos os tamanhos de uma vez)
- ✅ QA visual automático antes de entregar
- ✅ Asset management organizado

---

## Fontes

[1] Sharp Performance Benchmarks — https://sharp.pixelplumbing.com/performance/  
[2] images-manipulation-performance benchmark (11.16 img/s Sharp vs 0.72 jimp) — https://github.com/ivanoff/images-manipulation-performance  
[3] Sharp vs ImageMagick comparison — https://medium.com/@DaveLumAI/sharp-vs-imagemagick  
[4] Cloudinary: Best Platform for Image Processing — https://cloudinary.com/guides/image-effects/best-platform-for-image-processing  
[5] npm-compare: puppeteer vs react-pdf vs pdfkit — https://npm-compare.com/html-pdf,pdfkit,pdfmake,puppeteer,react-pdf,wkhtmltopdf  
[6] docxtemplater npm (v3.68.3) — https://www.npmjs.com/package/docxtemplater  
[7] docxtemplater GitHub — https://github.com/open-xml-templating/docxtemplater  
[8] Google Gemini 3 Agentic Vision — https://blog.google/innovation-and-ai/technology/developers-tools/agentic-vision-gemini-3-flash/  
[9] Superside AI Design Trends 2026 — https://www.superside.com/blog/enterprise-ai-design-trends  
[10] AI Transforming Design Workflows 2025 — https://www.theinkorporated.com/insights/ai-transforming-design-workflows/  
[11] Sharp GitHub (4-5x faster than ImageMagick) — https://github.com/lovell/sharp  
[12] Generating Social Images with Node.js — https://cloudinary.com/blog/generating-social-images-node-js-hosting  

---

*Relatório gerado por Scout 🔍 | 2026-03-05 | Para uso interno — Agent Pixel Upgrade*
