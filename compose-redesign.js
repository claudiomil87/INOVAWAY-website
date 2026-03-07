/**
 * INOVAWAY Redesign Image Composer
 * Uses original squad avatars + sharp to create all redesign images
 * Output: /home/ubuntu/projects/INOVAWAY-website/public/redesign/
 */

const sharp = require('/home/ubuntu/clawd/skills/pixel-tools/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const SQUAD_DIR = '/home/ubuntu/projects/INOVAWAY-website/public/squad';
const OUT_DIR = '/home/ubuntu/projects/INOVAWAY-website/public/redesign';
const ICONS_DIR = path.join(OUT_DIR, 'icons');

// Ensure icons dir exists
if (!fs.existsSync(ICONS_DIR)) fs.mkdirSync(ICONS_DIR, { recursive: true });

const avatarPath = (name) => path.join(SQUAD_DIR, `${name}-avatar.png`);

/**
 * Create a circular-masked avatar with glow effect
 * Returns a Buffer (PNG with alpha)
 */
async function avatarWithGlow(name, size, glowColor, glowRadius = 25, glowOpacity = 180) {
  // Parse glow color
  const r = parseInt(glowColor.slice(1, 3), 16);
  const g = parseInt(glowColor.slice(3, 5), 16);
  const b = parseInt(glowColor.slice(5, 7), 16);

  // 1. Resize avatar to target size
  const avatarResized = await sharp(avatarPath(name))
    .resize(size, size)
    .ensureAlpha()
    .toBuffer();

  // 2. Create circle SVG mask
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
  );

  // 3. Apply circular mask using dest-in
  const maskedAvatar = await sharp(avatarResized)
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 4. Create glow layer (larger canvas with blurred colored circle)
  const totalSize = size + glowRadius * 2;
  const glowCircleSvg = Buffer.from(
    `<svg width="${totalSize}" height="${totalSize}">
      <circle cx="${totalSize / 2}" cy="${totalSize / 2}" r="${size / 2 + glowRadius * 0.6}" fill="rgba(${r},${g},${b},${glowOpacity / 255})"/>
    </svg>`
  );

  const glowLayer = await sharp({
    create: {
      width: totalSize,
      height: totalSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: glowCircleSvg }])
    .blur(glowRadius * 0.7)
    .png()
    .toBuffer();

  // 5. Composite: glow + avatar on a canvas of totalSize x totalSize
  const offset = glowRadius;
  const result = await sharp({
    create: {
      width: totalSize,
      height: totalSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: glowLayer, left: 0, top: 0 },
      { input: maskedAvatar, left: offset, top: offset }
    ])
    .png()
    .toBuffer();

  return result;
}

/**
 * 1. HERO IMAGE — Arch (center), Nova (left), Forge (right)
 * Canvas: 1200x500 transparent
 */
async function createHeroImage() {
  console.log('Creating hero image...');
  const GREEN = '#00FF41';
  const canvasW = 1200;
  const canvasH = 500;

  // Sizes for each avatar
  const archSize = 340;
  const sideSize = 260;
  const glowR = 30;

  const archTotal = archSize + glowR * 2;
  const sideTotal = sideSize + glowR * 2;

  // Generate each avatar with glow
  const [archBuf, novaBuf, forgeBuf] = await Promise.all([
    avatarWithGlow('arch', archSize, GREEN, glowR, 200),
    avatarWithGlow('nova', sideSize, GREEN, glowR, 160),
    avatarWithGlow('forge', sideSize, GREEN, glowR, 160)
  ]);

  // Positions: center Arch, Nova left, Forge right
  // Arch: horizontally centered, vertically centered
  const archLeft = Math.round((canvasW - archTotal) / 2);
  const archTop = Math.round((canvasH - archTotal) / 2);

  // Nova: left side, slightly lower
  const novaLeft = archLeft - sideTotal + 60; // overlap with arch
  const novaTop = Math.round((canvasH - sideTotal) / 2) + 20;

  // Forge: right side, slightly lower
  const forgeLeft = archLeft + archTotal - 60; // overlap with arch
  const forgeTop = Math.round((canvasH - sideTotal) / 2) + 20;

  const canvas = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: novaBuf, left: Math.max(0, novaLeft), top: Math.max(0, novaTop) },
      { input: forgeBuf, left: Math.min(canvasW - sideTotal, forgeLeft), top: Math.max(0, forgeTop) },
      { input: archBuf, left: Math.max(0, archLeft), top: Math.max(0, archTop) }
    ])
    .png()
    .toBuffer();

  await sharp(canvas)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'hero-squad-trio.png'));

  console.log('✅ hero-squad-trio.png');
}

/**
 * 2. SERVICE IMAGES — Individual avatars with colored glow
 * 600x600 PNG with transparency
 */
async function createServiceImages() {
  console.log('Creating service images...');

  const services = [
    { file: 'service-pixel-design.png', agent: 'pixel', color: '#EC4899' },
    { file: 'service-nova-dev.png', agent: 'nova', color: '#06B6D4' },
    { file: 'service-shield-security.png', agent: 'shield', color: '#EF4444' },
    { file: 'service-spark-marketing.png', agent: 'spark', color: '#F97316' }
  ];

  for (const svc of services) {
    const size = 520;
    const glowR = 40;
    const totalSize = size + glowR * 2;

    const buf = await avatarWithGlow(svc.agent, size, svc.color, glowR, 190);

    // Center on 600x600 canvas
    const canvasSize = 600;
    const offset = Math.round((canvasSize - totalSize) / 2);

    await sharp({
      create: {
        width: canvasSize,
        height: canvasSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: buf, left: offset, top: offset }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT_DIR, svc.file));

    console.log(`✅ ${svc.file}`);
  }
}

/**
 * 3. CTA IMAGE — All 9 avatars in a row
 * Canvas: 1400x300 transparent
 */
async function createCTAImage() {
  console.log('Creating CTA image...');
  const GREEN = '#00FF41';
  const order = ['arch', 'pixel', 'nova', 'forge', 'scout', 'shield', 'lens', 'spark', 'flux'];

  const canvasW = 1400;
  const canvasH = 300;
  const avatarSize = 120;
  const glowR = 20;
  const totalAvatarSize = avatarSize + glowR * 2;
  const overlap = 30;

  // Total width: 9 avatars with overlap
  const step = totalAvatarSize - overlap;
  const totalWidth = totalAvatarSize + step * (order.length - 1);
  const startX = Math.round((canvasW - totalWidth) / 2);
  const topY = Math.round((canvasH - totalAvatarSize) / 2);

  // Generate all avatars
  const avatarBuffers = await Promise.all(
    order.map(name => avatarWithGlow(name, avatarSize, GREEN, glowR, 160))
  );

  // Build composites array
  const composites = avatarBuffers.map((buf, i) => ({
    input: buf,
    left: startX + i * step,
    top: topY
  }));

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'cta-squad-formation.png'));

  console.log('✅ cta-squad-formation.png');
}

/**
 * 4. ICONS — Small avatar icons (transparent) for each agent
 * 256x256 PNG
 */
async function createIcons() {
  console.log('Creating icons...');
  const agents = ['arch', 'pixel', 'nova', 'forge', 'scout', 'shield', 'lens', 'spark', 'flux'];

  // Agent colors for glow
  const colors = {
    arch: '#8B5CF6',
    pixel: '#EC4899',
    nova: '#06B6D4',
    forge: '#F59E0B',
    scout: '#10B981',
    shield: '#EF4444',
    lens: '#3B82F6',
    spark: '#F97316',
    flux: '#A78BFA'
  };

  for (const agent of agents) {
    const size = 200;
    const glowR = 28;
    const totalSize = size + glowR * 2;
    const canvasSize = 256;

    const buf = await avatarWithGlow(agent, size, colors[agent], glowR, 180);
    const offset = Math.round((canvasSize - totalSize) / 2);

    await sharp({
      create: {
        width: canvasSize,
        height: canvasSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: buf, left: Math.max(0, offset), top: Math.max(0, offset) }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(ICONS_DIR, `${agent}-icon.png`));

    console.log(`✅ icons/${agent}-icon.png`);
  }
}

// RUN ALL
(async () => {
  try {
    await createHeroImage();
    await createServiceImages();
    await createCTAImage();
    await createIcons();
    console.log('\n🎨 All redesign images created successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();
