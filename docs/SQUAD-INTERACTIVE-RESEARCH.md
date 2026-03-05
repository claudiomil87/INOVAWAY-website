# 🤖 INOVAWAY Squad — "Meet the Squad" Interactive Section Research

**Pesquisado por:** Scout 🔍  
**Data:** 2026-03-05  
**Objetivo:** Encontrar as melhores formas criativas, lúdicas e interativas de apresentar o squad de 8 AI Agents no site INOVAWAY  
**Stack alvo:** Next.js + Tailwind CSS + Framer Motion  
**Requisitos:** Gratuito, open source, mobile-first, dark mode, tech/futurista

---

## Resumo Executivo

O "Meet the Squad" pode ser uma das seções mais impressionantes do site se combinar:
1. **Bento Grid animado** com cards de cada agent (estilo Linear/Vercel)
2. **Terminal simulado** mostrando logs de atividade em tempo real (falso, mas convincente)
3. **Status indicators** pulsantes (online/busy/idle) com avatares DiceBear customizados
4. **Flip cards** com frente (avatar + nome + especialidade) e verso (stats, skill bars, última tarefa)
5. **Conexões animadas** (Animated Beam) mostrando os agents "se comunicando"

Todas as ferramentas necessárias são **100% gratuitas e open source**, prontas para Next.js + Tailwind + Framer Motion.

---

## 1. 🎨 Exemplos Reais de Inspiração

### Sites com apresentação criativa de equipes/bots:

#### 1.1 Taskade (taskade.com)
- Full-screen animation complimented por abas mostrando mind mapping, process automation, AI agents e AI chat
- Design tech-forward com bold Sans Serif fonts e dark gradient backgrounds com line graphics
- **O que roubar:** abas interativas por especialidade do agent, produto visível na animação

#### 1.2 Synthflow (synthflow.ai)
- Redesign recente com foco em product-led experience
- Strong visual hierarchy e intuitive layout guiando visitantes pelos features
- **O que roubar:** hierarquia visual, momentum visual, clareza de produto

#### 1.3 Linear (linear.app) e Vercel (vercel.com)
- Dark mode consistente, tipografia poderosa, micro-interactions sutis mas impactantes
- Cards minimalistas com hover effects elegantes
- **O que roubar:** estética dark, hover effects de spotlight/glow, layout de grid

#### 1.4 Builders Labs Mission Control (GitHub: PrakharMNNIT/Builders-labs-mission-control)
- Dashboard open source para orquestração de AI agents
- Activity feeds, token usage, task tracking, real-time monitoring
- **O que roubar:** conceito visual de "mission control" / war room com agents ativos

#### 1.5 Gastown Viewer (GitHub: intent-solutions-io/gastown-viewer-intent)
- Real-time agent observability dashboard — React web interface
- Beads tasks, agent activity, system health
- **O que roubar:** visualização de atividade por agent, estado em tempo real

---

## 2. 📦 Bibliotecas & Componentes Open Source (Next.js + Tailwind + Framer Motion)

### 2.1 🏆 Aceternity UI — Biblioteca Principal Recomendada
**URL:** https://ui.aceternity.com  
**GitHub:** https://github.com/aceternity/ui  
**Licença:** MIT | **Stack:** React, Next.js, Tailwind CSS, Framer Motion  
**Stars:** +20k

**Componentes relevantes para o Squad:**

| Componente | Uso no Squad | Link |
|---|---|---|
| **3D Card Effect** | Cards dos agents com perspectiva 3D no hover | /components/3d-card-effect |
| **Card Spotlight** | Card com efeito radial de luz seguindo o mouse | /components/card-spotlight |
| **Evervault Card** | Padrão dinâmico que muda no hover — visual criptográfico | /components/evervault-card |
| **Expandable Cards** | Cards que expandem ao clicar, mostrando detalhes do agent | /components/expandable-card |
| **Wobble Card** | Cards que balançam ao hover — gamificado | /components/wobble-card |
| **Encrypted Text** | Texto que revela gradualmente com efeito de gibberish | /components/encrypted-text |
| **Typewriter Effect** | Mostrar "tarefa atual" sendo digitada em tempo real | /components/typewriter-effect |
| **Background Beams** | Raios de luz explodindo atrás dos cards | /components/background-beams-with-collision |
| **Background Lines** | Linhas SVG animadas em padrão de onda — hero section | /components/background-lines |
| **Code Block** | Bloco de código estilizado para mostrar "logs do agent" | /components/code-block |
| **Draggable Card** | Cards que podem ser arrastados — gamificado! | /components/draggable-card |
| **Focus Cards** | Grid com foco no card hovereado, restante desfocado | /components/focus-cards |
| **Infinite Moving Cards** | Carrossel infinito de badges/atividades | /components/infinite-moving-cards |
| **Comet Card** | Card 3D com perspectiva como no site Perplexity Comet | /components/comet-card |
| **Glare Card** | Card com efeito de reflexo/glare ao mover o mouse | /components/glare-card |
| **Direction Aware Hover** | Animação de entrada varia pela direção do mouse | /components/direction-aware-hover |
| **ASCII Art** | Converter avatar em ASCII art — efeito retro/hacker | /components/ascii-art |

```bash
# Instalação Aceternity UI
npx shadcn@latest add "https://ui.aceternity.com/r/3d-card-effect.json"
# ou instalar manualmente copiando o componente
```

---

### 2.2 🪄 Magic UI — Segunda Biblioteca Recomendada
**URL:** https://magicui.design  
**GitHub:** https://github.com/magicuidesign/magicui  
**Licença:** MIT | **Stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion  
**Stars:** +19k

**Componentes ESSENCIAIS para o Squad:**

| Componente | Uso no Squad | Link |
|---|---|---|
| **Terminal** | Simular terminal com logs de atividade dos agents | /docs/components/terminal |
| **Animated Beam** | Linhas animadas conectando agents — mostra comunicação | /docs/components/animated-beam |
| **Orbiting Circles** | Ícones das especialidades orbitando o agent central | /docs/components/orbiting-circles |
| **Avatar Circles** | Grupo de avatares empilhados dos agents | /docs/components/avatar-circles |
| **Animated List** | Feed de atividades com itens entrando com animação | /docs/components/animated-list |
| **Bento Grid** | Layout bento com cards de tamanhos variados | /docs/components/bento-grid |
| **Marquee** | Carrossel infinito horizontal de badges/conquistas | /docs/components/marquee |
| **Animated Border** | Borda animada em cards ativos/selecionados | (border beam component) |
| **Icon Cloud** | Nuvem 3D rotacionando com ícones das ferramentas de cada agent | /docs/components/icon-cloud |
| **Globe** | Globo 3D interativo (caso queira mostrar presença global) | /docs/components/globe |
| **Pointer** | Cursor customizado que segue os cards | /docs/components/pointer |
| **Smooth Cursor** | Cursor suave animado para micro-interactions | /docs/components/smooth-cursor |

```bash
# Instalação Magic UI via npx shadcn
npx shadcn@latest add "https://magicui.design/r/animated-beam.json"
npx shadcn@latest add "https://magicui.design/r/terminal.json"
npx shadcn@latest add "https://magicui.design/r/bento-grid.json"
```

---

### 2.3 ⚡ nextjs-animated-components — Biblioteca Bônus
**GitHub:** https://github.com/itsjwill/nextjs-animated-components  
**Licença:** Open Source | **Stack:** Next.js, Framer Motion, GSAP, Three.js, Tailwind  

**Destaques únicos:**
- **Animated Chat UI** — spring-animated chat bubbles, streaming text, typing indicators, AI response card com animated border beam
- **Glitch filters** — efeito glitch visual para avatares dos agents
- **Circuit board generators** — padrão de circuito como background
- **Particle explosions** — explosão de partículas ao clicar em um agent
- **SVG self-drawing paths** — ícones que se "desenham" ao entrar na tela
- **Shape morphing** — formas que mudam de shape — excelente para avatares abstratos

---

### 2.4 🎯 Hover.dev — Componentes Ultra-Interativos
**URL:** https://www.hover.dev/components  
**Stack:** React, Tailwind CSS, Framer Motion  
**Licença:** Free to use

**O que tem:**
- Hover effects para cards que impressionam
- Animated buttons, magnetic effects, cursor followers
- Perfeito para micro-interactions nos cards dos agents

---

## 3. 💻 Terminal Simulado (Agent Activity Feed)

### 3.1 Magic UI Terminal Component ⭐ RECOMENDADO
**URL:** https://magicui.design/docs/components/terminal  
O componente mais bonito e moderno. Simula um terminal com animação de digitação.  
**Copy-paste direto** no projeto Next.js.

### 3.2 react-terminal-component
**GitHub:** https://github.com/rohanchandra/react-terminal-component  
**npm:** `npm install react-terminal-component javascript-terminal`  
Terminal completo com autocomplete, comandos, filesystem e temas.

### 3.3 Xterm.js ⭐ Para produção real
**URL:** https://xtermjs.org  
O terminal mais poderoso — usado pelo VS Code, JupyterLab, etc.  
Suporta WebSocket para conectar com backend real se quiser logs de verdade.

### 3.4 react-console-emulator
**GitHub:** https://github.com/linuswillner/react-console-emulator  
**npm:** `npm install react-console-emulator`  
Simples e customizável — ideal para simular logs de activity.

### 💡 Ideia de implementação — "Agent Live Terminal":
```jsx
// Fake activity logs por agent — rotaciona automaticamente
const agentLogs = {
  "Pixel": [
    "> Analisando paleta de cores para campanha Q1...",
    "> Gerando 3 variantes do hero section...",
    "> [OK] Design entregue: hero-v3.figma",
  ],
  "Nova": [
    "> Compilando componentes React...",
    "> Running lighthouse audit... score: 98",
    "> [OK] Deploy produção concluído",
  ],
  "Shield": [
    "> Scanning for CVE vulnerabilities...",
    "> Running OWASP Top 10 checklist...",
    "> [ALERT] Dependency audit: 0 critical found",
  ]
}
```

---

## 4. 🎭 Avatares para AI Agents

### 4.1 DiceBear ⭐⭐ RECOMENDADO PRINCIPAL
**URL:** https://www.dicebear.com  
**GitHub:** https://github.com/dicebear/dicebear  
**Licença:** MIT  

**Por que é perfeito:**
- **30+ estilos SVG** — inclui estilos tech/futuristas e robôs
- **Determinístico** — mesmo seed = mesmo avatar (consistência entre renders)
- **Self-hostable** — não depende de terceiros
- **TypeScript** — suporte nativo
- **Funciona no browser e Node.js**
- **API HTTP simples** — sem autenticação

**Estilos recomendados para AI Agents:**
- `bottts` — robôs coloridos (clássico para bots)
- `bottts-neutral` — robôs neutros/minimalistas
- `shapes` — formas geométricas abstratas
- `identicon` — padrões únicos estilo GitHub
- `pixel-art` — avatares pixel art — gamificado!
- `lorelei-neutral` — personagens elegantes

```bash
npm install @dicebear/core @dicebear/collection
```

```tsx
// Exemplo de uso
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

const avatar = createAvatar(bottts, {
  seed: 'Pixel-Design-Agent',
  backgroundColor: ['0a0a0a'],
  // customização por agent
});

const svg = avatar.toString();

// Ou via HTTP API (sem instalação):
// https://api.dicebear.com/9.x/bottts/svg?seed=Pixel
// https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Nova
```

**URLs de avatar para cada agent:**
```
🎨 Pixel:   https://api.dicebear.com/9.x/bottts/svg?seed=Pixel&backgroundColor=7c3aed
💻 Nova:    https://api.dicebear.com/9.x/bottts/svg?seed=Nova&backgroundColor=0ea5e9
⚙️ Forge:  https://api.dicebear.com/9.x/bottts/svg?seed=Forge&backgroundColor=f59e0b
🔍 Scout:  https://api.dicebear.com/9.x/bottts/svg?seed=Scout&backgroundColor=10b981
🛡️ Shield: https://api.dicebear.com/9.x/bottts/svg?seed=Shield&backgroundColor=ef4444
🔬 Lens:   https://api.dicebear.com/9.x/bottts/svg?seed=Lens&backgroundColor=6366f1
🚀 Spark:  https://api.dicebear.com/9.x/bottts/svg?seed=Spark&backgroundColor=ec4899
🧠 Arch:   https://api.dicebear.com/9.x/bottts/svg?seed=Arch&backgroundColor=8b5cf6
```

### 4.2 LottieFiles (lottiefiles.com)
- **Animações Lottie** de robôs e AI para usar como avatares animados
- Biblioteca free com JSONs prontos
- **lottie-react** para integrar:
  ```bash
  npm install lottie-react
  ```
- Buscar por: "robot", "AI", "bot", "artificial intelligence" em lottiefiles.com/free-animations
- **Dica:** avatar parado = DiceBear; avatar selecionado/hover = Lottie animation

### 4.3 Pixel Art Avatars Customizados
- **Piskel** (piskelapp.com) — editor de pixel art free para criar avatares únicos
- **Sprite.ai** — AI que gera sprites/avatares pixel art
- Exportar como PNG ou SVG

---

## 5. ✨ Efeitos Visuais & Partículas

### 5.1 tsParticles ⭐ RECOMENDADO
**GitHub:** https://github.com/tsparticles/tsparticles  
**npm:** `npm install @tsparticles/react @tsparticles/engine @tsparticles/preset-links`  
**Licença:** MIT  

**Efeitos disponíveis:**
- Partículas conectadas em rede (perfeito para mostrar agents "conectados")
- Confetti explosions ao clicar em um agent
- Fireworks
- Matrix rain
- Snow, bubbles, stars

```tsx
// Exemplo: partículas em rede como background do Squad
import Particles from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";

// Config dark mode — partículas conectadas
const options = {
  preset: "links",
  background: { color: "#0a0a0a" },
  particles: {
    color: { value: "#6366f1" },
    links: { color: "#6366f1", opacity: 0.3 }
  }
};
```

### 5.2 Matrix Digital Rain ⭐
**GitHub:** https://github.com/FullStackWithLawrence/react-mdr  
**npm:** `npm install react-mdr`  

```tsx
import { MatrixRain } from 'react-mdr';
// Pode usar como background da seção Squad ou em hover de um agent específico
<MatrixRain color="#00ff41" charset="01" />
```

**Alternativa:** shadcn Matrix Shaders (shadcn.io/shaders/matrix) — GPU-accelerated

### 5.3 react-matrix-rain (leve, sem dependências)
**GitHub:** https://github.com/kelvinleandro/react-matrix-rain  
- Componente Canvas puro, sem deps externas
- Ideal para background de cards individuais

---

## 6. 🎬 Micro-interactions & Animações de Alto Impacto

### 6.1 Framer Motion (já no stack) — Recursos Essenciais

#### Flip Card (Frente/Verso)
```tsx
// Frente: Avatar + Nome + Status
// Verso: Stats, Skill Bars, Última Tarefa
const FlipCard = ({ agent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <motion.div
      onClick={() => setIsFlipped(!isFlipped)}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <CardFront agent={agent} />
      <CardBack agent={agent} style={{ rotateY: 180 }} />
    </motion.div>
  );
};
```

#### Layout Animation — Card Expande ao Clicar
```tsx
// Card compacto → expande para modal com detalhes do agent
<AnimatePresence>
  {selected && (
    <motion.div
      layoutId={`card-${agent.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <AgentDetailModal agent={agent} />
    </motion.div>
  )}
</AnimatePresence>
```

#### Status Pulsante (Online/Busy/Idle)
```tsx
const StatusDot = ({ status }) => (
  <div className="relative">
    <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
    {status === 'online' && (
      <motion.div
        className="absolute inset-0 rounded-full bg-green-400"
        animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </div>
);
```

#### Skill Bar Animada (scroll-triggered)
```tsx
const SkillBar = ({ skill, value }) => (
  <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
    />
  </div>
);
```

### 6.2 react-spring — Physics-based Micro-interactions
**URL:** https://react-spring.dev  
**GitHub:** https://github.com/pmndrs/react-spring  
**npm:** `npm install @react-spring/web`  

**Por que usar junto com Framer Motion:**
- Physics springs mais naturais para drag-and-drop
- Melhor performance para animações contínuas (sem re-renders)
- Ideal para: gauge meters, counters, progress bars dos agents

```tsx
// Contador animado de tarefas completadas
import { useSpring, animated } from '@react-spring/web';

const AnimatedCounter = ({ value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { tension: 120, friction: 14 }
  });
  return <animated.span>{number.to(n => Math.floor(n))}</animated.span>;
};
```

---

## 7. 🗺️ Conceitos & Layouts Recomendados

### Layout 1: "Mission Control / War Room" ⭐⭐⭐ TOP RECOMENDADO

```
┌─────────────────────────────────────────────────────────┐
│  🧠 INOVAWAY SQUAD — MISSION CONTROL           [LIVE ●] │
├────────────────┬────────────────┬────────────────────────┤
│   🧠 ARCH      │   🎨 PIXEL     │  ⚡ LIVE ACTIVITY      │
│   ORCHESTRATOR │   DESIGNER     │                        │
│   [ONLINE ●]  │   [BUSY ●]    │  [Scout] Researching..  │
│   ──────────  │   ──────────  │  [Nova] Deploying...    │
│   Tasks: 847  │   Tasks: 234  │  [Forge] Building...    │
├────────────────┼────────────────┤  [Pixel] Designing...  │
│   💻 NOVA      │   ⚙️ FORGE    │  [Shield] Scanning...  │
│   FRONTEND     │   BACKEND      │                        │
│   [ONLINE ●]  │   [ONLINE ●]  ├────────────────────────┤
│   ──────────  │   ──────────  │  📊 SQUAD STATS         │
│   PRs: 1,203  │   Deploys: 89 │  Tasks Today: 1,247    │
├────────────────┼────────────────┤  Uptime: 99.9%        │
│   🔍 SCOUT    │   🛡️ SHIELD   │  Avg Response: 2.3s    │
│   RESEARCH     │   SECURITY     │                        │
│   [IDLE ○]    │   [BUSY ●]    │  > deploy complete...  │
└────────────────┴────────────────┴────────────────────────┘
```

**Implementação:**
- **Grid:** Tailwind `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- **Cards:** Aceternity Wobble Card + Magic UI Animated Border
- **Live Activity:** Magic UI Animated List (itens entram com slide animado)
- **Stats:** react-spring AnimatedCounter + Framer Motion scroll trigger
- **Terminal:** Magic UI Terminal Component

---

### Layout 2: "Bento Grid Interativo" ⭐⭐

```
┌──────────────────────┬───────────┬───────────┐
│                      │  🔍 SCOUT  │  🚀 SPARK  │
│    🧠 ARCH           │           │           │
│    [Card Grande]     ├───────────┴───────────┤
│    Orbiting Icons    │  📊 SQUAD LIVE STATS  │
│    all specialties   │                       │
├──────────┬───────────┴───────────────────────┤
│ 🎨 PIXEL │        💻 NOVA                   │
│          │        [Card Largo — Em destaque] │
├──────────┼───────────┬───────────┬───────────┤
│ ⚙️ FORGE │ 🛡️ SHIELD │ 🔬 LENS   │[TERMINAL] │
└──────────┴───────────┴───────────┴───────────┘
```

**Implementação:**
- **Magic UI Bento Grid** como estrutura base
- Cards de tamanhos variados (1x1, 2x1, 1x2, 2x2)
- Card do Arch com **Orbiting Circles** (ícones das especialidades ao redor)
- **Animated Beam** conectando Arch aos outros agents
- Card "SQUAD STATS" com gauges e counters animados
- Card "TERMINAL" com logs ao vivo

---

### Layout 3: "Character Select" (estilo game) ⭐⭐

Inspiração: tela de seleção de personagem de videogame (Street Fighter, Overwatch)

```
┌────┬────┬────┬────┐
│ 🧠 │ 🎨 │ 💻 │ ⚙️  │  ← Grid de avatares
├────┼────┼────┼────┤  
│ 🔍 │ 🛡️ │ 🔬 │ 🚀 │
└────┴────┴────┴────┘
         ↓ clica →
┌─────────────────────────────┐
│  🎨 PIXEL                   │
│  Creative Director          │
│  ████████░░ Design: 95%     │
│  ███████░░░ Figma: 85%      │
│  ██████░░░░ Motion: 78%     │
│                             │
│  STATUS: 🟡 BUSY             │
│  CURRENT: Redesigning hero  │
│  TASKS: 234 completed       │
└─────────────────────────────┘
```

**Implementação:**
- **Framer Motion layoutId** para transição suave do grid → detail
- **Aceternity Focus Cards** para o efeito de spotlight no card selecionado
- Pixel art avatars via DiceBear `pixel-art` style
- Skill bars com `whileInView` animation

---

### Layout 4: "Live Chat entre Agents" ⭐ (wow factor)

Simula uma conversa entre os agents sobre um projeto real.

```
┌─────────────────────────────────────┐
│  🤖 SQUAD CHAT — REAL TIME          │
│─────────────────────────────────────│
│  [🧠 Arch]  Iniciando sprint #47... │
│  [💻 Nova]  PR #203 pronto p/ review│
│  [⚙️ Forge] Deploy staging OK ✓    │
│  [🛡️ Shield] Scan completo — limpo  │
│  [🎨 Pixel]  Ajustando mobile nav...│
│  [🔬 Lens]  Running E2E tests...    │
│  [🔍 Scout]  Research entregue ✓   │
│                                     │
│  > [🧠 Arch] Excelente squad!_      │
└─────────────────────────────────────┘
```

**Implementação:**
- **nextjs-animated-components Animated Chat UI** — spring-animated bubbles, typing indicators
- Mensagens rodam em loop automático com delays diferentes por agent
- **Framer Motion AnimatePresence** para entrada/saída de mensagens
- Digitação com `useTypewriter` hook (npm: typewriter-effect)

---

## 8. 🃏 Componente: Agent Card Completo (Blueprint)

### Estrutura de dados de cada Agent:
```typescript
interface AgentCard {
  id: string;
  name: string;          // "Pixel"
  emoji: string;         // "🎨"
  role: string;          // "Creative Director"
  specialty: string;     // "Design & UI/UX"
  status: 'online' | 'busy' | 'idle';
  currentTask: string;   // "Redesenhando hero section..."
  stats: {
    tasksCompleted: number;
    uptime: string;      // "99.9%"
    avgResponseTime: string; // "1.2s"
    activeSince: string; // "há 3 meses"
  };
  skills: { name: string; value: number }[];
  tools: string[];       // ["Figma", "Framer", "Midjourney"]
  avatarUrl: string;     // DiceBear URL
  accentColor: string;   // "#7c3aed"
  badges: string[];      // ["Top Performer", "100 Tasks"]
}
```

### Card Component (pseudocódigo visual):
```
╔═══════════════════════════╗
║  [Glow border animada]    ║
║                           ║
║  ┌─────┐  🎨 PIXEL        ║
║  │ BOT │  Creative Dir.   ║
║  │ SVG │  🟡 BUSY          ║
║  └─────┘                  ║
║  ─────────────────────    ║
║  "Redesenhando hero..."   ║
║  [typewriter effect]      ║
║                           ║
║  Design  ████████░░ 95%   ║
║  Figma   ███████░░░ 85%   ║
║                           ║
║  Tasks: 234  ⬆️  Uptime  ║
║  99.9%                    ║
║                           ║
║  [Figma][Framer][AI]      ║
╚═══════════════════════════╝
```

---

## 9. 📐 Estrutura de Arquivos Sugerida

```
/components/squad/
├── SquadSection.tsx          # Container principal
├── AgentCard.tsx             # Card individual do agent
├── AgentCardFlip.tsx         # Versão flip (frente/verso)
├── AgentModal.tsx            # Modal expandido ao clicar
├── AgentTerminal.tsx         # Terminal simulado de logs
├── AgentStatusDot.tsx        # Indicador online/busy/idle
├── AgentSkillBar.tsx         # Barra de habilidade animada
├── AgentChat.tsx             # Chat simulado entre agents
├── AgentBeamNetwork.tsx      # Animated Beam connections
├── SquadStats.tsx            # Stats globais do squad
├── MatrixBackground.tsx      # Matrix rain background
└── data/
    └── agents.ts             # Dados dos 8 agents
```

---

## 10. 📋 Stack de Dependências Recomendada

```bash
# Essenciais
npm install framer-motion                    # já no stack
npm install @dicebear/core @dicebear/collection  # avatares

# Aceternity UI & Magic UI (copy-paste via shadcn)
npx shadcn@latest init

# Efeitos especiais
npm install @tsparticles/react @tsparticles/engine  # partículas
npm install react-mdr                         # matrix rain

# Terminal simulado (escolha um)
npm install react-terminal-component javascript-terminal  # completo
# OU copiar Magic UI Terminal Component (mais bonito)

# Animações complementares
npm install @react-spring/web                # physics micro-interactions
npm install lottie-react                     # animações Lottie
npm install typewriter-effect               # typewriter para current task

# Ícones (provavelmente já tem)
npm install lucide-react                     # ícones tech/UI
npm install @radix-ui/react-icons            # ícones adicionais
```

---

## 11. 🎮 Gamificação — Ideias de Alto Impacto

### Badges & Conquistas por Agent:
- 🏆 "100 Tasks" — completou 100 tarefas
- ⚡ "Speed Demon" — resposta < 1s
- 🌙 "Night Owl" — ativo às 3am
- 🔥 "On Fire" — 7 dias consecutivos
- 🎯 "Precision" — 0 bugs em produção

### Easter Eggs Sugeridos:
1. **Clicar no Arch 5x** → Matrix rain cobre a tela por 3 segundos
2. **Hover no Shield** → partículas de "escudo" se formam ao redor do card
3. **Clicar em "Forge"** → efeito de martelo/spark no card
4. **Sequência de clique** Arch→Scout→Nova → mensagem "Squad activated!" aparece no terminal

### Progressão Visual:
- Agents "ganham XP" (número fake que incrementa)
- Level badges (Lv.1 → Lv.99 para Arch)
- Progress ring ao redor do avatar mostrando "current task progress"

---

## 12. 📱 Mobile-First Considerations

### Adaptações para mobile:

```
Mobile (< 768px):          Tablet (768-1024px):
┌──────────────┐           ┌─────┬─────┐
│   🧠 ARCH    │           │ 🧠  │ 🎨  │
│  [Card Full] │           │     │     │
├──────────────┤           ├─────┼─────┤
│   🎨 PIXEL   │           │ 💻  │ ⚙️  │
│  [Card Full] │           └─────┴─────┘
├──────────────┤
│  [Swipe ←→] │  ← Carrossel horizontal
└──────────────┘
```

**Técnicas mobile-first:**
- **Magic UI Marquee** para scroll infinito horizontal no mobile
- **Aceternity Apple Cards Carousel** para swipe entre agents
- Cards em coluna única com expand ao toque
- Status indicator sempre visível (não depende de hover)
- Terminal minimizado por default, expande ao tocar
- Animated Beam desabilitado no mobile (performance)
- Partículas reduzidas/desabilitadas em `prefers-reduced-motion`

---

## 13. 🔗 Referências & Fontes

1. Aceternity UI — https://ui.aceternity.com/components
2. Magic UI — https://magicui.design
3. DiceBear Avatar Library — https://www.dicebear.com
4. tsParticles — https://github.com/tsparticles/tsparticles
5. react-mdr Matrix Rain — https://github.com/FullStackWithLawrence/react-mdr
6. react-matrix-rain — https://github.com/kelvinleandro/react-matrix-rain
7. react-spring — https://react-spring.dev
8. nextjs-animated-components — https://github.com/itsjwill/nextjs-animated-components
9. hover.dev — https://www.hover.dev/components
10. Framer Motion Layout Animations — https://motion.dev/docs/react-layout-animations
11. react-terminal-component — https://github.com/rohanchandra/react-terminal-component
12. lottie-react — https://lottiereact.com
13. LottieFiles — https://lottiefiles.com
14. Builders Labs Mission Control — https://github.com/PrakharMNNIT/Builders-labs-mission-control
15. Taskade Design Inspiration — https://motiontactic.com/blog/22-ai-websites-for-design-inspiration-in-2024/
16. Figma AI Tools Inspiration — https://www.figma.com/community/file/1476197281707353071
17. Aceternity 3D Card — https://ui.aceternity.com/components/3d-card-effect
18. Magic UI Bento Grid — https://magicui.design/docs/components/bento-grid
19. Magic UI Terminal — https://magicui.design/docs/components/terminal
20. Magic UI Animated Beam — https://magicui.design/docs/components/animated-beam

---

## 14. ⚡ Quick Start — Top 3 Componentes Para Começar HOJE

### Passo 1: Bento Grid com Magic UI (30 minutos)
```bash
npx shadcn@latest add "https://magicui.design/r/bento-grid.json"
```
Resultado: Grid responsivo com cards de tamanhos variados, ready-to-use.

### Passo 2: Avatares DiceBear (5 minutos)
```bash
npm install @dicebear/core @dicebear/collection
```
Use a URL da API diretamente como `<img src="https://api.dicebear.com/9.x/bottts/svg?seed=Pixel" />`

### Passo 3: Terminal Simulado Magic UI (15 minutos)
```bash
npx shadcn@latest add "https://magicui.design/r/terminal.json"
```
Resultado: Terminal animado pronto, só trocar os textos pelos logs dos agents.

---

*Relatório gerado por Scout 🔍 — Research & Intelligence Analyst | INOVAWAY Squad*  
*Todas as bibliotecas verificadas como gratuitas, open source e compatíveis com Next.js + Tailwind + Framer Motion*
