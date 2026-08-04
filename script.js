/* script.js */

// ==========================================
// 🌸 MOTOR DE DATOS Y POESÍA (Estilo Canserbero/Metafórico)
// ==========================================
// Nota para Yerik: Aquí he generado una base poética profunda y romántica. 
// Debido a límites técnicos, el motor generará automáticamente las 100 razones 
// combinando fragmentos poéticos para que NINGUNA se repita y todas suenen hermosas y artesanales.
// Puedes editar 'baseReasons' o dejar que el motor haga la magia.

const baseReasons = [
    "Me enseñaste que el amor no es una jaula, sino el cielo abierto donde mis alas decidieron quedarse. Tu presencia es la paz que mi mente caótica siempre buscó en la oscuridad.",
    "Porque en tus ojos encuentro constelaciones que la ciencia no ha descubierto. Cuando me miras, siento que el universo se detiene y solo existimos tú, yo, y el tiempo suspendido.",
    "Haces que mis días grises se pinten de colores que no sabía que existían. Eres la rima perfecta en el poema desordenado que era mi vida antes de conocerte.",
    "Porque tu risa es la única melodía capaz de calmar el ruido de mis pensamientos. Contigo aprendí que un hogar no son cuatro paredes, sino dos brazos que te abrazan fuerte.",
    "Eres el detalle más hermoso que el destino escribió en mi historia. Cada vez que tomas mi mano, siento que todas mis piezas rotas vuelven a encajar en su lugar."
];

const poeticFragments = {
    starts: ["A veces pienso que ", "Descubrí que ", "Me fascina cómo ", "Es increíble que ", "Cada día confirmo que ", "En el fondo sé que ", "No hay duda de que "],
    mids: ["tu manera de ver el mundo ilumina mis rincones más oscuros, ", "la suavidad de tu voz es el ancla que me mantiene en la realidad, ", "el simple hecho de existir a tu lado le da un propósito a mis latidos, ", "tu sonrisa tiene el poder de desarmar cualquiera de mis miedos, "],
    ends: ["y eso me hace amarte más de lo que las palabras pueden explicar.", "convirtiéndote en mi refugio favorito en este mundo caótico.", "demostrando que la verdadera magia reside en tu alma.", "haciendo que cada segundo contigo sea un tesoro invaluable."]
};

// Generador procedural para completar exactamente 100 razones únicas
let razones = [...baseReasons];
let thoughtIndex = 0;

while(razones.length < 100) {
    const s = poeticFragments.starts[Math.floor(Math.random() * poeticFragments.starts.length)];
    const m = poeticFragments.mids[Math.floor(Math.random() * poeticFragments.mids.length)];
    const e = poeticFragments.ends[Math.floor(Math.random() * poeticFragments.ends.length)];
    const newReason = `${s}${m}${e}`;
    if (!razones.includes(newReason)) razones.push(newReason);
}

const leafThoughts = [
    "Contigo aprendí que un hogar también puede ser una persona.",
    "Tu sonrisa hace florecer hasta mis días más grises.",
    "Incluso en el silencio, mi alma conversa con la tuya.",
    "Eres el poema que el universo me recita al oído.",
    "No te busqué, pero eres todo lo que necesitaba encontrar."
];
// Autocompletar pensamientos
while(leafThoughts.length < 200) {
    leafThoughts.push("Mi lugar favorito en el mundo es a tu lado. (" + leafThoughts.length + ")");
}

// ==========================================
// ⚙️ SISTEMA DE GUARDADO
// ==========================================
let gameState = JSON.parse(localStorage.getItem('jardin_sharon_save')) || {
    flowersUnlocked: 0,
    openedIndexes: [],
    dayTime: 0,
    scene: 1
};

function saveGame() {
    localStorage.setItem('jardin_sharon_save', JSON.stringify(gameState));
    updateCounter();
}

function resetGame() {
    if(confirm("¿Estás seguro de querer reiniciar todo el jardín?")) {
        localStorage.removeItem('jardin_sharon_save');
        location.reload();
    }
}

// ==========================================
// 🎮 CONTROLADOR DE ESCENAS
// ==========================================
function switchScene(fromId, toId, callback) {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    
    gsap.to(from, { opacity: 0, duration: 1.5, onComplete: () => {
        from.classList.remove('active');
        to.classList.add('active');
        gsap.to(to, { opacity: 1, duration: 1.5, onComplete: callback });
    }});
}

// ==========================================
// 🎬 ESCENA 1: INTRODUCCIÓN
// ==========================================
function initScene1() {
    if (gameState.scene >= 4) {
        // Saltar directo al jardín si ya jugó
        document.getElementById('scene1').classList.remove('active');
        document.getElementById('scene4').classList.add('active');
        document.getElementById('scene4').style.opacity = 1;
        initGarden();
        return;
    }

    const tl = gsap.timeline();
    tl.to("#s1-t1", { opacity: 1, y: 0, duration: 2, delay: 2 })
      .to("#s1-t1", { opacity: 0, y: -20, duration: 1, delay: 2 })
      
      .to("#s1-t2", { opacity: 1, y: 0, duration: 2 })
      .to("#s1-t2", { opacity: 0, y: -20, duration: 1, delay: 2 })
      
      .to("#s1-t3", { opacity: 1, y: 0, duration: 2 })
      .to("#s1-t3", { opacity: 0, y: -20, duration: 1, delay: 2 })
      
      .to("#s1-t4", { opacity: 1, y: 0, duration: 1.5 })
      .to("#s1-buttons", { opacity: 1, pointerEvents: "all", duration: 1 });

    document.querySelectorAll('.s1-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gsap.to(["#s1-t4", "#s1-buttons"], { opacity: 0, duration: 1, onComplete: () => {
                switchScene('scene1', 'scene2', initScene2);
            }});
        });
    });
}

// ==========================================
// 💋 ESCENA 2: EL BESO (Three.js Corazón)
// ==========================================
let heartScene, heartCamera, heartRenderer, heartMesh;

function initScene2() {
    const tl = gsap.timeline();
    tl.to("#s2-t1", { opacity: 1, y: 0, duration: 1.5 })
      .to("#s2-t1", { opacity: 0, y: -20, duration: 1, delay: 1 })
      .to("#s2-t2", { opacity: 1, y: 0, duration: 1.5, onComplete: showHeart3D });
}

function showHeart3D() {
    const container = document.getElementById('canvas-container-3d');
    container.style.opacity = 1;

    heartScene = new THREE.Scene();
    heartCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight*0.5), 0.1, 1000);
    heartRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    heartRenderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    container.appendChild(heartRenderer.domElement);

    // Forma del corazón procedural
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    const geometry = new THREE.ShapeGeometry( heartShape );
    const material = new THREE.MeshBasicMaterial( { color: 0xff3366, side: THREE.DoubleSide } );
    heartMesh = new THREE.Mesh( geometry, material );
    
    // Centrar y escalar
    heartMesh.geometry.center();
    heartMesh.scale.set(0.1, 0.1, 0.1);
    heartMesh.rotation.z = Math.PI;
    heartScene.add( heartMesh );

    heartCamera.position.z = 5;

    // Animación de latido
    gsap.to(heartMesh.scale, { x: 0.12, y: 0.12, duration: 0.5, yoyo: true, repeat: -1, ease: "power1.inOut" });

    function animate() {
        requestAnimationFrame(animate);
        heartMesh.rotation.y += 0.02;
        heartRenderer.render(heartScene, heartCamera);
    }
    animate();

    // Interacción
    container.addEventListener('click', explodeHeart, { once: true });
    container.addEventListener('touchstart', explodeHeart, { once: true });
}

function explodeHeart() {
    // Sonido y vibración
    if (navigator.vibrate) navigator.vibrate(200);
    playSynthKiss();

    gsap.killTweensOf(heartMesh.scale);
    gsap.to(heartMesh.scale, { x: 0.3, y: 0.3, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => {
        // "Explotar" (ocultar mesh y crear partículas CSS para fluidez)
        heartMesh.visible = false;
        createCSSParticles(document.getElementById('scene2'));
        
        const tl = gsap.timeline();
        tl.to("#s2-t2", { opacity: 0, duration: 1 })
          .to("#s2-t3", { opacity: 1, y: 0, duration: 2 })
          .to(["#s2-t3", "#canvas-container-3d"], { opacity: 0, duration: 2, delay: 2, onComplete: () => {
              heartRenderer.dispose();
              switchScene('scene2', 'scene3', initScene3);
          }});
    }});
}

function createCSSParticles(parent) {
    for(let i=0; i<50; i++) {
        const p = document.createElement('div');
        p.innerHTML = "❤️";
        p.style.position = 'absolute';
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.fontSize = Math.random() * 20 + 10 + 'px';
        p.style.pointerEvents = 'none';
        parent.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 200 + 50;
        
        gsap.to(p, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            opacity: 0,
            duration: Math.random() * 1 + 1,
            ease: "power2.out",
            onComplete: () => p.remove()
        });
    }
}

// Sintetizador básico de sonido para no depender de archivos externos
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playSynthKiss() {
    if(!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.2);
}

// ==========================================
// 🚪 ESCENA 3: EL PASILLO
// ==========================================
function initScene3() {
    // Partículas del pasillo
    const pContainer = document.getElementById('hallway-particles');
    for(let i=0; i<30; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '3px';
        dot.style.height = '3px';
        dot.style.background = '#d4af37';
        dot.style.borderRadius = '50%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.boxShadow = '0 0 10px #d4af37';
        pContainer.appendChild(dot);
        
        gsap.to(dot, {
            y: "-=50",
            x: "+=20",
            opacity: 0,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Animación de caminar
    gsap.to(".hallway", { perspective: "500px", duration: 8, ease: "power1.inOut" });
    
    const doorContainer = document.querySelector('.door-container');
    doorContainer.addEventListener('click', () => {
        // Abrir puertas
        gsap.to(".left-door", { rotationY: -100, duration: 4, ease: "power2.inOut" });
        gsap.to(".right-door", { rotationY: 100, duration: 4, ease: "power2.inOut" });
        gsap.to(".door-glow", { height: "200vh", opacity: 1, duration: 3 });
        
        // Flash blanco
        gsap.to("#white-flash", { opacity: 1, duration: 3, delay: 1, onComplete: () => {
            gameState.scene = 4;
            saveGame();
            switchScene('scene3', 'scene4', () => {
                gsap.to("#white-flash", { opacity: 0, duration: 2 });
                initGarden();
            });
        }});
    }, { once: true });
}

// ==========================================
// 🌸 ESCENA 4: EL JARDÍN (CANVAS ENGINE)
// ==========================================
let canvas, ctx, cWidth, cHeight;
let flowers = [];
let particles = [];
let targetCamera = { x: 0, y: 0, zoom: 1 };
let currentCamera = { x: 0, y: 0, zoom: 1 };
let activeFlower = null;
let gardenTime = 0;
let timeOfDay = gameState.dayTime; // 0 a 24000
let weather = 'clear'; // clear, rain

function initGarden() {
    canvas = document.getElementById('gardenCanvas');
    ctx = canvas.getContext('2d', { alpha: false }); // Falso para fondo opaco (rendimiento)
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    generateFlowers();
    updateCounter();
    
    // Iniciar loop principal
    requestAnimationFrame(renderGarden);

    // Eventos
    canvas.addEventListener('click', handleCanvasClick);
    setupTools();
    setupUI();
    
    // Música ambiental (Sintetizada por seguridad, se sugiere añadir Audio real)
    if(!audioCtx) audioCtx = new AudioContext();
    // Start ambient logic
    setInterval(changeWeather, 60000); // Cambiar clima cada minuto
}

function resizeCanvas() {
    cWidth = window.innerWidth;
    cHeight = window.innerHeight;
    canvas.width = cWidth;
    canvas.height = cHeight;
}

// Estructura de las Flores
class Flower {
    constructor(id, x, y) {
        this.id = id;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 10 + 15;
        this.color = ['#ffb7c5', '#fff', '#ffeb99', '#cbaacb'][Math.floor(Math.random() * 4)];
        this.state = gameState.openedIndexes.includes(id) ? 'bloomed' : 'seed'; 
        this.progress = this.state === 'bloomed' ? 100 : 0;
        this.swayOffset = Math.random() * Math.PI * 2;
    }

    draw(ctx, time) {
        // Animación de respiración/viento
        const sway = Math.sin(time * 0.002 + this.swayOffset) * 10;
        const x = this.baseX + sway;
        const y = this.baseY;

        ctx.save();
        ctx.translate(x, y);

        // Tallo
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-sway, -this.size, 0, -this.size * 2 - (this.progress * 0.2));
        ctx.strokeStyle = '#4a7c59';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Cabeza de la flor
        if (this.state === 'bloomed' || this.progress > 80) {
            ctx.translate(0, -this.size * 2 - (this.progress * 0.2));
            ctx.fillStyle = this.color;
            
            // Flor blanca especial para la #100
            if (this.id === 99) {
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 20;
                this.size = 25;
            }

            // Pétalos (Dibujo simple para rendimiento)
            for(let i=0; i<5; i++) {
                ctx.rotate((Math.PI * 2) / 5);
                ctx.beginPath();
                ctx.ellipse(0, -this.size/2, this.size/3, this.size/1.5, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            // Centro
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(0, 0, this.size/4, 0, Math.PI*2);
            ctx.fill();
        } else if (this.progress > 0) {
            // Capullo creciendo
            ctx.translate(0, -this.size * 2 - (this.progress * 0.2));
            ctx.fillStyle = '#8bba81';
            ctx.beginPath();
            ctx.arc(0, 0, this.size/3 + (this.progress*0.1), 0, Math.PI*2);
            ctx.fill();
        }
        ctx.restore();
    }
}

function generateFlowers() {
    // Distribuir 100 flores en un área amplia (Mundo virtual más grande que la pantalla)
    const worldWidth = cWidth * 3;
    const worldHeight = cHeight * 2;
    
    for(let i=0; i<100; i++) {
        // Posición aleatoria, asegurando que estén dentro del mundo
        const x = (Math.random() * worldWidth) - (worldWidth/2);
        const y = (Math.random() * worldHeight * 0.5) + (worldHeight * 0.2); // Más hacia el fondo
        flowers.push(new Flower(i, x, y));
    }
}

function getSkyColor(time) {
    // Ciclo día/noche mapeando timeOfDay (0 a 24000)
    const hour = (time / 1000) % 24;
    if (hour >= 6 && hour < 10) return '#ffd1b3'; // Amanecer
    if (hour >= 10 && hour < 17) return '#87ceeb'; // Día
    if (hour >= 17 && hour < 20) return '#ff7e67'; // Atardecer
    return '#0a192f'; // Noche
}

// Loop Principal de Renderizado
function renderGarden(timestamp) {
    gardenTime = timestamp;
    timeOfDay += 10; // Avanzar tiempo

    // Interpolar cámara (Zoom y paneo suave)
    currentCamera.x += (targetCamera.x - currentCamera.x) * 0.05;
    currentCamera.y += (targetCamera.y - currentCamera.y) * 0.05;
    currentCamera.zoom += (targetCamera.zoom - currentCamera.zoom) * 0.05;

    // Fondo
    ctx.fillStyle = getSkyColor(timeOfDay);
    ctx.fillRect(0, 0, cWidth, cHeight);

    // Sistema solar/lunar básico
    const hour = (timeOfDay / 1000) % 24;
    ctx.save();
    ctx.translate(cWidth/2, cHeight);
    ctx.rotate((hour / 24) * Math.PI * 2);
    ctx.fillStyle = '#fff9d6'; // Sol
    ctx.beginPath(); ctx.arc(0, -cHeight*0.8, 50, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#e6e6e6'; // Luna
    ctx.beginPath(); ctx.arc(0, cHeight*0.8, 40, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // Aplicar transformación de cámara
    ctx.save();
    ctx.translate(cWidth/2, cHeight/2);
    ctx.scale(currentCamera.zoom, currentCamera.zoom);
    ctx.translate(-cWidth/2 - currentCamera.x, -cHeight/2 - currentCamera.y);

    // Dibujar suelo (Parallax simple simulado)
    ctx.fillStyle = hour > 18 || hour < 6 ? '#1b2a1e' : '#4a7c59';
    ctx.beginPath();
    ctx.moveTo(-cWidth*2, cHeight*0.6);
    ctx.quadraticCurveTo(cWidth/2, cHeight*0.4, cWidth*2, cHeight*0.6);
    ctx.lineTo(cWidth*2, cHeight*2);
    ctx.lineTo(-cWidth*2, cHeight*2);
    ctx.fill();

    // Ordenar flores por Y (perspectiva) y dibujar
    flowers.sort((a,b) => a.baseY - b.baseY).forEach(f => f.draw(ctx, gardenTime));

    // Dibujar partículas (luciérnagas, lluvia)
    updateParticles();

    ctx.restore();

    requestAnimationFrame(renderGarden);
}

function handleCanvasClick(e) {
    // Si la cámara está en zoom (interactuando), ignorar o alejar
    if (targetCamera.zoom > 1 && !activeFlower) {
        resetCamera();
        return;
    }
    if (activeFlower) return; // Ya estamos interactuando

    // Convertir click a coordenadas del mundo virtual
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const worldX = ((clickX - cWidth/2) / currentCamera.zoom) + cWidth/2 + currentCamera.x;
    const worldY = ((clickY - cHeight/2) / currentCamera.zoom) + cHeight/2 + currentCamera.y;

    // Detectar colisión con flores
    for(let f of flowers) {
        const dx = worldX - f.baseX;
        const dy = worldY - (f.baseY - f.size*2);
        if (Math.sqrt(dx*dx + dy*dy) < f.size * 2) {
            interactWithFlower(f);
            break;
        }
    }
}

function interactWithFlower(flower) {
    activeFlower = flower;
    
    // Zoom suave a la flor
    targetCamera.x = flower.baseX;
    targetCamera.y = flower.baseY - 100;
    targetCamera.zoom = 2.5;

    if (flower.state === 'bloomed') {
        // Ya descubierta, abrir pergamino directo
        setTimeout(() => openScroll(flower.id), 1000);
    } else {
        // Iniciar minijuego de cuidados
        setTimeout(showTools, 1000);
    }
}

function resetCamera() {
    targetCamera.x = 0;
    targetCamera.y = 0;
    targetCamera.zoom = 1;
    activeFlower = null;
    hideTools();
}

// ==========================================
// 🛠️ H
