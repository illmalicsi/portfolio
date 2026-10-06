import fs from 'fs';
import path from 'path';
import process from 'node:process';

// Output path
const outputPath = path.resolve(process.cwd(), 'public/cat-spritesheet.svg');

// Palette
const coat = '#FFFFFF';
const outline = '#1E293B';
const stripe = '#CBD5E1';
const earPink = '#F472B6';
const blush = '#F472B6';
const eye = '#0F172A';
const shadow = 'rgba(0,0,0,0.12)';

function renderFrame(index, content) {
  const x = index * 64;
  return `  <g id="frame-${index}" transform="translate(${x}, 0)">
${content}
  </g>`;
}

// Helper parts
const shadowEllipse = (cx = 32, cy = 44, rx = 20, ry = 2.4) =>
  `    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${shadow}" />`;

const faceFeatures = (cx = 45, cy = 20, eyeType = 'open', blushOpacity = 0.65) => {
  let eyes = '';
  if (eyeType === 'open') {
    eyes = `
      <circle cx="${cx - 2.5}" cy="${cy - 2}" r="2.2" fill="${eye}" />
      <circle cx="${cx - 3.2}" cy="${cy - 2.7}" r="0.75" fill="#FFFFFF" />
      <circle cx="${cx + 4.5}" cy="${cy - 2}" r="2.2" fill="${eye}" />
      <circle cx="${cx + 3.8}" cy="${cy - 2.7}" r="0.75" fill="#FFFFFF" />`;
  } else if (eyeType === 'blink' || eyeType === 'sleep') {
    eyes = `
      <path d="M ${cx - 5} ${cy - 2} Q ${cx - 2.5} ${cy} ${cx} ${cy - 2}" stroke="${outline}" stroke-width="1.4" stroke-linecap="round" fill="none" />
      <path d="M ${cx + 2} ${cy - 2} Q ${cx + 4.5} ${cy} ${cx + 7} ${cy - 2}" stroke="${outline}" stroke-width="1.4" stroke-linecap="round" fill="none" />`;
  } else if (eyeType === 'happy') {
    eyes = `
      <path d="M ${cx - 5} ${cy - 1} Q ${cx - 2.5} ${cy - 3.5} ${cx} ${cy - 1}" stroke="${outline}" stroke-width="1.4" stroke-linecap="round" fill="none" />
      <path d="M ${cx + 2} ${cy - 1} Q ${cx + 4.5} ${cy - 3.5} ${cx + 7} ${cy - 1}" stroke="${outline}" stroke-width="1.4" stroke-linecap="round" fill="none" />`;
  }

  return `
    <!-- Face -->
    ${eyes}
    <ellipse cx="${cx - 6}" cy="${cy + 1}" rx="2" ry="1.3" fill="${blush}" opacity="${blushOpacity}" />
    <ellipse cx="${cx + 7.5}" cy="${cy + 1}" rx="2" ry="1.3" fill="${blush}" opacity="${blushOpacity}" />
    <ellipse cx="${cx + 1}" cy="${cy}" rx="1" ry="0.8" fill="${earPink}" />
    <path d="M ${cx - 0.4} ${cy + 1} Q ${cx + 0.8} ${cy + 2.4} ${cx + 0.8} ${cy + 1} Q ${cx + 2} ${cy + 2.4} ${cx + 2.4} ${cy + 1}" stroke="${outline}" stroke-width="1.2" stroke-linecap="round" fill="none" />`;
};

// Generate 28 frames
const frames = [];

// 0..3: Walking
for (let i = 0; i < 4; i++) {
  const f = i;
  const frontLegAngleA = f === 0 ? 14 : f === 1 ? -4 : f === 2 ? -14 : 4;
  const frontLegAngleB = f === 0 ? -14 : f === 1 ? 4 : f === 2 ? 14 : -4;
  const rearLegAngleA = f === 0 ? -12 : f === 1 ? 6 : f === 2 ? 12 : -6;
  const rearLegAngleB = f === 0 ? 12 : f === 1 ? -6 : f === 2 ? -12 : 6;
  const bodyBobY = f === 1 || f === 3 ? -1 : 0;
  const tailSwishAngle = f % 2 === 0 ? 6 : -6;

  frames.push(renderFrame(i, `
${shadowEllipse(32, 44, 21, 2.2)}
    <g transform="translate(0, ${bodyBobY})">
      <!-- Back legs -->
      <g transform="rotate(${rearLegAngleB}, 19, 35)">
        <path d="M 17 34 C 16 37, 16 41, 18 42 C 20 42.5, 21 41, 21 37 C 21 34, 19 33, 17 34 Z" fill="${stripe}" stroke="${outline}" stroke-width="1.6" />
      </g>
      <g transform="rotate(${frontLegAngleB}, 38, 35)">
        <path d="M 36 34 C 35 37, 35 41, 37 42 C 39 42.5, 40 41, 40 37 C 40 34, 38 33, 36 34 Z" fill="${stripe}" stroke="${outline}" stroke-width="1.6" />
      </g>
      <!-- Tail -->
      <g transform="rotate(${tailSwishAngle}, 13, 30)">
        <path d="M 13 30 C 7 28, 4 22, 7 17 C 9 14, 13 16, 12 20 C 11 24, 14 27, 16 30 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
      </g>
      <!-- Body -->
      <path d="M 18 27 C 13 27, 12 37, 19 38 C 27 39, 44 38, 49 32 C 52 27, 50 21, 44 19 C 37 17, 23 19, 18 27 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
      <!-- Head -->
      <circle cx="45" cy="20" r="9.5" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 38 15 C 36 9, 40 7, 43 12 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 39 13 C 38 10, 40 9, 42 12 Z" fill="${earPink}" />
      <path d="M 47 11 C 50 7, 54 9, 52 15 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 48 11 C 50 9, 52 10, 51 13 Z" fill="${earPink}" />
      ${faceFeatures(45, 20, 'open')}
      <!-- Front legs -->
      <g transform="rotate(${rearLegAngleA}, 21, 35)">
        <path d="M 19 34 C 18 37, 18 41, 20 42 C 22 42.5, 23 41, 23 37 C 23 34, 21 33, 19 34 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      </g>
      <g transform="rotate(${frontLegAngleA}, 40, 35)">
        <path d="M 38 34 C 37 37, 37 41, 39 42 C 41 42.5, 42 41, 42 37 C 42 34, 40 33, 38 34 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      </g>
    </g>`));
}

// 4..7: Sitting
const sitEyeTypes = ['open', 'open', 'blink', 'open'];
const sitOffsets = [0, -0.6, 0, 0];
for (let i = 0; i < 4; i++) {
  const eyeT = sitEyeTypes[i];
  const dy = sitOffsets[i];
  const earTwitch = i === 1 ? -4 : 0;
  frames.push(renderFrame(4 + i, `
${shadowEllipse(32, 44, 22, 2.5)}
    <g transform="translate(0, ${dy})">
      <!-- Tail curled forward -->
      <path d="M 17 38 C 11 38, 8 44, 24 43 C 28 42, 30 40, 27 38 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      <!-- Sitting Body -->
      <path d="M 18 40 C 12 40, 11 26, 19 18 C 25 12, 39 12, 45 18 C 53 26, 52 40, 46 40 C 40 41, 24 41, 18 40 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
      <!-- Stripes -->
      <path d="M 16 24 C 19 25, 22 25, 24 23" stroke="${stripe}" stroke-width="1.6" stroke-linecap="round" fill="none" />
      <path d="M 14 29 C 18 30, 21 30, 24 28" stroke="${stripe}" stroke-width="1.6" stroke-linecap="round" fill="none" />
      <!-- Ears -->
      <g transform="rotate(${earTwitch}, 23, 15)">
        <path d="M 23 15 C 21 9, 24 6, 28 11 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M 24 13 C 23 10, 25 8, 27 11 Z" fill="${earPink}" />
      </g>
      <path d="M 36 11 C 40 6, 43 9, 41 15 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 37 11 C 39 8, 41 10, 40 13 Z" fill="${earPink}" />
      ${faceFeatures(31, 22, eyeT)}
      <!-- Front paws -->
      <ellipse cx="28" cy="39" rx="3.5" ry="3" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      <ellipse cx="34" cy="39" rx="3.5" ry="3" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
    </g>`));
}

// 8..11: Idle (standing, looking around)
const idleHeadAngles = [0, -5, 0, 5];
for (let i = 0; i < 4; i++) {
  const rot = idleHeadAngles[i];
  frames.push(renderFrame(8 + i, `
${shadowEllipse(32, 44, 21, 2.2)}
    <!-- Back legs -->
    <path d="M 19 34 C 18 37, 18 41, 20 42 C 22 42.5, 23 41, 23 37 Z" fill="${stripe}" stroke="${outline}" stroke-width="1.6" />
    <path d="M 38 34 C 37 37, 37 41, 39 42 C 41 42.5, 42 41, 42 37 Z" fill="${stripe}" stroke="${outline}" stroke-width="1.6" />
    <!-- Tail -->
    <path d="M 13 30 C 7 28, 4 22, 7 17 C 9 14, 13 16, 12 20 C 11 24, 14 27, 16 30 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
    <!-- Body -->
    <path d="M 18 27 C 13 27, 12 37, 19 38 C 27 39, 44 38, 49 32 C 52 27, 50 21, 44 19 C 37 17, 23 19, 18 27 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
    <!-- Head group -->
    <g transform="rotate(${rot}, 45, 20)">
      <circle cx="45" cy="20" r="9.5" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 38 15 C 36 9, 40 7, 43 12 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 39 13 C 38 10, 40 9, 42 12 Z" fill="${earPink}" />
      <path d="M 47 11 C 50 7, 54 9, 52 15 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 48 11 C 50 9, 52 10, 51 13 Z" fill="${earPink}" />
      ${faceFeatures(45, 20, 'open')}
    </g>
    <!-- Front legs -->
    <path d="M 21 34 C 20 37, 20 41, 22 42 C 24 42.5, 25 41, 25 37 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
    <path d="M 40 34 C 39 37, 39 41, 41 42 C 43 42.5, 44 41, 44 37 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />`));
}

// 12..15: Grooming (paw lick)
const groomPawDy = [0, -4, -6, -2];
const groomEye = ['open', 'happy', 'happy', 'open'];
for (let i = 0; i < 4; i++) {
  const pdy = groomPawDy[i];
  const eyeT = groomEye[i];
  frames.push(renderFrame(12 + i, `
${shadowEllipse(32, 44, 22, 2.5)}
    <!-- Sitting Body -->
    <path d="M 18 40 C 12 40, 11 26, 19 18 C 25 12, 39 12, 45 18 C 53 26, 52 40, 46 40 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
    <!-- Ears -->
    <path d="M 23 15 C 21 9, 24 6, 28 11 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
    <path d="M 24 13 C 23 10, 25 8, 27 11 Z" fill="${earPink}" />
    <path d="M 36 11 C 40 6, 43 9, 41 15 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
    <path d="M 37 11 C 39 8, 41 10, 40 13 Z" fill="${earPink}" />
    ${faceFeatures(31, 22, eyeT)}
    <!-- Left paw on ground -->
    <ellipse cx="27" cy="39" rx="3.5" ry="3" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
    <!-- Grooming right paw -->
    <g transform="translate(0, ${pdy})">
      <path d="M 35 38 C 36 34, 38 28, 36 24 C 34 22, 31 23, 31 26 C 31 30, 33 36, 35 38 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      <ellipse cx="34" cy="24" rx="2.5" ry="2" fill="${coat}" stroke="${outline}" stroke-width="1.4" />
    </g>`));
}

// 16..19: Loafing (paws tucked, gentle breathing)
const loafBreaths = [0, -0.6, -1.0, -0.4];
for (let i = 0; i < 4; i++) {
  const dy = loafBreaths[i];
  const eyeT = i === 2 ? 'blink' : 'open';
  frames.push(renderFrame(16 + i, `
${shadowEllipse(32, 44, 23, 2.5)}
    <g transform="translate(0, ${dy})">
      <!-- Loaf body: smooth compact loaf shape -->
      <path d="M 15 41 C 10 41, 9 27, 18 19 C 25 13, 39 13, 46 19 C 54 27, 53 41, 46 41 C 38 42, 22 42, 15 41 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <!-- Ears -->
      <path d="M 23 15 C 21 9, 24 6, 28 11 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 24 13 C 23 10, 25 8, 27 11 Z" fill="${earPink}" />
      <path d="M 36 11 C 40 6, 43 9, 41 15 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 37 11 C 39 8, 41 10, 40 13 Z" fill="${earPink}" />
      ${faceFeatures(31, 23, eyeT)}
      <!-- Tucked front paws seam -->
      <path d="M 26 40 C 29 41.5, 33 41.5, 36 40" stroke="${outline}" stroke-width="1.5" stroke-linecap="round" fill="none" />
    </g>`));
}

// 20..23: Sleeping (curled up, closed eyes, deep breathing)
const sleepBreaths = [0, -0.6, -1.2, -0.6];
for (let i = 0; i < 4; i++) {
  const dy = sleepBreaths[i];
  frames.push(renderFrame(20 + i, `
${shadowEllipse(32, 44, 23, 2.5)}
    <g transform="translate(0, ${dy})">
      <!-- Curled sleeping shape -->
      <path d="M 14 41 C 9 41, 9 26, 19 20 C 27 15, 41 15, 48 21 C 55 28, 54 41, 47 41 C 38 42, 22 42, 14 41 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <!-- Tail wrapped across flank -->
      <path d="M 14 38 C 18 34, 26 35, 30 38" stroke="${outline}" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <!-- Ears relaxed -->
      <path d="M 22 17 C 20 12, 23 9, 27 13 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 23 15 C 22 12, 24 11, 26 13 Z" fill="${earPink}" />
      <path d="M 35 13 C 39 9, 42 12, 40 17 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 36 13 C 38 11, 40 12, 39 15 Z" fill="${earPink}" />
      ${faceFeatures(31, 25, 'sleep', 0.4)}
    </g>`));
}

// 24..27: Jumping (crouch, launch, apex, land)
const jumpData = [
  { dy: 2, scaleY: 0.9, rearAngle: 20, frontAngle: 20 },
  { dy: -4, scaleY: 1.15, rearAngle: -35, frontAngle: 30 },
  { dy: -7, scaleY: 1.0, rearAngle: 15, frontAngle: -20 },
  { dy: 1, scaleY: 0.95, rearAngle: 10, frontAngle: 10 },
];
for (let i = 0; i < 4; i++) {
  const jd = jumpData[i];
  frames.push(renderFrame(24 + i, `
${shadowEllipse(32, 44, 18, 1.8)}
    <g transform="translate(0, ${jd.dy}) scale(1, ${jd.scaleY})">
      <!-- Tail extended -->
      <path d="M 13 30 C 6 25, 5 18, 9 12 C 11 10, 14 12, 13 16 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <!-- Body -->
      <path d="M 18 27 C 13 27, 12 37, 19 38 C 27 39, 44 38, 49 32 C 52 27, 50 21, 44 19 C 37 17, 23 19, 18 27 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <!-- Head -->
      <circle cx="45" cy="20" r="9.5" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 38 15 C 36 9, 40 7, 43 12 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 39 13 C 38 10, 40 9, 42 12 Z" fill="${earPink}" />
      <path d="M 47 11 C 50 7, 54 9, 52 15 Z" fill="${coat}" stroke="${outline}" stroke-width="1.8" />
      <path d="M 48 11 C 50 9, 52 10, 51 13 Z" fill="${earPink}" />
      ${faceFeatures(45, 20, 'happy')}
      <!-- Legs angled in jump -->
      <g transform="rotate(${jd.rearAngle}, 20, 35)">
        <path d="M 19 34 C 18 37, 18 41, 20 42 C 22 42.5, 23 41, 23 37 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      </g>
      <g transform="rotate(${jd.frontAngle}, 40, 35)">
        <path d="M 38 34 C 37 37, 37 41, 39 42 C 41 42.5, 42 41, 42 37 Z" fill="${coat}" stroke="${outline}" stroke-width="1.6" />
      </g>
    </g>`));
}

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 48" width="1792" height="48">
  <defs>
    <style>
      path, circle, ellipse { vector-effect: non-scaling-stroke; }
    </style>
  </defs>
${frames.join('\n')}
</svg>
`;

fs.writeFileSync(outputPath, svgContent, 'utf-8');
console.log('Successfully generated public/cat-spritesheet.svg! Total frames: 28, width: 1792px, height: 48px');
