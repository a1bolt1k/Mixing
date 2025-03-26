import './style.css'

const ClasessPillSlider = [
    'pill-slider--explore',
    'pill-slider--enjoy',
    'pill-slider--study',
    'pill-slider--love',
    'pill-slider--believe',
    'pill-slider--play',    
];

const NamesPillSlider = [
    'explore',
    'enjoy',
    'study',
    'love',
    'believe',
    'play'
];

document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.getElementById('sliderTrack');
    const blockCount = 6; // Количество уникальных блоков
    const duplicates = 7; // Сколько раз дублируем (для бесконечности)
    
    // Создаем блоки (основные + дубли)
    let blocksHTML = '';
    for (let i = 0; i < duplicates; i++) {
        for (let j = 0; j <= blockCount - 1; j++) {
            blocksHTML += `<div class="pill-slider ${ClasessPillSlider[j]}">
                <span class="rotated-text">${NamesPillSlider[j]}</span>
            </div>`;
        }
    }
    
    sliderTrack.innerHTML = blocksHTML;
    
    // Рассчитываем сколько блоков нужно прокручивать
    function updateBlocksToScroll() {
        const viewportWidth = window.innerWidth;
        let blocksToScroll = blockCount;
        
        if (viewportWidth >= 1200) {
            blocksToScroll = blockCount * 2;
        } else if (viewportWidth >= 768) {
            blocksToScroll = blockCount;
        } else {
            blocksToScroll = Math.floor(blockCount / 2);
        }
        
        sliderTrack.style.setProperty('--blocks-to-scroll', blocksToScroll);
    }
    
    updateBlocksToScroll();
    window.addEventListener('resize', updateBlocksToScroll);
});

// Скролл бар
const scrollText = document.querySelector('.infinite-scroll-text');
scrollText.innerHTML += scrollText.innerHTML;

// Глаза
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function followCursor() {
    const eyes = document.querySelectorAll('.eye');
    const pupils = document.querySelectorAll('.pupil');
    
    eyes.forEach((eye, index) => {
      const eyeRect = eye.getBoundingClientRect();
      const eyeX = eyeRect.left + eyeRect.width / 2;
      const eyeY = eyeRect.top + eyeRect.height / 2;
      
      const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
      
      const maxDistance = eyeRect.width / 4; // 1/4 ширины глаза
      const rawDistance = Math.sqrt(Math.pow(mouseX - eyeX, 2) + Math.pow(mouseY - eyeY, 2)) / 10;
      const distance = Math.min(maxDistance, rawDistance);
      
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;
      
      pupils[index].style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    });
    
    requestAnimationFrame(followCursor);
  }

followCursor();

// Пилюли
document.addEventListener('DOMContentLoaded', function() {
    const resultPill = document.getElementById('resultPill');
    const resetBtn = document.getElementById('resetBtn');
    const parts = document.querySelectorAll('.pill-part');
    
    let currentTopColor = '#E85050';
    let currentBottomColor = '#FF8C42';
    
    updateResultPill();
    
    parts.forEach(part => {
        part.addEventListener('dragstart', dragStart);
        part.addEventListener('dragend', dragEnd);
        part.setAttribute('draggable', 'true');
    });
    
    resultPill.addEventListener('dragover', dragOver);
    resultPill.addEventListener('drop', drop);
    
    resetBtn.addEventListener('click', resetPill);
    
    function dragStart(e) {
        this.classList.add('dragging');
        
        const dragImage = this.cloneNode(true);
        dragImage.style.position = 'absolute';
        dragImage.style.left = '-9999px';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 50, 30);
        
        setTimeout(() => document.body.removeChild(dragImage), 0);
        
        e.dataTransfer.setData('text/plain', JSON.stringify({
            color: this.dataset.color,
            type: this.classList.contains('top-part') ? 'top' : 'bottom'
        }));
    }
    
    function dragEnd() {
        this.classList.remove('dragging');
    }
    
    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    
    function drop(e) {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        
        if (data.type === 'top') {
            currentTopColor = data.color;
        } else {
            currentBottomColor = data.color;
        }
        
        updateResultPill();
    }
    
    function updateResultPill() {
        resultPill.style.background = `linear-gradient(to bottom, ${currentTopColor} 50%, ${currentBottomColor} 50%)`;
    }
    
    function resetPill() {
        currentTopColor = '#E85050';
        currentBottomColor = '#FF8C42';
        updateResultPill();
    }
});
// Сложная физика
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.four-screen');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Body = Matter.Body,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Sleeping = Matter.Sleeping,
          Bounds = Matter.Bounds,
          Query = Matter.Query;
    
    const engine = Engine.create({
        gravity: { x: 0, y: 0.5 },
        enableSleeping: true
    });
    
    const render = Render.create({
        element: document.getElementById('canvas-container'),
        engine: engine,
        options: {
            width: containerWidth,
            height: containerHeight,
            wireframes: false,
            background: 'linear-gradient(0deg, #EBD2B4 81.04%, #DF9DC9 100%)',
            showSleeping: true
        }
    });
    
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    
    // Границы
    const boundaryThickness = 50;
    const boundaryOptions = { 
        isStatic: true, 
        restitution: 0.2,
        render: { visible: false },
        collisionFilter: { group: -1 }
    };
    
    const ground = Bodies.rectangle(
        containerWidth / 2, 
        containerHeight + boundaryThickness/2, 
        containerWidth * 3, boundaryThickness, 
        boundaryOptions
    );
    
    const leftWall = Bodies.rectangle(
        -boundaryThickness/2, containerHeight / 2, 
        boundaryThickness, containerHeight * 3, 
        boundaryOptions
    );
    
    const rightWall = Bodies.rectangle(
        containerWidth + boundaryThickness/2, containerHeight / 2, 
        boundaryThickness, containerHeight * 3, 
        boundaryOptions
    );
    
    const ceiling = Bodies.rectangle(
        containerWidth / 2, -boundaryThickness/2, 
        containerWidth * 3, boundaryThickness, 
        boundaryOptions
    );
    
    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);
    
    // Функция создания пилюль с размытием
    function createPill(x, y, width, height, color, angle, isStatic = false) {
        const pill = Bodies.rectangle(x, y, width, height, {
            chamfer: { radius: height/2 },
            angle: angle,
            isStatic: isStatic,
            restitution: 0.3,
            friction: 0.1,
            frictionAir: 0.01,
            density: 0.001,
            render: {
                fillStyle: color,
                strokeStyle: '#000',
                lineWidth: 1,
                sprite: {
                    texture: '',
                    xScale: 1,
                    yScale: 1
                }
            },
            collisionFilter: {
                group: 0,
                category: 0x0001,
                mask: 0xFFFFFFFF
            }
        });
        
        // Добавляем класс для размытия
        const pillElement = document.querySelector(`[data-id="matter-${pill.id}"]`);
        if (pillElement) {
            pillElement.classList.add('pill-blur');
        }
        
        if (!isStatic) {
            Body.set(pill, {
                velocityThreshold: 10,
                speedLimit: 15,
                angularVelocity: 0.1,
                frictionStatic: 0.5
            });
        }
        
        return pill;
    }
    
    // Цвета для пилюль
    const colors = [
        '#78C850', '#FFD700', '#5691F0', 
        '#E85050', '#BC13FE', '#FF8C42',
        '#78C850', '#FFD700', '#5691F0',
        '#E85050', '#BC13FE', '#FF8C42'
    ];
    
    const pillWidth = 210;
    const pillHeight = 85;
    const angle = -Math.PI/3;
    
    let pills = [];
    
    function createPillsBasedOnScreenSize() {
        pills.forEach(pill => {
            Composite.remove(engine.world, pill);
        });
        pills = [];
        
        let pillCount;
        if (window.innerWidth >= 1200) {
            pillCount = 9; // Большие экраны - 9 пилюль
        } else if (window.innerWidth >= 768) {
            pillCount = 4; // Средние экраны - 4 пилюли
        } else {
            pillCount = 2; // Мобильные устройства - 2 пилюли
        }
        
        const startY = containerHeight - 160;
        for (let i = 0; i < pillCount + 1; i++) {
            const x = 100 + i * (containerWidth - 200) / pillCount;
            const colorIndex = i % colors.length;
            const pill = createPill(x, startY, pillWidth, pillHeight, colors[colorIndex], angle, true);
            pill.initialPosition = { x: x, y: startY, angle: angle };
            Composite.add(engine.world, pill);
            pills.push(pill);
        }
    }
    
    createPillsBasedOnScreenSize();
    
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    
    let isDragging = false;
    let draggedPill = null;
    
    mouseConstraint.mouse.element.addEventListener('mousedown', function(event) {
        if (event.button !== 0) return;
        
        const mousePos = mouse.position;
        const bodies = Composite.allBodies(engine.world);
        
        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            if (body.isStatic && body.initialPosition) {
                if (Bounds.contains(body.bounds, mousePos)) {
                    const collisions = Query.point([body], mousePos);
                    if (collisions.length > 0) {
                        isDragging = true;
                        draggedPill = body;
                        
                        const pillElement = document.querySelector(`[data-id="matter-${body.id}"]`);
                        if (pillElement) {
                            pillElement.classList.remove('pill-blur');
                            pillElement.classList.add('pill-no-blur');
                        }
                        
                        Body.set(body, { isStatic: false });
                        Sleeping.set(body, false);
                        break;
                    }
                }
            }
        }
    });
    
    mouseConstraint.mouse.element.addEventListener('mousemove', function() {
        if (isDragging) {
            document.body.style.overflow = 'hidden';
        }
    });
    
    mouseConstraint.mouse.element.addEventListener('mouseup', function() {
        if (isDragging && draggedPill) {
            const pillElement = document.querySelector(`[data-id="matter-${draggedPill.id}"]`);
            if (pillElement) {
                pillElement.classList.remove('pill-no-blur');
                pillElement.classList.add('pill-blur');
            }
        }
        isDragging = false;
        draggedPill = null;
        document.body.style.overflow = '';
    });
    
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        const rect = container.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            return;
        }
        
        const mousePos = { 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top 
        };
        
        const bodies = Composite.allBodies(engine.world);
        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            if (!body.isStatic && body.initialPosition) {
                if (Bounds.contains(body.bounds, mousePos)) {
                    const collisions = Query.point([body], mousePos);
                    if (collisions.length > 0) {
                        const pillElement = document.querySelector(`[data-id="matter-${body.id}"]`);
                        if (pillElement) {
                            pillElement.classList.remove('pill-no-blur');
                            pillElement.classList.add('pill-blur');
                        }
                        
                        Body.setPosition(body, body.initialPosition);
                        Body.setAngle(body, body.initialPosition.angle);
                        Body.setVelocity(body, { x: 0, y: 0 });
                        Body.setAngularVelocity(body, 0);
                        Body.set(body, { isStatic: true });
                        Sleeping.set(body, true);
                        break;
                    }
                }
            }
        }
    });
    
    window.addEventListener('resize', function() {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        
        render.options.width = newWidth;
        render.options.height = newHeight;
        Render.setPixelRatio(render, window.devicePixelRatio);
        
        Body.setPosition(ground, {
            x: newWidth / 2,
            y: newHeight + boundaryThickness/2
        });
        
        Body.setPosition(leftWall, {
            x: -boundaryThickness/2,
            y: newHeight / 2
        });
        
        Body.setPosition(rightWall, {
            x: newWidth + boundaryThickness/2,
            y: newHeight / 2
        });
        
        Body.setPosition(ceiling, {
            x: newWidth / 2,
            y: -boundaryThickness/2
        });
        
        createPillsBasedOnScreenSize();
    });
    
    container.addEventListener('mouseleave', function() {
        if (isDragging && draggedPill) {
            const pillElement = document.querySelector(`[data-id="matter-${draggedPill.id}"]`);
            if (pillElement) {
                pillElement.classList.remove('pill-no-blur');
                pillElement.classList.add('pill-blur');
            }
        }
        isDragging = false;
        draggedPill = null;
        document.body.style.overflow = '';
    });
    
    setInterval(() => {
        pills.forEach(pill => {
            const pillElement = document.querySelector(`[data-id="matter-${pill.id}"]`);
            if (pillElement && !pillElement.classList.contains('pill-blur') && pill.isStatic) {
                pillElement.classList.add('pill-blur');
            }
        });
    }, 100);
});