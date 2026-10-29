import * as THREE from './assets/vendor/three.module.min.js';
import { createWindField } from './wind-field.js?v=20261028-scroll1';

// Original procedural botanical installation. No third-party models or textures.
export function buildGarden(scene, compact = false) {
  let seed = 17327;
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const textures = [], flowerGroups = [], stemMatrices = [];
  const plantRoots = [], bendBuffers = [], lastBends = [];
  let plantIndex = -1;
  function plantAt(x, y, z) { plantRoots.push(new THREE.Vector3(x, y, z)); plantIndex = plantRoots.length - 1; }
  const time = { value: 0 }, breeze = { value: 0.12 };
  const root = new THREE.Group();
  scene.add(root);
  const standard = (color, roughness = 0.8, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const soil = standard('#253122');
  const stone = standard('#73715b', 0.9);
  const brass = standard('#b8a878', 0.32, 0.52);
  const clay = standard('#9c5740', 0.78);
  const trunk = standard('#3a3926');

  function mesh(geometry, material, parent = root) {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true; object.receiveShadow = true;
    parent.add(object); return object;
  }
  function cylinderBetween(a, b, radius, material, parent) {
    const direction = new THREE.Vector3().subVectors(b, a);
    const branch = new THREE.Object3D();
    branch.position.copy(a).add(b).multiplyScalar(0.5);
    branch.scale.set(radius,direction.length(),radius);
    branch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    branch.updateMatrix();stemMatrices.push({ matrix: branch.matrix.clone(), plant: plantIndex });
    return branch;
  }
  function leafTexture() {
    const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, '#71883d'); gradient.addColorStop(0.46, '#c0c787');
    gradient.addColorStop(0.51, '#7d954c'); gradient.addColorStop(1, '#526f2b');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 256, 512);
    for (let i = 0; i < 2800; i++) {
      ctx.fillStyle = `rgba(19,44,17,${random() * 0.13})`;
      ctx.fillRect(random() * 256, random() * 512, 1, 1 + random() * 4);
    }
    ctx.lineWidth = 1.1; ctx.strokeStyle = 'rgba(221,225,159,.25)';
    for (let y = 25; y < 500; y += 20) {
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(128, y);
        ctx.bezierCurveTo(128 + 38 * side, y + 8, 128 + 95 * side, y + 38, 128 + 130 * side, y + 55); ctx.stroke();
      }
    }
    ctx.lineWidth = 2.1; ctx.strokeStyle = 'rgba(215,225,157,.6)';
    ctx.beginPath(); ctx.moveTo(128, 0); ctx.lineTo(128, 512); ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4; textures.push(texture); return texture;
  }
  function leafGeometry(width = 0.36, curl = 0.32, split = false, rows = 16, columns = 4) {
    const positions = [], uvs = [], indices = [];
    for (let iy = 0; iy <= rows; iy++) {
      const t = iy / rows;
      const lobes = split ? 1 - 0.07 * Math.pow(Math.sin(t * Math.PI * 7), 4) : 1;
      const span = Math.pow(Math.sin(Math.PI * t), 0.75) * width * lobes;
      for (let ix = 0; ix <= columns; ix++) {
        const side = ix / columns * 2 - 1;
        positions.push(side * span, t, curl * t * t - Math.abs(side) * 0.09 * Math.sin(t * Math.PI) + side * t * 0.055);
        uvs.push(ix / columns, t);
        if (iy < rows && ix < columns) {
          const a = iy * (columns + 1) + ix, b = a + columns + 1;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices); geometry.computeVertexNormals(); return geometry;
  }
  const leafMat = new THREE.MeshStandardMaterial({ color: '#d7e4b2', map: leafTexture(), roughness: 0.43, metalness: 0.05, side: THREE.DoubleSide });
  const plantShader = `
    attribute vec3 aPlantRoot;
    attribute vec4 aPlantRotation;
    vec3 bendPlant(vec3 value) {
      return value + 2. * cross(aPlantRotation.xyz, cross(aPlantRotation.xyz, value) + aPlantRotation.w * value);
    }
  `;
  function deformPlant(material, leafFlutter = false) {
    material.onBeforeCompile = shader => {
      shader.uniforms.uGardenTime = time; shader.uniforms.uBreeze = breeze;
      shader.vertexShader = `${plantShader}uniform float uGardenTime; uniform float uBreeze;\n${shader.vertexShader}`;
      if (leafFlutter) shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        float phase = aPlantRoot.x * 1.7 + aPlantRoot.z * 1.1;
        float impulse = length(aPlantRotation.xyz) * 2.;
        transformed.x += sin(uGardenTime * .52 + phase + position.y * 1.8) * position.y * position.y * uBreeze;
        transformed.z += cos(uGardenTime * .37 + phase) * position.y * .025;
        transformed.z += sin(uGardenTime * 7. + phase + position.y * 3.) * impulse * position.y * position.y * .09;`);
      shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', `
        vec4 mvPosition = vec4(transformed, 1.);
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        mvPosition.xyz = aPlantRoot + bendPlant(mvPosition.xyz - aPlantRoot);
        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;`);
      shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', `
        vec4 worldPosition = vec4(transformed, 1.);
        #ifdef USE_INSTANCING
          worldPosition = instanceMatrix * worldPosition;
        #endif
        worldPosition.xyz = aPlantRoot + bendPlant(worldPosition.xyz - aPlantRoot);
        worldPosition = modelMatrix * worldPosition;`);
      shader.vertexShader = shader.vertexShader.replace('#include <defaultnormal_vertex>', `
        vec3 transformedNormal = objectNormal;
        #ifdef USE_INSTANCING
          mat3 im = mat3(instanceMatrix);
          transformedNormal /= vec3(dot(im[0], im[0]), dot(im[1], im[1]), dot(im[2], im[2]));
          transformedNormal = im * transformedNormal;
        #endif
        transformedNormal = normalMatrix * bendPlant(transformedNormal);
        #ifdef FLIP_SIDED
          transformedNormal = -transformedNormal;
        #endif`);
    };
    material.customProgramCacheKey = () => `brisa-rooted-quaternion-${leafFlutter}`;
    return material;
  }
  deformPlant(leafMat, true); deformPlant(trunk);
  const leafDepth = deformPlant(new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking }), true);
  const stemDepth = deformPlant(new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking }));
  const leaves = [], narrow = [];
  function leaf(position, direction, length, width, azimuth = 0, isNarrow = false) {
    const object = new THREE.Object3D(); object.position.copy(position);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    object.rotateY(azimuth); object.scale.set(width, length, length); object.updateMatrix();
    (isNarrow ? narrow : leaves).push({ plant: plantIndex, matrix: object.matrix.clone(), color: new THREE.Color().setHSL(0.17 + random() * 0.08, 0.15 + random() * 0.16, 0.67 + random() * 0.25) });
  }
  function tropical(x, z, height, spread, count = 12, y = 0.3) {
    plantAt(x, y, z);
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2 + random() * 0.6;
      const tip = new THREE.Vector3(x + Math.cos(angle) * spread, y + height * (0.65 + random() * 0.35), z + Math.sin(angle) * spread);
      const origin = new THREE.Vector3(x, y, z);
      const direction = new THREE.Vector3(Math.cos(angle) * 0.7, 0.4 + random() * 0.5, Math.sin(angle) * 0.7);
      cylinderBetween(origin, tip, 0.012 * height, trunk, root);
      leaf(tip, direction, height * (0.5 + random() * 0.25), height * (0.4 + random() * 0.3), random() * 2.5);
    }
  }
  function fern(x, z, scale, y = 0.28) {
    plantAt(x, y, z);
    for (let arm = 0; arm < 7; arm++) {
      const angle = arm / 7 * Math.PI * 2 + random() * 0.4;
      const armLength = (0.7 + random() * 0.45) * scale;
      for (let node = 0; node < 9; node++) {
        const t = node / 9;
        const p = new THREE.Vector3(x + Math.cos(angle) * armLength * t, y + Math.sin(t * 2.6) * scale * 0.55, z + Math.sin(angle) * armLength * t);
        for (const side of [-1, 1]) {
          const a = angle + side * 1.1;
          const direction = new THREE.Vector3(Math.cos(a), 0.38, Math.sin(a));
          leaf(p, direction, scale * 0.38 * (1 - t * 0.7), scale * 0.25, 0, true);
        }
      }
    }
  }
  function pot(x, z, size, y = 0, material = clay) {
    const points = [[0,0], [.55,0], [.58,.08], [.65,.12], [.79,1.2], [.83,1.24], [.83,1.35], [.72,1.35], [.69,1.23], [.6,.2]].map(([r,h]) => new THREE.Vector2(r * size,h * size));
    const vessel = mesh(new THREE.LatheGeometry(points, 48), material);
    vessel.position.set(x,y,z);
    const earth = mesh(new THREE.CylinderGeometry(size * .72, size * .72, .04, 48), soil);
    earth.position.set(x,y + size * 1.2,z);
    return y + size * 1.2;
  }

  // The shallow island, a water ribbon and stepping stones establish a physical route.
  const island = mesh(new THREE.CylinderGeometry(5.7, 5.2, 0.6, 96), soil);
  island.position.y = -0.05; island.scale.z = 0.77;
  const rim = mesh(new THREE.TorusGeometry(5.48, 0.025, 6, 128), brass);
  rim.rotation.x = Math.PI / 2; rim.scale.y = .77; rim.position.y = .26;
  const water = mesh(new THREE.CircleGeometry(2.3, 64), new THREE.MeshStandardMaterial({ color: '#455f47', metalness: .65, roughness: .15 }));
  water.rotation.x = -Math.PI/2; water.scale.set(1,.72,1); water.position.set(.9,.27,.9);
  water.material.onBeforeCompile = shader => {
    shader.uniforms.uGardenTime = time;
    const varyings = 'varying vec2 vWaterPosition; varying vec3 vWaterTangent; varying vec3 vWaterBitangent;\n';
    shader.vertexShader = varyings + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      vWaterPosition = position.xy;
      vWaterTangent = normalize(normalMatrix * vec3(1., 0., 0.));
      vWaterBitangent = normalize(normalMatrix * vec3(0., 1., 0.));`);
    shader.fragmentShader = varyings + 'uniform float uGardenTime;\n' + shader.fragmentShader;
    // Two crossing wave slopes move reflections without another mesh or render pass.
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      float waveA = sin(dot(vWaterPosition, vec2(5.2, 3.6)) - uGardenTime * .85) * .055;
      float waveB = cos(dot(vWaterPosition, vec2(-3.1, 6.4)) - uGardenTime * .62) * .035;
      normal = normalize(normal + vWaterTangent * waveA + vWaterBitangent * waveB);`);
  };
  water.material.customProgramCacheKey = () => 'brisa-water-crossing-waves-v1';
  for (let i = 0; i < 8; i++) {
    const step = mesh(new THREE.CylinderGeometry(.42,.47,.12,24), stone);
    step.scale.set(1.2,1,.7); step.position.set(-.5 + Math.sin(i*.7)*.36,.33,3.4 - i*.74); step.rotation.y = i*.18;
  }
  const portal = new THREE.Group(); portal.position.set(.2,3.27,-.75); root.add(portal);
  const ring = mesh(new THREE.TorusGeometry(3.05,.095,14,160), brass,portal);
  ring.scale.x = .86;
  const innerRing = mesh(new THREE.TorusGeometry(2.92,.012,5,160), new THREE.MeshBasicMaterial({ color:'#ddd2a1' }),portal);
  innerRing.scale.x = .86;
  for (const x of [-2.38,2.78]) {
    const foot = mesh(new THREE.CylinderGeometry(.19,.28,1.2,20),brass); foot.position.set(x,.7,-.75);
  }

  // Dense planted perimeter leaves the path and portal readable from the first camera.
  for (let i = 0; i < (compact ? 11 : 17); i++) {
    const angle = i / 17 * Math.PI * 2;
    const radius = 3.3 + random() * 1.6;
    const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius * .72;
    if (z > 1.8 && Math.abs(x) < 1.5) continue;
    tropical(x,z,1.1 + random() * 1.25,.35 + random()*.6,7 + Math.floor(random()*4));
    fern(x + .4,z+.2,.7 + random()*.5);
  }
  tropical(2.6,-1.65,3,.6,10);
  tropical(-2.4,-2.3,2.9,.6,8);
  fern(-1.2,2.6,1.8); fern(3.5,2,1.3); fern(-4,-.7,1.45);

  // Secondary balcony composition sits to one side, reached by the camera arc.
  const terrace = mesh(new THREE.CylinderGeometry(3.3,3.3,.2,64),stone); terrace.position.set(9,.04,-1.7);
  const pots = [[8.1,-1.5,1.05],[10.25,-2.1,.8],[9.2,.1,.6]];
  pots.forEach(([x,z,size],i) => { const y = pot(x,z,size,.15,i===1?standard('#9d977d'):clay); tropical(x,z,1.7+i*.18,.35,9,y); });
  const rail = mesh(new THREE.TorusGeometry(3.2,.025,6,96,Math.PI*1.3),brass);
  rail.rotation.x=-Math.PI/2; rail.rotation.z=.1;rail.position.set(9,1.4,-1.7);
  for(let i=0;i<9;i++){const a=i/8*Math.PI*1.3;const post=mesh(new THREE.CylinderGeometry(.018,.018,1.3,6),brass);post.position.set(9+Math.cos(a)*3.2,.76,-1.7-Math.sin(a)*3.2);}

  // A small orange heliconia grove is the close-up culmination of the care chapter.
  const petalGeometry=leafGeometry(.2,-.2,false,12,4);
  const petalMaterials=[standard('#e4a051',.45),standard('#cb6a35',.45)];
  const petalMeshes = petalMaterials.map((material, index) => {
    const instances = new THREE.InstancedMesh(petalGeometry, material, index ? 20 : 30);
    instances.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    instances.castShadow = true; instances.receiveShadow = true;
    instances.frustumCulled = false; root.add(instances); return instances;
  });
  for (let i = 0; i < 10; i++) {
    const x = 1.8 + random()*1.2, z = .5 + random()*.9, height = 1.4 + random()*1.4;
    plantAt(x, .3, z);
    cylinderBetween(new THREE.Vector3(x,.3,z),new THREE.Vector3(x,height,z),.017,trunk,root);
    const flower = new THREE.Group();flower.position.set(x,height,z);flower.rotation.y=random()*6.3;root.add(flower);
    for(let j=0;j<5;j++) {
      const petal = new THREE.Object3D(); flower.add(petal);
      petal.position.y=j*.11;petal.rotation.z=(j%2?1:-1)*.9;petal.rotation.y=j*2.6;petal.scale.set(.8,.5,.6);
    }
    flowerGroups.push({ flower, plant: plantIndex, rest: flower.position.clone(), azimuth: flower.rotation.y });
  }

  function plantAttributes(geometry, records) {
    const rotations = new Float32Array(records.length * 4);
    for (let i = 0; i < records.length; i++) rotations[i * 4 + 3] = 1;
    const attribute = new THREE.InstancedBufferAttribute(rotations, 4).setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('aPlantRotation', attribute);
    bendBuffers.push({ attribute, indices: records.map(record => record.plant) });
    geometry.setAttribute('aPlantRoot', new THREE.InstancedBufferAttribute(new Float32Array(records.flatMap(record => plantRoots[record.plant].toArray())), 3));
  }
  function pack(records,geometry) {
    plantAttributes(geometry, records);
    const instances=new THREE.InstancedMesh(geometry,leafMat,records.length);
    records.forEach((record,i)=>{instances.setMatrixAt(i,record.matrix);instances.setColorAt(i,record.color);});
    instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;
    instances.castShadow=true;instances.receiveShadow=true;instances.customDepthMaterial=leafDepth;root.add(instances);return instances;
  }
  const stems=new THREE.InstancedMesh(new THREE.CylinderGeometry(.55,1,1,7),trunk,stemMatrices.length);
  plantAttributes(stems.geometry, stemMatrices);
  stemMatrices.forEach((record,index)=>stems.setMatrixAt(index,record.matrix));stems.customDepthMaterial=stemDepth;stems.castShadow=true;stems.receiveShadow=true;root.add(stems);
  pack(leaves,leafGeometry(.38,.28,true));pack(narrow,leafGeometry(.25,.16,false,6,2));
  const ground=mesh(new THREE.PlaneGeometry(180,180),standard('#07110c',.88));ground.rotation.x=-Math.PI/2;ground.position.y=-.45;
  ground.castShadow=false;

  const motePositions=[];
  for(let i=0;i<(compact?70:130);i++)motePositions.push((random()-.5)*27,random()*8,random()*15-8);
  const moteGeometry=new THREE.BufferGeometry();moteGeometry.setAttribute('position',new THREE.Float32BufferAttribute(motePositions,3));
  const motes=new THREE.Points(moteGeometry,new THREE.PointsMaterial({color:'#d4ce93',size:.025,transparent:true,opacity:.55,depthWrite:false}));
  root.add(motes);
  const dustBase=motes.rotation.y;
  const wind = createWindField(plantRoots);
  const rotation = new THREE.Quaternion(), offset = new THREE.Vector3();
  const baseRotation = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  function applyPlantBends() {
    let changed = false;
    const rotations = wind.plants.map((plant, index) => {
      // Nearby plants share a travelling breeze. Gesture energy stays in the
      // separate spring field and remains much larger than this ambient motion.
      const phase = plant.root.x * .22 + plant.root.z * .16;
      const x = plant.x + Math.sin(time.value * .48 + phase) * .026 + Math.sin(time.value * .21 + phase * .6) * .008;
      const z = plant.z + Math.cos(time.value * .36 - phase) * .018;
      const previous = lastBends[index];
      if (!previous || previous.x !== x || previous.z !== z) changed = true;
      lastBends[index] = { x, z };
      const angle = Math.hypot(x, z), factor = angle ? Math.sin(angle / 2) / angle : 0;
      return [z * factor, 0, -x * factor, Math.cos(angle / 2)];
    });
    if (changed) for (const { attribute, indices } of bendBuffers) {
      for (let i = 0; i < indices.length; i++) attribute.array.set(rotations[indices[i]], i * 4);
      attribute.needsUpdate = true;
    }
    for (const record of flowerGroups) {
      const plant = wind.plants[record.plant];
      rotation.fromArray(rotations[record.plant]);
      record.flower.position.copy(offset.copy(record.rest).sub(plant.root).applyQuaternion(rotation).add(plant.root));
      baseRotation.setFromAxisAngle(up, record.azimuth);
      record.flower.quaternion.copy(rotation).multiply(baseRotation);
    }
  }
  return {
    root,
    animate(seconds, intensity, bloom, delta = 0) {
      time.value=seconds;breeze.value=.045+intensity*.06;
      motes.rotation.y=dustBase+seconds*.006;
      wind.step(delta); applyPlantBends();
      for (const [index, record] of flowerGroups.entries()) {
        record.flower.scale.setScalar(.9 + bloom * .1);
        record.flower.children.forEach((petal, j) => {
          const phase = Math.min(1, Math.max(0, (bloom - j * .035 - (index % 3) * .018) / .8));
          const open = phase * phase * (3 - 2 * phase);
          petal.rotation.z = (j % 2 ? 1 : -1) * (.09 + open * .93);
          petal.scale.set(.35 + open * .45, .5, .3 + open * .3);
        });
      }
      const petalCounts = [0, 0];
      for (const record of flowerGroups) {
        record.flower.updateMatrixWorld(true);
        record.flower.children.forEach((petal, j) => {
          petalMeshes[j % 2].setMatrixAt(petalCounts[j % 2]++, petal.matrixWorld);
        });
      }
      for (const instances of petalMeshes) instances.instanceMatrix.needsUpdate = true;
    },
    setLightQuality() {
      const replacements = new Map();
      root.traverse(object => {
        if (!object.material) return;
        const convert = material => {
          if (!material.isMeshStandardMaterial || (material !== leafMat && material.metalness > 0)) return material;
          if (!replacements.has(material)) {
            const diffuse = new THREE.MeshLambertMaterial({ color: material.color, map: material.map, side: material.side });
            diffuse.onBeforeCompile = material.onBeforeCompile;
            diffuse.customProgramCacheKey = material.customProgramCacheKey;
            replacements.set(material, diffuse);
          }
          return replacements.get(material);
        };
        object.material = Array.isArray(object.material) ? object.material.map(convert) : convert(object.material);
      });
      replacements.forEach((replacement, original) => original.dispose());
    },
    gust(point, direction, strength) { wind.gust(point, direction, strength); },
    calm() { wind.calm(); },
    clearWind() { wind.clear(); applyPlantBends(); },
    get windEnergy() { return wind.energy; },
    dispose() {
      const geometries=new Set(),materials=new Set();
      root.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material){for(const material of [].concat(object.material))materials.add(material);}});
      geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());textures.forEach(texture=>texture.dispose());leafDepth.dispose();stemDepth.dispose();scene.remove(root);
    }
  };
}
