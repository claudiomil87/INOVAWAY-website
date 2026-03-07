/**
 * make-contact-spark.js
 * Creates contact-spark.png — Spark avatar with orange glow + decorative elements
 * Output: 500x500 transparent PNG
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_PATH = path.join(__dirname, '../public/redesign/contact-spark.png');
const AVATAR_PATH = path.join(__dirname, '../public/squad/spark-avatar.webp');

const CANVAS = 500;
const AVATAR_SIZE = 240;     // avatar circle diameter
const GLOW_SIZE = 280;       // glow ring outer diameter
const CENTER = CANVAS / 2;   // 250

// ── helpers ────────────────────────────────────────────────────────────────

function svgCircle(cx, cy, r, fill, opacity = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;
}

// Build the full SVG overlay (decorative layer, drawn OVER the avatar)
function buildDecoSVG() {
  const W = CANVAS;
  const H = CANVAS;

  // Glow layers (behind avatar — these go in the background SVG)
  // Decorative elements: chat bubbles, envelope, checkmark

  // Chat bubble 1 (top-right)
  const cb1 = `
    <rect x="310" y="60" width="120" height="70" rx="14" ry="14" fill="#F97316" opacity="0.92"/>
    <polygon points="310,110 290,130 330,130" fill="#F97316" opacity="0.92"/>
    <circle cx="340" cy="95" r="8" fill="white" opacity="0.9"/>
    <circle cx="365" cy="95" r="8" fill="white" opacity="0.9"/>
    <circle cx="390" cy="95" r="8" fill="white" opacity="0.9"/>
  `;

  // Chat bubble 2 (bottom-left, smaller, light)
  const cb2 = `
    <rect x="65" y="330" width="100" height="55" rx="12" ry="12" fill="white" opacity="0.88"/>
    <polygon points="160,365 175,385 145,385" fill="white" opacity="0.88"/>
    <line x1="82" y1="350" x2="148" y2="350" stroke="#F97316" stroke-width="3" stroke-linecap="round"/>
    <line x1="82" y1="365" x2="130" y2="365" stroke="#F97316" stroke-width="3" stroke-linecap="round"/>
  `;

  // Envelope icon (bottom-right)
  const envelope = `
    <rect x="330" y="340" width="90" height="65" rx="8" ry="8" fill="#F97316" opacity="0.90"/>
    <polyline points="330,340 375,385 420,340" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
    <line x1="330" y1="405" x2="360" y2="378" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="420" y1="405" x2="390" y2="378" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  `;

  // Checkmark badge (top-left)
  const check = `
    <circle cx="120" cy="110" r="30" fill="#22C55E" opacity="0.95"/>
    <polyline points="108,110 118,122 134,98" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  `;

  // Small floating dots / sparkles
  const sparkles = `
    <circle cx="75" cy="200" r="6" fill="#F97316" opacity="0.7"/>
    <circle cx="88" cy="220" r="4" fill="#F97316" opacity="0.5"/>
    <circle cx="430" cy="200" r="5" fill="#F97316" opacity="0.6"/>
    <circle cx="415" cy="225" r="3" fill="#F97316" opacity="0.4"/>
    <circle cx="250" cy="55" r="5" fill="#F97316" opacity="0.55"/>
    <circle cx="270" cy="45" r="3" fill="#F97316" opacity="0.35"/>
    <circle cx="280" cy="445" r="4" fill="#F97316" opacity="0.5"/>
  `;

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${cb1}
  ${cb2}
  ${envelope}
  ${check}
  ${sparkles}
</svg>
  `.trim());
}

// Build background SVG (glow rings, lives beneath avatar)
function buildGlowSVG() {
  const W = CANVAS;
  const H = CANVAS;
  const cx = CENTER;
  const cy = CENTER;

  // Multi-layer glow: soft outer halos → solid ring
  const glows = [
    { r: 155, opacity: 0.08 },
    { r: 148, opacity: 0.13 },
    { r: 142, opacity: 0.20 },
    { r: 137, opacity: 0.30 },
    { r: 133, opacity: 0.45 },
    { r: 129, opacity: 0.65 },
  ].map(({ r, opacity }) => svgCircle(cx, cy, r, '#F97316', opacity)).join('\n  ');

  // Solid ring just outside avatar
  const solidRing = `
    <circle cx="${cx}" cy="${cy}" r="125" fill="#F97316" opacity="0.18"/>
    <circle cx="${cx}" cy="${cy}" r="122" fill="none" stroke="#F97316" stroke-width="4" opacity="0.85"/>
  `;

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${glows}
  ${solidRing}
</svg>
  `.trim());
}

// Create circular mask for avatar
function buildCircleMaskSVG(size) {
  const r = size / 2;
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
</svg>
  `.trim());
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎨 Building contact-spark.png…');

  // 1. Load avatar → resize → apply circular mask
  const avatarRaw = await sharp(AVATAR_PATH)
    .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: 'cover' })
    .png()
    .toBuffer();

  const circleMask = buildCircleMaskSVG(AVATAR_SIZE);

  const avatarCircle = await sharp(avatarRaw)
    .composite([{
      input: circleMask,
      blend: 'dest-in',
    }])
    .png()
    .toBuffer();

  console.log('✅ Avatar masked as circle');

  // 2. Compose: transparent canvas → glow → avatar → deco
  const avatarOffset = CENTER - AVATAR_SIZE / 2; // 250 - 120 = 130

  const composed = await sharp({
    create: {
      width: CANVAS,
      height: CANVAS,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    }
  })
    .composite([
      // Glow background
      { input: buildGlowSVG(), blend: 'over' },
      // Circular avatar centered
      { input: avatarCircle, top: avatarOffset, left: avatarOffset, blend: 'over' },
      // Decorative elements on top
      { input: buildDecoSVG(), blend: 'over' },
    ])
    .png()
    .toFile(OUTPUT_PATH);

  console.log(`✅ Saved: ${OUTPUT_PATH}`);
  console.log(`   Size: ${composed.width}x${composed.height} | Format: ${composed.format}`);
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
