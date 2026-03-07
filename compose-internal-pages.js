/**
 * INOVAWAY — Internal Pages Image Composer
 * Creates: service-agents-banner, product-upbro, product-hnbcrm, about-team
 * Uses: sharp + circular mask + colored glow (same technique as compose-redesign.js)
 */

const sharp = require('/home/ubuntu/clawd/skills/pixel-tools/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const SQUAD_DIR = '/home/ubuntu/projects/INOVAWAY-website/public/squad';
const OUT_DIR = '/home/ubuntu/projects/INOVAWAY-website/public/redesign';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const avatarPath = (name) => path.join(SQUAD_DIR, `${name}-avatar.png`);

// ─────────────────────────────────────────────
// Core: circular avatar with colored glow
// ─────────────────────────────────────────────
async function avatarWithGlow(name, size, glowColor, glowRadius = 28, glowOpacity = 185) {
  const r = parseInt(glowColor.slice(1, 3), 16);
  const g = parseInt(glowColor.slice(3, 5), 16);
  const b = parseInt(glowColor.slice(5, 7), 16);

  const avatarResized = await sharp(avatarPath(name))
    .resize(size, size)
    .ensureAlpha()
    .toBuffer();

  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
  );

  const maskedAvatar = await sharp(avatarResized)
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const totalSize = size + glowRadius * 2;

  // Outer glow layer (large, soft)
  const glowSvgOuter = Buffer.from(
    `<svg width="${totalSize}" height="${totalSize}">
      <circle cx="${totalSize / 2}" cy="${totalSize / 2}" r="${size / 2 + glowRadius * 0.9}" fill="rgba(${r},${g},${b},${Math.round(glowOpacity * 0.6) / 255})"/>
    </svg>`
  );

  // Inner glow layer (tighter, more intense)
  const glowSvgInner = Buffer.from(
    `<svg width="${totalSize}" height="${totalSize}">
      <circle cx="${totalSize / 2}" cy="${totalSize / 2}" r="${size / 2 + glowRadius * 0.4}" fill="rgba(${r},${g},${b},${Math.round(glowOpacity * 0.9) / 255})"/>
    </svg>`
  );

  const glowOuter = await sharp({
    create: { width: totalSize, height: totalSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  }).composite([{ input: glowSvgOuter }]).blur(glowRadius * 0.9).png().toBuffer();

  const glowInner = await sharp({
    create: { width: totalSize, height: totalSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  }).composite([{ input: glowSvgInner }]).blur(glowRadius * 0.4).png().toBuffer();

  const offset = glowRadius;
  return sharp({
    create: { width: totalSize, height: totalSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite([
      { input: glowOuter, left: 0, top: 0 },
      { input: glowInner, left: 0, top: 0 },
      { input: maskedAvatar, left: offset, top: offset }
    ])
    .png()
    .toBuffer();
}

// ─────────────────────────────────────────────
// Helper: text label below avatar
// ─────────────────────────────────────────────
function makeLabelSvg(text, color, width, height) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <text x="${width / 2}" y="${height - 4}" font-family="Arial, sans-serif" font-size="20" font-weight="bold"
        fill="rgba(${r},${g},${b},0.95)" text-anchor="middle" letter-spacing="2">${text.toUpperCase()}</text>
    </svg>`
  );
}

// ─────────────────────────────────────────────
// 1. service-agents-banner.png — 1400x400
// Pixel, Nova, Shield, Spark — hero lineup
// ─────────────────────────────────────────────
async function createServiceBanner() {
  console.log('Creating service-agents-banner.png...');

  const canvasW = 1400;
  const canvasH = 400;
  const avatarSize = 260;
  const glowR = 35;
  const totalAvatarSize = avatarSize + glowR * 2;

  const agents = [
    { name: 'pixel',  color: '#EC4899', label: 'Pixel' },
    { name: 'nova',   color: '#06B6D4', label: 'Nova' },
    { name: 'shield', color: '#EF4444', label: 'Shield' },
    { name: 'spark',  color: '#F97316', label: 'Spark' }
  ];

  // Space them evenly across the width
  const spacing = Math.round(canvasW / agents.length);
  const topY = Math.round((canvasH - totalAvatarSize) / 2) - 15;
  const labelH = 34;

  const buffers = await Promise.all(
    agents.map(a => avatarWithGlow(a.name, avatarSize, a.color, glowR, 195))
  );

  const composites = [];
  agents.forEach((a, i) => {
    const centerX = Math.round(spacing * i + spacing / 2);
    const left = centerX - Math.round(totalAvatarSize / 2);
    composites.push({ input: buffers[i], left: Math.max(0, left), top: topY });

    // Label below
    const labelSvg = makeLabelSvg(a.label, a.color, totalAvatarSize, labelH);
    composites.push({
      input: labelSvg,
      left: Math.max(0, left),
      top: topY + totalAvatarSize + 4
    });
  });

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'service-agents-banner.png'));

  console.log('✅ service-agents-banner.png');
}

// ─────────────────────────────────────────────
// 2. product-upbro.png — 600x400
// Forge + chat/bot/WhatsApp overlay icons
// ─────────────────────────────────────────────
async function createProductUpbro() {
  console.log('Creating product-upbro.png...');

  const canvasW = 600;
  const canvasH = 400;
  const avatarSize = 280;
  const glowR = 40;
  const totalSize = avatarSize + glowR * 2;
  const YELLOW = '#F59E0B';

  const forgeBuf = await avatarWithGlow('forge', avatarSize, YELLOW, glowR, 200);

  // Center forge slightly left-of-center
  const avatarLeft = Math.round((canvasW - totalSize) / 2) - 20;
  const avatarTop = Math.round((canvasH - totalSize) / 2);

  // Floating icon overlays — chat bubble, bot, WhatsApp-style
  const iconSize = 64;

  // Chat bubble icon (top-right area)
  const chatBubbleSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 64 64">
    <rect x="6" y="6" width="52" height="40" rx="10" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.6)" stroke-width="2.5"/>
    <polygon points="14,46 8,58 26,46" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.6)" stroke-width="2"/>
    <rect x="16" y="18" width="32" height="4" rx="2" fill="rgba(245,158,11,0.7)"/>
    <rect x="16" y="28" width="22" height="4" rx="2" fill="rgba(245,158,11,0.5)"/>
  </svg>`);

  // Bot/robot icon (top-left)
  const botSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 64 64">
    <rect x="14" y="20" width="36" height="32" rx="8" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.6)" stroke-width="2.5"/>
    <circle cx="23" cy="34" r="5" fill="rgba(245,158,11,0.7)"/>
    <circle cx="41" cy="34" r="5" fill="rgba(245,158,11,0.7)"/>
    <rect x="22" y="44" width="20" height="4" rx="2" fill="rgba(245,158,11,0.5)"/>
    <line x1="32" y1="12" x2="32" y2="20" stroke="rgba(245,158,11,0.7)" stroke-width="2.5"/>
    <circle cx="32" cy="10" r="4" fill="rgba(245,158,11,0.6)" stroke="rgba(245,158,11,0.8)" stroke-width="1.5"/>
    <line x1="14" y1="36" x2="4" y2="36" stroke="rgba(245,158,11,0.5)" stroke-width="2"/>
    <line x1="50" y1="36" x2="60" y2="36" stroke="rgba(245,158,11,0.5)" stroke-width="2"/>
  </svg>`);

  // WhatsApp-style icon (bottom-right)
  const waSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 64 64">
    <circle cx="32" cy="30" r="24" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.6)" stroke-width="2.5"/>
    <path d="M20 44 L16 54 L28 50 Q32 52 36 50 Q48 46 50 34 Q52 22 42 16 Q32 10 22 16 Q12 22 12 32 Q12 38 16 42 Z"
      fill="none" stroke="rgba(245,158,11,0.5)" stroke-width="1.5"/>
    <path d="M24 26 Q26 22 30 24 L32 28 Q28 30 26 32 Q28 38 34 42 L38 40 Q40 44 36 46 Q28 48 22 40 Q16 32 24 26 Z"
      fill="rgba(245,158,11,0.6)"/>
  </svg>`);

  // Glow dot decorations
  const dotGlowSvg = (color, size, opacity) => Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" opacity="${opacity}"/>
    </svg>`
  );

  const composites = [
    { input: forgeBuf, left: avatarLeft, top: avatarTop },
    // Floating icons
    { input: chatBubbleSvg, left: avatarLeft + totalSize - 20, top: avatarTop + 20 },
    { input: botSvg, left: avatarLeft - 50, top: avatarTop + 20 },
    { input: waSvg, left: avatarLeft + totalSize - 10, top: avatarTop + totalSize - 80 },
    // Subtle glowing dots
    { input: dotGlowSvg('rgba(245,158,11,0.3)', 16, 0.8), left: 80, top: 60 },
    { input: dotGlowSvg('rgba(245,158,11,0.2)', 10, 0.6), left: 500, top: 300 },
    { input: dotGlowSvg('rgba(245,158,11,0.25)', 12, 0.7), left: 520, top: 80 },
    { input: dotGlowSvg('rgba(245,158,11,0.2)', 8, 0.5), left: 40, top: 330 },
  ];

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'product-upbro.png'));

  console.log('✅ product-upbro.png');
}

// ─────────────────────────────────────────────
// 3. product-hnbcrm.png — 600x400
// Arch + pipeline/contacts/dashboard overlay
// ─────────────────────────────────────────────
async function createProductHnbcrm() {
  console.log('Creating product-hnbcrm.png...');

  const canvasW = 600;
  const canvasH = 400;
  const avatarSize = 280;
  const glowR = 40;
  const totalSize = avatarSize + glowR * 2;
  const PURPLE = '#8B5CF6';

  const archBuf = await avatarWithGlow('arch', avatarSize, PURPLE, glowR, 200);

  const avatarLeft = Math.round((canvasW - totalSize) / 2) - 20;
  const avatarTop = Math.round((canvasH - totalSize) / 2);

  const iconSize = 68;

  // Pipeline/Kanban icon (top-right)
  const pipelineSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 68 68">
    <rect x="4" y="4" width="18" height="60" rx="4" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.6)" stroke-width="2"/>
    <rect x="25" y="4" width="18" height="60" rx="4" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.6)" stroke-width="2"/>
    <rect x="46" y="4" width="18" height="60" rx="4" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.6)" stroke-width="2"/>
    <rect x="7" y="10" width="12" height="14" rx="3" fill="rgba(139,92,246,0.65)"/>
    <rect x="7" y="28" width="12" height="14" rx="3" fill="rgba(139,92,246,0.45)"/>
    <rect x="28" y="10" width="12" height="22" rx="3" fill="rgba(139,92,246,0.65)"/>
    <rect x="49" y="10" width="12" height="10" rx="3" fill="rgba(139,92,246,0.65)"/>
    <rect x="49" y="24" width="12" height="18" rx="3" fill="rgba(139,92,246,0.45)"/>
  </svg>`);

  // Contacts icon (bottom-left)
  const contactsSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 68 68">
    <circle cx="22" cy="24" r="12" fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.6)" stroke-width="2"/>
    <path d="M4 58 Q4 42 22 42 Q40 42 40 58" fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.6)" stroke-width="2"/>
    <circle cx="50" cy="20" r="9" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.5)" stroke-width="1.5"/>
    <path d="M36 54 Q36 42 50 42 Q64 42 64 54" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.5)" stroke-width="1.5"/>
    <circle cx="22" cy="24" r="6" fill="rgba(139,92,246,0.6)"/>
    <circle cx="50" cy="20" r="5" fill="rgba(139,92,246,0.4)"/>
  </svg>`);

  // Dashboard/chart icon (top-left)
  const dashboardSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 68 68">
    <rect x="4" y="4" width="60" height="60" rx="8" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.55)" stroke-width="2"/>
    <rect x="12" y="34" width="10" height="22" rx="2" fill="rgba(139,92,246,0.7)"/>
    <rect x="26" y="24" width="10" height="32" rx="2" fill="rgba(139,92,246,0.55)"/>
    <rect x="40" y="16" width="10" height="40" rx="2" fill="rgba(139,92,246,0.75)"/>
    <line x1="10" y1="14" x2="58" y2="14" stroke="rgba(139,92,246,0.35)" stroke-width="1.5"/>
  </svg>`);

  const dotGlow = (color, size, opacity) => Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" opacity="${opacity}"/>
    </svg>`
  );

  const composites = [
    { input: archBuf, left: avatarLeft, top: avatarTop },
    { input: pipelineSvg, left: avatarLeft + totalSize - 15, top: avatarTop + 15 },
    { input: contactsSvg, left: avatarLeft - 55, top: avatarTop + totalSize - 85 },
    { input: dashboardSvg, left: avatarLeft - 50, top: avatarTop + 10 },
    { input: dotGlow('rgba(139,92,246,0.35)', 18, 0.8), left: 500, top: 50 },
    { input: dotGlow('rgba(139,92,246,0.25)', 12, 0.6), left: 70, top: 340 },
    { input: dotGlow('rgba(139,92,246,0.2)', 10, 0.5), left: 540, top: 320 },
    { input: dotGlow('rgba(139,92,246,0.28)', 14, 0.7), left: 30, top: 70 },
  ];

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'product-hnbcrm.png'));

  console.log('✅ product-hnbcrm.png');
}

// ─────────────────────────────────────────────
// 4. about-team.png — 1400x500
// All 9 agents in arc/V formation, Arch center
// ─────────────────────────────────────────────
async function createAboutTeam() {
  console.log('Creating about-team.png...');

  const canvasW = 1400;
  const canvasH = 500;

  // Arc formation: Arch in center (largest), 4 on each side
  // Y positions: arc shape — center highest, edges lower
  const ARCH_SIZE = 280;
  const SIDE_SIZE = 190;
  const EDGE_SIZE = 155;
  const ARCH_GLOW = 38;
  const SIDE_GLOW = 28;
  const EDGE_GLOW = 22;

  // Agents ordered: left-edge, left-mid2, left-mid1, left-inner, ARCH, right-inner, right-mid1, right-mid2, right-edge
  const formation = [
    { name: 'flux',   color: '#FF6B6B', size: EDGE_SIZE, glow: EDGE_GLOW, opacity: 175 }, // far left
    { name: 'lens',   color: '#6366F1', size: SIDE_SIZE, glow: SIDE_GLOW, opacity: 185 }, // mid-left 2
    { name: 'scout',  color: '#10B981', size: SIDE_SIZE, glow: SIDE_GLOW, opacity: 185 }, // mid-left 1
    { name: 'pixel',  color: '#EC4899', size: SIDE_SIZE, glow: SIDE_GLOW, opacity: 190 }, // inner left
    { name: 'arch',   color: '#8B5CF6', size: ARCH_SIZE, glow: ARCH_GLOW, opacity: 210 }, // CENTER
    { name: 'nova',   color: '#06B6D4', size: SIDE_SIZE, glow: SIDE_GLOW, opacity: 190 }, // inner right
    { name: 'forge',  color: '#F59E0B', size: SIDE_SIZE, glow: SIDE_GLOW, opacity: 185 }, // mid-right 1
    { name: 'shield', color: '#EF4444', size: SIDE_SIZE, glow: SIDE_GLOW, opacity: 185 }, // mid-right 2
    { name: 'spark',  color: '#F97316', size: EDGE_SIZE, glow: EDGE_GLOW, opacity: 175 }, // far right
  ];

  // X positions: evenly distributed
  const totalAgents = 9;
  const xStep = Math.round(canvasW / totalAgents);
  const xPositions = formation.map((_, i) => Math.round(xStep * i + xStep / 2));

  // Y arc: center (arch) at highest point, edges drop down
  // Arc shape: y = centerY + arcDrop * (dist_from_center / 4)^1.5
  const centerY = Math.round(canvasH / 2) - 20;
  const arcDrop = 80; // pixels drop at edges

  const yPositions = formation.map((_, i) => {
    const distFromCenter = Math.abs(i - 4); // 0 at center (i=4)
    const drop = Math.round(arcDrop * Math.pow(distFromCenter / 4, 1.4));
    return centerY + drop;
  });

  // Generate all avatar buffers in parallel
  const buffers = await Promise.all(
    formation.map(a => avatarWithGlow(a.name, a.size, a.color, a.glow, a.opacity))
  );

  const labelH = 30;
  const composites = [];

  formation.forEach((a, i) => {
    const totalSize = a.size + a.glow * 2;
    const left = xPositions[i] - Math.round(totalSize / 2);
    const top = yPositions[i] - Math.round(totalSize / 2);

    composites.push({
      input: buffers[i],
      left: Math.max(0, Math.min(left, canvasW - totalSize)),
      top: Math.max(0, Math.min(top, canvasH - totalSize - labelH - 5))
    });

    // Agent name label
    const nameLabel = makeLabelSvg(a.name, a.color, totalSize, labelH);
    composites.push({
      input: nameLabel,
      left: Math.max(0, Math.min(left, canvasW - totalSize)),
      top: Math.max(0, Math.min(top + totalSize + 2, canvasH - labelH))
    });
  });

  // Render back-to-front (edge agents first, Arch last so it's on top)
  // Reorder composites so arch (i=4) is rendered last
  // We already have them in order; sharp composites in array order, later = on top
  // So let's put arch's composites at the end
  const archComposites = composites.splice(8, 2); // arch is at index 4 → composites[8,9]
  composites.push(...archComposites);

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'about-team.png'));

  console.log('✅ about-team.png');
}

// ─────────────────────────────────────────────
// RUN ALL
// ─────────────────────────────────────────────
(async () => {
  try {
    await createServiceBanner();
    await createProductUpbro();
    await createProductHnbcrm();
    await createAboutTeam();
    console.log('\n🎨 All internal page images created successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();
