/* MAIN WEB SITE INTERACTIVE LOGIC - The Original Tavern */

// Polyfill for NodeList.prototype.forEach in older mobile browsers
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// 1. Allergen Mapping (Spanish names and descriptive icons)
const allergenMap = {
    1: { name: "Gluten", icon: "🌾", class: "gluten" },
    2: { name: "Crustáceos", icon: "🦀", class: "crustaceans" },
    3: { name: "Pescado", icon: "🐟", class: "fish" },
    4: { name: "Huevos", icon: "🥚", class: "eggs" },
    5: { name: "Cacahuetes", icon: "🥜", class: "peanuts" },
    6: { name: "Soja", icon: "🫘", class: "soy" },
    7: { name: "Lácteos", icon: "🥛", class: "dairy" },
    8: { name: "Frutos de Cáscara", icon: "🌰", class: "nuts" },
    9: { name: "Apio", icon: "🥬", class: "celery" },
    10: { name: "Mostaza", icon: "🌭", class: "mustard" },
    11: { name: "Sésamo", icon: "🫘", class: "sesame" },
    12: { name: "Sulfitos", icon: "🍷", class: "sulfites" },
    13: { name: "Altramuces", icon: "🌱", class: "lupines" },
    14: { name: "Moluscos", icon: "🐚", class: "molluscs" }
};

// 2. Official Printed Menu Database
const dishes = [
    // --- PICOTEO PARA COMPARTIR (picoteo-compartir) ---
    {
        id: 20,
        category: "picoteo-compartir",
        title: "PLATO MARINERO",
        price: "42,90 €",
        desc: "Pulpo gallega, gambones, zamburiñas, chipirones plancha y colas de langostino al ajillo",
        allergens: [2, 3, 4, 14],
        badge: "Especialidad",
        image: "assets/plato-marinero.jpg"
    },
    {
        id: 1,
        category: "picoteo-compartir",
        title: "Champiñones plancha al ajillo",
        price: "10,50 €",
        desc: "",
        allergens: []
    },
    {
        id: 3,
        category: "picoteo-compartir",
        title: "Pimientos confitados y Ventresca",
        price: "15,90 €",
        desc: "",
        allergens: [3],
        image: "assets/ventresca-pimientos.jpg"
    },
    {
        id: 5,
        category: "picoteo-compartir",
        title: "Paté de cabracho con dos salsas",
        price: "13,50 €",
        desc: "",
        allergens: [2, 3, 4, 7, 14]
    },
    {
        id: 6,
        category: "picoteo-compartir",
        title: "Zamburiñas plancha con refrito",
        price: "16,90 €",
        desc: "",
        allergens: [2, 14]
    },
    {
        id: 7,
        category: "picoteo-compartir",
        title: "Chipirones plancha \"Kini\"",
        price: "15,90 €",
        desc: "",
        allergens: [2, 3, 14],
        badge: "Estrella",
        image: "assets/chipirones.jpg"
    },
    {
        id: 8,
        category: "picoteo-compartir",
        title: "Setas plancha con Paletilla Ibérica",
        price: "14,90 €",
        desc: "",
        allergens: [6]
    },
    {
        id: 9,
        category: "picoteo-compartir",
        title: "Croquetas de jamón",
        price: "9,90 €",
        desc: "",
        allergens: [1]
    },
    {
        id: 4,
        category: "picoteo-compartir",
        title: "Callos receta \"Mamá\" con patatas",
        price: "14,90 €",
        desc: "",
        allergens: [],
        image: "assets/callos.jpg"
    },
    {
        id: 10,
        category: "picoteo-compartir",
        title: "Morcilla con vinagreta de tomate",
        price: "9,50 €",
        desc: "",
        allergens: [],
        image: "assets/morcilla.jpg"
    },
    {
        id: 2,
        category: "picoteo-compartir",
        title: "Cecina de León con virutas de Foie",
        price: "16,50 €",
        desc: "",
        allergens: []
    },
    {
        id: 12,
        category: "picoteo-compartir",
        title: "Tabla de embutidos ibéricos y Queso",
        price: "17,90 €",
        desc: "",
        allergens: [8],
        image: "assets/tabla-embutidos.jpg"
    },
    {
        id: 13,
        category: "picoteo-compartir",
        title: "Rabas de calamar",
        price: "13,50 €",
        desc: "",
        allergens: [1, 2, 14],
        badge: "Obligatorio"
    },
    {
        id: 11,
        category: "picoteo-compartir",
        title: "Navajas a la plancha con refrito",
        price: "14,50 €",
        desc: "",
        allergens: [2, 3, 14],
        badge: "Sugerencia",
        image: "assets/navajas.jpg"
    },
    {
        id: 14,
        category: "picoteo-compartir",
        title: "Colas de langostinos al ajillo",
        price: "16,50 €",
        desc: "",
        allergens: [2, 14]
    },
    {
        id: 15,
        category: "picoteo-compartir",
        title: "Revuelto setas, langostinos, jamón",
        price: "13,90 €",
        desc: "",
        allergens: [2, 3, 4]
    },
    {
        id: 16,
        category: "picoteo-compartir",
        title: "Boquerones en vinagre al ajillo",
        price: "13,50 €",
        desc: "",
        allergens: [3]
    },
    {
        id: 17,
        category: "picoteo-compartir",
        title: "Langostinos encebollados",
        price: "15,90 €",
        desc: "",
        allergens: [2, 3, 14],
        image: "assets/langostinos-encebollados.jpg"
    },
    {
        id: 18,
        category: "picoteo-compartir",
        title: "Pulpo a la gallega o en vinagreta",
        price: "20,90 €",
        desc: "",
        allergens: [2, 14],
        image: "assets/pulpo-parmentier.jpg"
    },
    {
        id: 19,
        category: "picoteo-compartir",
        title: "Patatas alibaba",
        price: "8,50 €",
        desc: "",
        allergens: [4]
    },
    {
        id: 50,
        category: "picoteo-compartir",
        title: "Mejillones en vinagreta",
        price: "S/M",
        desc: "Mejillones de roca frescos servidos con vinagreta tradicional de pimientos y cebolla",
        allergens: [14],
        badge: "Sugerencia",
        image: "assets/mejillones.jpg"
    },
 
    // --- SUGERENCIAS (sugerencias) ---
    {
        id: 51,
        category: "sugerencias",
        title: "Torreznos de Tío José con pimientos de Padrón",
        price: "S/M",
        desc: "",
        allergens: [],
        badge: "Sugerencia",
        image: "assets/torreznos.jpg"
    },
    {
        id: 52,
        category: "sugerencias",
        title: "Patatas revolconas con langostinos y ali oli suave",
        price: "S/M",
        desc: "",
        allergens: [2, 4],
        badge: "Sugerencia",
        image: "assets/patatas-revolconas.png"
    },
    {
        id: 53,
        category: "sugerencias",
        title: "Gyozas crujientes con salsa sweet chili",
        price: "S/M",
        desc: "",
        allergens: [1],
        badge: "Sugerencia",
        image: "assets/gyozas.jpg"
    },
    {
        id: 54,
        category: "sugerencias",
        title: "Pulpo a la plancha con toque ahumado",
        price: "S/M",
        desc: "y mousse de patata con aceite de pimentón",
        allergens: [14],
        badge: "Sugerencia",
        image: "assets/pulpo-ahumado.png"
    },
    {
        id: 55,
        category: "sugerencias",
        title: "Crujiente de chipirones en pan de gamba",
        price: "S/M",
        desc: "con salsa kimchi y alioli suave",
        allergens: [1, 2, 3, 14],
        badge: "Sugerencia"
    },
    {
        id: 49,
        category: "sugerencias",
        title: "Alcachofas confitadas en oliva con paletilla y foie",
        price: "16,90 €",
        desc: "",
        allergens: [],
        badge: "Sugerencia",
        image: "assets/alcachofas-foie.png"
    },
    {
        id: 56,
        category: "sugerencias",
        title: "Timbal de pulpo y langostinos al ajillo",
        price: "S/M",
        desc: "sobre mousse de patata con alioli gratén",
        allergens: [2, 4, 14],
        badge: "Sugerencia",
        image: "assets/pulpo-timbal.jpg"
    },
    {
        id: 57,
        category: "sugerencias",
        title: "Pimientos rellenos de carne con toque barbacoa",
        price: "S/M",
        desc: "y salsa bechamel al queso de cabra",
        allergens: [1, 7],
        badge: "Sugerencia"
    },
    {
        id: 58,
        category: "sugerencias",
        title: "Tacos pulled pork Original",
        price: "S/M",
        desc: "",
        allergens: [1],
        badge: "Sugerencia"
    },
    {
        id: 59,
        category: "sugerencias",
        title: "Setas en salsa con jamón de pato y foie",
        price: "S/M",
        desc: "",
        allergens: [],
        badge: "Sugerencia"
    },
    {
        id: 60,
        category: "sugerencias",
        title: "Ensaladilla Rusa casera",
        price: "S/M",
        desc: "con ventresca de bonito, pimientos confitados y cebolla encurtida",
        allergens: [3, 4],
        badge: "Sugerencia",
        image: "assets/ensaladilla.jpg"
    },
 
    // --- ENSALADAS (ensaladas) ---
    {
        id: 21,
        category: "ensaladas",
        title: "Ensalada Templada de Bacalao",
        price: "15,90 €",
        desc: "con tomate, ali-oli, pimientos confitados, Módena y Oliva",
        allergens: [3, 4],
        image: "assets/ensalada-bacalao.jpg"
    },
    {
        id: 22,
        category: "ensaladas",
        title: "Ensalada de tomate, ventresca y espárragos",
        price: "14,50 €",
        desc: "",
        allergens: [3],
        image: "assets/ensalada-tomate.jpg"
    },
    {
        id: 23,
        category: "ensaladas",
        title: "Ensalada de paletilla ibérica y mousse de foie",
        price: "15,50 €",
        desc: "lechugas, pasas, tomatito en vinagreta de foie",
        allergens: [7]
    },
 
    // --- PARA MOJAR PAN (mojar-pan) ---
    {
        id: 24,
        category: "mojar-pan",
        title: "Huevos con Paletilla Ibérica, patatas, cebolla crujiente y virutas de Foie",
        price: "14,90 €",
        desc: "patatas, cebolla crujiente y virutas de Foie",
        allergens: [4, 7],
        badge: "Favorito"
    },
    {
        id: 25,
        category: "mojar-pan",
        title: "Huevos con chorizo y patatas",
        price: "12,50 €",
        desc: "",
        allergens: [4]
    },
    {
        id: 26,
        category: "mojar-pan",
        title: "Huevos, gulas al ajillo y patatas",
        price: "12,90 €",
        desc: "",
        allergens: [2, 3, 4]
    },
    {
        id: 27,
        category: "mojar-pan",
        title: "Croquetas, patatas fritas y huevo frito",
        price: "9,90 €",
        desc: "",
        allergens: [1, 4, 7]
    },
    {
        id: 28,
        category: "mojar-pan",
        title: "Pechugas de pollo, patatas fritas y huevo frito",
        price: "9,90 €",
        desc: "",
        allergens: [4]
    },
 
    // --- PESCADOS Y MARISCOS (pescados-mariscos) ---
    {
        id: 29,
        category: "pescados-mariscos",
        title: "Solomillo de Bacalao con tomate casero",
        price: "18,90 €",
        desc: "",
        allergens: [3]
    },
    {
        id: 31,
        category: "pescados-mariscos",
        title: "Bacalao en pil-pil de trufa con pulpo",
        price: "23,90 €",
        desc: "",
        allergens: [2, 3, 7],
        badge: "Recomendado"
    },
    {
        id: 32,
        category: "pescados-mariscos",
        title: "Merluza rellena de pudin de cabracho en salsas",
        price: "22,50 €",
        desc: "",
        allergens: [1, 2, 3, 14],
        image: "assets/merluza-rellena.jpg"
    },
    {
        id: 33,
        category: "pescados-mariscos",
        title: "Albóndigas de Rape y Langostinos en salsa marinera",
        price: "19,90 €",
        desc: "de rape y langostinos en salsa marinera con patatas panadera",
        allergens: [1, 2, 3, 4],
        image: "assets/albondigas-rape.jpg"
    },
    {
        id: 30,
        category: "pescados-mariscos",
        title: "Pescado del día (Rodaballo, Lubina, Salmón...)",
        price: "S/M",
        desc: "",
        allergens: [],
        image: "assets/rodaballo.jpg"
    },
 
    // --- CARNES (carnes) ---
    {
        id: 34,
        category: "carnes",
        title: "Entrecot a la pimienta ó al queso",
        price: "20,50 €",
        desc: "con patatas y pimientos",
        allergens: [],
        image: "assets/entrecot.png"
    },
    {
        id: 35,
        category: "carnes",
        title: "Cachopo de ternera",
        price: "21,90 €",
        desc: "de cecina, Foie, crema de queso, patatas y pimientos",
        allergens: [1, 4, 7],
        badge: "Estrella",
        image: "assets/cachopo.jpg"
    },
    {
        id: 36,
        category: "carnes",
        title: "Chuletillas de cordero con aceite confitado de ajo",
        price: "23,90 €",
        desc: "patatas y pimientos",
        allergens: [],
        image: "assets/chuletillas.jpg"
    },
    {
        id: 37,
        category: "carnes",
        title: "Solomillo de vaca con setas y Foie",
        price: "26,90 €",
        desc: "",
        allergens: [],
        badge: "Premium"
    },
    {
        id: 38,
        category: "carnes",
        title: "Solomillo de vaca al queso",
        price: "23,50 €",
        desc: "",
        allergens: [7]
    },
    {
        id: 39,
        category: "carnes",
        title: "Chuletón, chuleta de vaca ó vaca madurada en plato caliente",
        price: "S/M",
        desc: "Acompañado de patatas y pimientos",
        allergens: [],
        image: "assets/chuleton.png"
    },
 
    // --- POSTRES (postres) ---
    {
        id: 40,
        category: "postres",
        title: "Tarta de crema de orujo y G. Lotus",
        price: "5,90 €",
        desc: "",
        allergens: [5, 7]
    },
    {
        id: 41,
        category: "postres",
        title: "Tarta de queso con toque manchego",
        price: "6,50 €",
        desc: "",
        allergens: [],
        badge: "Recomendado"
    },
    {
        id: 42,
        category: "postres",
        title: "Tiramisú, Chocolate",
        price: "5,90 €",
        desc: "",
        allergens: [4, 7]
    },
    {
        id: 43,
        category: "postres",
        title: "Torrija de brioche caramelizada y helado",
        price: "6,20 €",
        desc: "",
        allergens: [],
        badge: "Estrella"
    },
    {
        id: 44,
        category: "postres",
        title: "Helado (almendrado, o bolas)",
        price: "2,90 €",
        desc: "",
        allergens: [7]
    },
    {
        id: 45,
        category: "postres",
        title: "Coulant de chocolate y helado",
        price: "5,90 €",
        desc: "",
        allergens: [1, 4, 7]
    },
    {
        id: 46,
        category: "postres",
        title: "Tartaleta de manzana caramelizada",
        price: "5,90 €",
        desc: "",
        allergens: []
    },
    {
        id: 47,
        category: "postres",
        title: "Tarta de la semana",
        price: "6,20 €",
        desc: "",
        allergens: [4, 7]
    },
    {
        id: 48,
        category: "postres",
        title: "Valeciano (Z. Naranja con helado)",
        price: "6,50 €",
        desc: "",
        allergens: [7]
    }
];

// 3. Render Menu Lists dynamically (Classic style with dotted leaders: Name --------- Price)
const categoryOrder = [
    { id: "sugerencias", name: "Sugerencias" },
    { id: "picoteo-compartir", name: "Picoteo para compartir" },
    { id: "ensaladas", name: "Ensaladas" },
    { id: "mojar-pan", name: "Para mojar pan" },
    { id: "pescados-mariscos", name: "Pescados y Mariscos" },
    { id: "carnes", name: "Carnes" },
    { id: "postres", name: "Postres" }
];

function renderMenu(categoryFilter) {
    categoryFilter = typeof categoryFilter !== 'undefined' ? categoryFilter : "sugerencias";
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    
    // Filter items
    const filteredDishes = dishes.filter(d => d.category === categoryFilter);
    
    grid.innerHTML = '';
    
    filteredDishes.forEach(d => {
        // Build allergens tags HTML
        let allergensHTML = '';
        if (d.allergens && d.allergens.length > 0) {
            d.allergens.forEach(num => {
                const allergen = allergenMap[num];
                if (allergen) {
                    allergensHTML += `
                        <span class="menu-tag allergen-${allergen.class}" title="Contiene: ${allergen.name}">
                            ${allergen.icon} ${allergen.name}
                        </span>
                    `;
                }
            });
        }
        
        // Build List Item Element
        const listItem = document.createElement('div');
        let classes = d.id === 20 ? 'menu-list-item featured-dish' : 'menu-list-item';
        if (d.image) {
            classes += ' has-image';
            listItem.addEventListener('click', () => {
                if (typeof openDishImageModal === 'function') {
                    openDishImageModal(d.id, d.title);
                }
            });
        }
        listItem.className = classes;

        listItem.innerHTML = `
            <div class="menu-item-header">
                <h3 class="menu-item-title">
                    ${d.title}
                    ${d.badge ? `<span class="menu-item-badge-inline">${d.badge}</span>` : ''}
                </h3>
                ${d.image ? `
                <svg viewBox="0 0 24 24" class="dish-camera-icon" aria-label="Ver foto del plato">
                    <path d="M4 4h3l2-2h6l2 2h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                </svg>
                ` : ''}
                <span class="menu-item-dots"></span>
                <span class="menu-item-price">${d.price}</span>
            </div>
            ${d.desc ? `<p class="menu-item-desc">${d.desc}</p>` : ''}
            ${allergensHTML ? `<div class="menu-item-tags">${allergensHTML}</div>` : ''}
        `;
        grid.appendChild(listItem);
    });

    // Add Next Category Button if applicable
    const currentIndex = categoryOrder.findIndex(c => c.id === categoryFilter);
    if (currentIndex !== -1 && currentIndex < categoryOrder.length - 1) {
        const nextCategory = categoryOrder[currentIndex + 1];
        
        const nextBtnContainer = document.createElement('div');
        nextBtnContainer.className = 'next-category-container';
        nextBtnContainer.style.textAlign = 'center';
        nextBtnContainer.style.marginTop = '2.5rem';
        nextBtnContainer.style.marginBottom = '1rem';
        nextBtnContainer.style.gridColumn = '1 / -1';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-secondary';
        nextBtn.innerHTML = `Ver ${nextCategory.name} &rarr;`;
        
        nextBtn.onclick = () => {
            const nextTab = document.querySelector(`.tab-btn[data-category="${nextCategory.id}"]`);
            if (nextTab) {
                nextTab.click();
                
                const menuSection = document.getElementById('carta');
                if (menuSection) {
                    const headerOffset = 80;
                    const elementPosition = menuSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        };
        
        nextBtnContainer.appendChild(nextBtn);
        grid.appendChild(nextBtnContainer);
    }
}

// 4. Setup Menu Tab Filters Logic
function initMenuTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const grid = document.getElementById('menu-grid');
    
    if (!tabs || !grid) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to current
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Premium transition effect: fade out, render, fade in
            grid.classList.add('menu-grid-transitioning');
            
            setTimeout(() => {
                renderMenu(category);
                grid.classList.remove('menu-grid-transitioning');
            }, 250);
        });
    });
}

// 5. Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 6. Mobile Hamburger Menu Menu toggler
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!toggle || !navMenu) return;
    
    toggle.addEventListener('click', function() {
        this.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    
    // Close mobile menu when nav links are clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

// 7. Booking Modal Dialog Logic
function initBookingModal() {
    const bookingModal = document.getElementById('booking-modal');
    const openBtns = [
        document.getElementById('open-booking-btn'),
        document.getElementById('open-booking-btn-hero'),
        document.getElementById('open-booking-btn-contact')
    ];
    const closeBtn = document.getElementById('close-booking-modal');
    
    if (!bookingModal || !closeBtn) return;
    
    // Open Modal
    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                bookingModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        }
    });
    
    // Close Modal helper
    const closeModal = () => {
        bookingModal.classList.remove('open');
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close by clicking backdrop
    bookingModal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

// 8. Dish Image Modal Logic
let dishImageModal;
let dishImageDisplay;
let dishImageCaption;
let closeDishModalBtn;

function initDishImageModal() {
    dishImageModal = document.getElementById('dish-image-modal');
    dishImageDisplay = document.getElementById('dish-image-display');
    dishImageCaption = document.getElementById('dish-image-caption');
    closeDishModalBtn = document.getElementById('close-image-modal');

    if (!dishImageModal || !closeDishModalBtn) return;

    // Close Modal helper
    const closeDishModal = () => {
        dishImageModal.classList.remove('open');
        document.body.style.overflow = '';
        // Limpiar la imagen tras la animación para que no se vea al abrir otra
        setTimeout(() => {
            if (!dishImageModal.classList.contains('open')) {
                dishImageDisplay.src = '';
            }
        }, 300);
    };

    closeDishModalBtn.addEventListener('click', closeDishModal);

    // Close by clicking backdrop
    dishImageModal.addEventListener('click', function(e) {
        if (e.target === this) closeDishModal();
    });
}

// Function to be called from menu items
function openDishImageModal(dishId, dishTitle) {
    if (!dishImageModal || !dishImageDisplay) return;

    // Find the dish in the database
    const dish = dishes.find(d => d.id === dishId);
    
    // Use the real image if it exists, otherwise fall back to a high-quality generic food placeholder
    if (dish && dish.image) {
        dishImageDisplay.src = dish.image;
    } else {
        dishImageDisplay.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop`;
    }
    
    dishImageDisplay.alt = `Foto de ${dishTitle}`;
    
    if (dishImageCaption) {
        dishImageCaption.textContent = dishTitle;
    }

    dishImageModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// 9. Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initial menu rendering (Sugerencias is the default category)
    renderMenu("sugerencias");
    
    // Handlers init
    initMenuTabs();
    initHeaderScroll();
    initMobileMenu();
    initBookingModal();
    initDishImageModal();
});
