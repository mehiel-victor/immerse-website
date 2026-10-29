const palette = ['#173f35', '#2f5b46', '#668859', '#97a673', '#bdc392'];

function blade(x, y, length, angle, tone, width = .37) {
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M0 0C${-length * width} ${-length * .32} ${-length * width} ${-length * .87} 0 ${-length}C${length * width * .7} ${-length * .85} ${length * width} ${-length * .32} 0 0Z" fill="${tone}"/><path d="M0 -4Q-4 ${-length * .4} 0 ${-length * .94}" fill="none" stroke="#d7dfb4" stroke-opacity=".25" stroke-width="1.2"/></g>`;
}

function fern(x, y, scale, rotation, tone) {
  let leaves = '';
  for (let i = 0; i < 13; i++) {
    const height = 25 + i * 22;
    const length = 100 * Math.sin((i + 1) / 15 * Math.PI) + 12;
    leaves += blade(-i * 1.5, -height, length, -68 + i, tone, .23);
    leaves += blade(-i * 1.5, -height, length * .94, 64 - i, tone, .23);
  }
  return `<g transform="translate(${x} ${y}) scale(${scale}) rotate(${rotation})"><g class="sway" style="--sway:${rotation < 0 ? '2.8deg' : '-2.8deg'};--sway-time:${8 + Math.abs(rotation) % 4}s"><path d="M0 0Q-12-160-21-345" stroke="${tone}" fill="none" stroke-width="3"/>${leaves}${blade(-20,-300,65,-2,tone,.25)}</g></g>`;
}

function broadPlant(x, y, scale, tone, rotation = 0) {
  let leaves = '';
  const branches = [[-24,-110,150,-57], [12,-180,190,53], [-10,-247,180,-46], [4,-327,205,38], [-4,-395,170,-17]];
  for (const [px,py,len,rot] of branches) leaves += blade(px,py,len,rot,tone,.4);
  return `<g transform="translate(${x} ${y}) scale(${scale}) rotate(${rotation})"><g class="sway" style="--sway:-2deg;--sway-time:10s"><path d="M0 0Q-30-245-4-425" stroke="${tone}" stroke-width="6" fill="none"/>${leaves}</g></g>`;
}

function flower(x,y,scale,tone,id) {
  const petals=Array.from({length:8},(_,i)=>`<ellipse rx="16" ry="42" cy="-29" transform="rotate(${i*45})" fill="${tone}"/>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0 0Q-24 80-10 165" stroke="#42664d" stroke-width="4" fill="none"/>${blade(-9,110,66,-65,'#6f8759')}${blade(-8,80,54,55,'#73865b')}<g class="flower" style="--flower-delay:${id*65}ms">${petals}<circle r="17" fill="#d5a75e"/><circle r="8" fill="#775533"/></g></g>`;
}

function pot(x,y,scale,tone) {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cx="0" cy="8" rx="95" ry="15" fill="#1e3d30" opacity=".15"/>${broadPlant(0,-140,.73,'#436e51')}<path d="M-66-145H66L49-13Q0 7-49-13Z" fill="${tone}"/><ellipse cy="-145" rx="66" ry="12" fill="#dca580"/><ellipse cy="-144" rx="54" ry="6" fill="#6e513a"/><path d="M-44-122L-34-24M-21-120L-16-20M6-121V-20M32-121L26-23" stroke="#784b35" stroke-width="2" opacity=".22"/></g>`;
}

export function landscape(id, variant='jardim', extra='') {
  const terrace=variant==='varanda';
  const foreground=terrace
    ? `<g class="plant-edge-left">${pot(250,950,1.35,'#b57252')}</g><g class="plant-edge-right">${pot(1360,970,1.55,'#b37c59')}${pot(1190,940,.65,'#d2b875')}</g>`
    : `<g class="plant-edge-left">${fern(95,1080,2.2,-24,palette[0])}</g><g class="plant-edge-right">${broadPlant(1530,1090,1.6,palette[0],-9)}${fern(1430,1130,1.5,25,palette[1])}</g>`;
  const flowers=[flower(1060,790,.7,'#bd6d4c',0),flower(1165,835,.45,'#f0ce83',1),flower(305,840,.55,'#edbe79',2),flower(1230,785,.75,'#c98972',3)].join('');
  return `<div class="garden landscape ${extra}" id="${id}" data-variant="${variant}" data-light="day"><svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Jardim de papel em camadas, com samambaias, flores e um caminho entre a vegetação">
  <defs><pattern id="grain-${id}" width="13" height="17" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".7" fill="#173f35" opacity=".16"/><circle cx="9" cy="13" r=".5" fill="#173f35" opacity=".12"/></pattern><linearGradient id="sun-${id}" x2="0" y2="1"><stop stop-color="#edc67c"/><stop offset="1" stop-color="#e8b77a" stop-opacity=".3"/></linearGradient></defs>
  <rect width="1600" height="1000" class="world-sky"/><rect width="1600" height="1000" fill="url(#grain-${id})" opacity=".25"/>
  <g class="depth depth-far"><circle class="world-sun" cx="1250" cy="240" r="118" fill="url(#sun-${id})"/><path d="M0 680Q300 510 650 700T1600 640V1000H0Z" class="hill-back"/><path d="M0 760Q320 655 700 780Q1200 565 1600 740V1000H0Z" class="hill-front"/>
  <path d="M1130 1000Q540 890 800 693Q685 845 1480 1000Z" class="garden-path"/></g>
  <g class="depth depth-middle">${fern(170,930,1.1,18,palette[3])}${fern(1330,880,.9,-20,palette[3])}${broadPlant(1470,840,.8,palette[2],-18)}${broadPlant(80,890,.8,palette[2],15)}<g class="stems">${flowers}</g>${terrace?'<path d="M120 880H1490M170 880V640M480 880V640M1130 880V640M1440 880V640M170 640H1440" fill="none" stroke="#7a8c6a" stroke-width="6" opacity=".5"/>':''}</g>
  <g class="depth depth-front">${foreground}${fern(420,1100,1.5,-35,palette[1])}${broadPlant(1120,1160,.65,palette[1],35)}</g>
  <g class="floating-seeds" fill="#c98d51"><ellipse cx="340" cy="420" rx="4" ry="9" transform="rotate(30 340 420)"/><ellipse cx="1260" cy="490" rx="3" ry="7" transform="rotate(-25 1260 490)"/><ellipse cx="500" cy="630" rx="3" ry="6"/></g>
  </svg></div>`;
}

export function specimen(kind, index=0) {
  const shapes=kind==='jardim'?fern(250,420,1.1,5,palette[1]):kind==='varanda'?pot(250,440,.8,'#bb7755'):broadPlant(250,500,.8,palette[1],5);
  return `<svg viewBox="0 0 500 520" role="img" aria-label="Estudo botânico ilustrado de ${kind==='jardim'?'samambaia':kind==='varanda'?'folhagem em vaso':'folhas tropicais'}"><ellipse cx="250" cy="458" rx="145" ry="18" fill="#294c3a" opacity=".06"/><g class="specimen-plant">${shapes}</g><path d="M95 470H405" fill="none" stroke="#819477" stroke-opacity=".3"/><text x="250" y="502" text-anchor="middle" font-family="serif" font-size="12" letter-spacing="4" fill="#5b725f">ESTUDO BOTÂNICO / 0${index+1}</text></svg>`;
}
