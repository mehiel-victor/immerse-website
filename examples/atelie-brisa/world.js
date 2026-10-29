/** Progressive 3D layer. The surrounding document remains the content and navigation. */
export async function createWorld(container, { onReady = () => {}, onFallback = () => {}, onFrame = () => {}, initial = {} } = {}) {
  let renderer, garden, observer, visibilityObserver, scene, environment, disposed = false, frame = 0;
  const lifetime = new AbortController();
  const target = { progress: 0, orbit: 0, pointerX: 0, pointerY: 0, light: 0, bloom: 1, paused: false, reduced: false, visible: true, exploring: false };
  for(const key of ['progress','orbit','pointerX','pointerY','light','bloom'])if(Number.isFinite(initial[key]))target[key]=initial[key];
  target.orbit=Math.min(Math.PI,Math.max(-Math.PI,target.orbit));target.progress=Math.min(3,Math.max(0,target.progress));target.light=Math.min(1,Math.max(0,target.light));target.bloom=Math.min(1,Math.max(0,target.bloom));
  for(const key of ['paused','reduced','visible','exploring'])if(typeof initial[key]==='boolean')target[key]=initial[key];
  if(target.reduced)target.pointerX=target.pointerY=0;
  const current = { progress:target.progress, orbit:target.orbit, pointerX:target.pointerX, pointerY:target.pointerY, light:target.light, bloom:target.bloom };
  const noop = { update() {}, resize() {}, dispose() {}, gust() {}, calm() {} };
  try {
    const [THREE, { buildGarden }] = await Promise.all([import('./assets/vendor/three.module.min.js'), import('./world-model.js?v=20261028-scroll1')]);
    if (!container.isConnected) return noop;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true'); canvas.setAttribute('role', 'presentation');
    canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
    container.append(canvas);
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b1712');
    scene.fog = new THREE.FogExp2('#0b1712', .027);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 160);
    let width = 1, height = 1, compact = window.innerWidth < 700;
    const eye = new THREE.Vector3(), focus = new THREE.Vector3();
    const anchorPoints = [
      {id:'jardim', point:new THREE.Vector3(.2,3.8,-.75)},
      {id:'varanda', point:new THREE.Vector3(9.1,3,-1.4)},
      {id:'cuidado', point:new THREE.Vector3(2.3,2.5,.9)}
    ];
    const projected = new THREE.Vector3();
    const axisY = new THREE.Vector3(0,1,0);
    const ray = new THREE.Raycaster(), inputPoint = new THREE.Vector2();
    const hitPlane = new THREE.Plane(), hit = new THREE.Vector3();
    const cameraNormal = new THREE.Vector3(), cameraRight = new THREE.Vector3(), cameraForward = new THREE.Vector3(), gustDirection = new THREE.Vector3();
    let lastGust = -Infinity;
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(10.7, 6.2, 15.5), new THREE.Vector3(4.8, 3.5, 7.2),
      new THREE.Vector3(14.8, 4.2, 7.8), new THREE.Vector3(3.6, 5.8, 4.5)
    ], false, 'catmullrom', .2);
    const focusPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(.3, 2.4, -.1), new THREE.Vector3(.2, 2.5, -.8),
      new THREE.Vector3(9.1, 2, -1.4), new THREE.Vector3(2.4, 2, 1)
    ], false, 'catmullrom', .2);
    const day = new THREE.Color('#eee0b7'), dusk = new THREE.Color('#ef9961');
    const backgroundDay = new THREE.Color('#0c1c16'), backgroundDusk = new THREE.Color('#1f1914');
    const sky = new THREE.HemisphereLight('#d0ddbd', '#25382c', 1.8);scene.add(sky);
    const sun = new THREE.DirectionalLight(day, 4.2);sun.position.set(-5,13,7);sun.castShadow=true;
    sun.shadow.mapSize.set(1024,1024);
    Object.assign(sun.shadow.camera,{left:-14,right:14,top:10,bottom:-10,near:1,far:40});
    sun.shadow.normalBias=.045;sun.shadow.bias=-.0001;scene.add(sun);
    const rim = new THREE.DirectionalLight('#d4d7a6',3.1);rim.position.set(2,7,-8);scene.add(rim);
    const fill = new THREE.PointLight('#f1ba77',40,15,2);fill.position.set(0,4,-3);scene.add(fill);
    const envCanvas=document.createElement('canvas');envCanvas.width=256;envCanvas.height=128;
    const ctx=envCanvas.getContext('2d');const gradient=ctx.createLinearGradient(0,0,0,128);
    gradient.addColorStop(0,'#77967a');gradient.addColorStop(.38,'#bcc5a3');gradient.addColorStop(.48,'#d0ca9a');gradient.addColorStop(.53,'#354130');gradient.addColorStop(1,'#081b12');
    ctx.fillStyle=gradient;ctx.fillRect(0,0,256,128);ctx.fillStyle='#f6edcf';ctx.fillRect(52,25,22,27);
    const envTexture=new THREE.CanvasTexture(envCanvas);envTexture.mapping=THREE.EquirectangularReflectionMapping;envTexture.colorSpace=THREE.SRGBColorSpace;
    const generator=new THREE.PMREMGenerator(renderer);environment=generator.fromEquirectangular(envTexture);envTexture.dispose();generator.dispose();
    scene.environment=environment.texture;scene.environmentIntensity=.7;
    garden=buildGarden(scene,compact);
    let last=0,elapsed=0,slowTime=0,slowSamples=0,renderCount=0,adaptivePixelRatio=Math.min(window.devicePixelRatio||1,compact?1.25:1.5);
    let inViewport=true, currentFraming;

    function resize() {
      if(disposed)return;
      const bounds=container.getBoundingClientRect();width=Math.max(1,bounds.width);height=Math.max(1,bounds.height);compact=width<700;
      renderer.setPixelRatio(Math.min(adaptivePixelRatio,compact?1.25:1.5));renderer.setSize(width,height,false);
      camera.aspect=width/height;
      // A real camera offset preserves a quiet text region while keeping the world spatial.
      camera.setViewOffset(width,height,compact?0:-width*.19,compact?-height*.12:0,width,height);
      camera.updateProjectionMatrix();schedule();
    }
    function canRun(){return !disposed&&!document.hidden&&inViewport&&target.visible;}
    function schedule(){if(!frame&&canRun())frame=requestAnimationFrame(render);}
    function render(now) {
      frame=0;if(!canRun())return;
      const rawDelta=last?(now-last)/1000:1/60;last=now;
      const dt=Math.min(rawDelta,.25);
      const blend=target.reduced||target.paused?1:1-Math.exp(-dt*5.5);
      let moving=false;
      for(const key of ['progress','orbit','pointerX','pointerY','light','bloom']) {
        current[key]+=(target[key]-current[key])*blend;
        if(Math.abs(target[key]-current[key])>.0008)moving=true;
      }
      if(!target.paused&&!target.reduced)elapsed+=dt;
      cameraPath.getPoint(THREE.MathUtils.clamp(current.progress/3,0,1),eye);
      focusPath.getPoint(THREE.MathUtils.clamp(current.progress/3,0,1),focus);
      eye.sub(focus).applyAxisAngle(axisY,current.orbit).add(focus);
      if(compact){eye.sub(focus).multiplyScalar(1.22);eye.add(focus);camera.fov=48;}else{camera.fov=38;}
      eye.x+=target.reduced?0:current.pointerX*.65;
      eye.y+=target.reduced?0:-current.pointerY*.35;
      const segment=Math.min(2,Math.floor(current.progress));
      const local=current.progress-segment;
      const eased=local*local*(3-2*local);
      const offsets=[-.19,.15,-.19,.15];
      const framing=THREE.MathUtils.lerp(offsets[segment],offsets[segment+1],eased);
      const desiredFraming=compact||target.exploring?0:framing;
      if(currentFraming===undefined||target.reduced||target.paused)currentFraming=desiredFraming;
      else currentFraming+=(desiredFraming-currentFraming)*blend;
      if(Math.abs(desiredFraming-currentFraming)>.0008)moving=true;
      camera.setViewOffset(width,height,width*currentFraming,compact?-height*.12:0,width,height);
      camera.position.copy(eye);camera.lookAt(focus);camera.updateProjectionMatrix();
      sun.color.copy(day).lerp(dusk,current.light);sun.intensity=4.2-current.light*1.6;
      sky.intensity=1.8-current.light*.9;fill.intensity=40+current.light*55;
      scene.background.copy(backgroundDay).lerp(backgroundDusk,current.light);scene.fog.color.copy(scene.background);
      const ambientTime=target.reduced?0:elapsed;
      garden.animate(ambientTime,Math.abs(current.pointerX),current.bloom,target.paused||target.reduced?0:dt);
      container.dataset.ambientTime=ambientTime.toFixed(3);
      container.dataset.ambientState=target.reduced?'still':target.paused?'paused':'flowing';
      container.dataset.gustEnergy=garden.windEnergy.toFixed(5);
      container.dataset.gustState=target.paused?'paused':target.reduced?'idle':garden.windEnergy>.0001?(elapsed-lastGust<.18?'active':'settling'):'idle';
      renderer.render(scene,camera);
      const anchors = anchorPoints.map(({id,point}) => {
        projected.copy(point).project(camera);
        const x=(projected.x+1)/2, y=(1-projected.y)/2;
        return {id,x,y,visible:projected.z<1&&projected.z>-1&&x>.04&&x<.96&&y>.08&&y<.91};
      });
      onFrame({anchors,progress:current.progress});
      container.dataset.frames=String(++renderCount);
      container.dataset.motion=target.reduced?'static':target.paused?'paused':'moving';
      container.dataset.triangles=String(renderer.info.render.triangles);
      container.dataset.drawCalls=String(renderer.info.render.calls);
      container.dataset.geometries=String(renderer.info.memory.geometries);
      container.dataset.textures=String(renderer.info.memory.textures);
      // Judge actual wall time; simulation substeps deliberately cap long interruptions.
      if (!target.paused && !target.reduced && renderCount > 2 && rawDelta > .04) {
        slowTime += Math.min(rawDelta, .5); slowSamples++;
      } else { slowTime = Math.max(0, slowTime - rawDelta * 2); slowSamples = 0; }
      if (slowSamples >= 3 && slowTime >= .7 && container.dataset.quality !== 'light') {
        // Keep geometry, roots, textures and metallic architecture. Remove expensive
        // diffuse IBL and shadow passes together so adaptation does not take many seconds.
        adaptivePixelRatio = .8; renderer.setPixelRatio(adaptivePixelRatio); renderer.setSize(width,height,false);
        renderer.shadowMap.enabled = false; sun.castShadow = false;
        sun.shadow.map?.dispose(); sun.shadow.map = null;
        garden.setLightQuality();
        scene.traverse(object => { if(object.material) for(const material of [].concat(object.material)) material.needsUpdate = true; });
        container.dataset.quality = 'light'; slowTime = 0; slowSamples = 0;
      }
      if(moving||(!target.paused&&!target.reduced))schedule();
    }
    function update(values={}) {
      if(disposed)return;
      const wasPaused=target.paused, wasReduced=target.reduced;
      for(const key of ['progress','orbit','pointerX','pointerY','light','bloom'])if(Number.isFinite(values[key]))target[key]=values[key];
      target.orbit=THREE.MathUtils.clamp(target.orbit,-Math.PI,Math.PI);target.progress=THREE.MathUtils.clamp(target.progress,0,3);target.light=THREE.MathUtils.clamp(target.light,0,1);target.bloom=THREE.MathUtils.clamp(target.bloom,0,1);
      for(const key of ['paused','reduced','visible','exploring'])if(typeof values[key]==='boolean')target[key]=values[key];
      if(target.reduced){elapsed=0;target.pointerX=target.pointerY=0;for(const key of Object.keys(current))current[key]=target[key];garden.clearWind();}
      if(wasPaused!==target.paused||wasReduced!==target.reduced)last=0;
      if(!target.visible){cancelAnimationFrame(frame);frame=0;last=0;}else schedule();
    }
    function gust(values = {}) {
      if (disposed || target.paused || target.reduced || !canRun()) return;
      if (!['x','y','dx','dy','strength'].every(key => Number.isFinite(values[key]))) return;
      inputPoint.set(THREE.MathUtils.clamp(values.x,-1,1),THREE.MathUtils.clamp(values.y,-1,1));
      camera.getWorldDirection(cameraNormal); hitPlane.setFromNormalAndCoplanarPoint(cameraNormal,focus);
      ray.setFromCamera(inputPoint,camera);
      if (!ray.ray.intersectPlane(hitPlane,hit)) return;
      hit.x=THREE.MathUtils.clamp(hit.x,-6.5,12.5);hit.z=THREE.MathUtils.clamp(hit.z,-6,5);
      cameraRight.setFromMatrixColumn(camera.matrixWorld,0);cameraRight.y=0;cameraRight.normalize();
      cameraForward.copy(cameraNormal);cameraForward.y=0;cameraForward.normalize();
      gustDirection.copy(cameraRight).multiplyScalar(THREE.MathUtils.clamp(values.dx,-1,1)).addScaledVector(cameraForward,THREE.MathUtils.clamp(values.dy,-1,1));
      if(gustDirection.lengthSq()<.00001)return;
      garden.gust(hit,gustDirection.normalize(),THREE.MathUtils.clamp(values.strength,0,1));
      lastGust=elapsed; schedule();
    }
    function calm() { if(disposed)return;garden.calm();lastGust=-Infinity;schedule(); }
    function dispose() {
      if(disposed)return;disposed=true;cancelAnimationFrame(frame);frame=0;lifetime.abort();observer?.disconnect();visibilityObserver?.disconnect();garden.dispose();environment.dispose();renderer.dispose();canvas.remove();
    }
    visibilityObserver=new IntersectionObserver(entries=>{inViewport=entries[0].isIntersecting;if(inViewport){last=0;schedule();}else{cancelAnimationFrame(frame);frame=0;}},{threshold:0});
    visibilityObserver.observe(container);
    observer=new ResizeObserver(resize);observer.observe(container);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;}else schedule();},{signal:lifetime.signal});
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();container.dataset.renderer='fallback';onFallback('context-lost');dispose();},{signal:lifetime.signal});
    container.dataset.quality='full';resize();cancelAnimationFrame(frame);frame=0;render(performance.now());container.dataset.renderer='webgl';onReady();
    return {update,resize,dispose,gust,calm};
  } catch(error) {
    disposed=true;cancelAnimationFrame(frame);lifetime.abort();observer?.disconnect();visibilityObserver?.disconnect();garden?.dispose();environment?.dispose();renderer?.dispose();renderer?.domElement.remove();
    container.dataset.renderer='fallback';onFallback(error instanceof Error?error.message:'WebGL unavailable');return noop;
  }
}
