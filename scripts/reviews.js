/* GOOGLE MAPS REVIEWS WIDGET LOGIC - The Original Tavern */

// Polyfill for NodeList.prototype.forEach in older mobile browsers
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Real-style Google reviews for The Original Tavern (Solares, Cantabria)
const initialReviews = [
    {
        author: "David R.",
        stars: 5,
        date: "Hace 1 semana",
        text: "Espectacular. El local tiene dos plantas y es súper acogedor. Pedimos el pulpo braseado que estaba en su punto perfecto, tierno y con mucho sabor, y el cachopo de cecina y foie que es gigante y exquisito. Raciones muy generosas. El trato del personal de 10, súper atentos. Volveremos sin duda.",
        avatarColor: "#f39c12"
    },
    {
        author: "María José G.",
        stars: 5,
        date: "Hace 3 semanas",
        text: "Fuimos a cenar en pareja y nos encantó. Cenamos en el comedor de la planta de arriba, muy tranquilo y bonito. Las croquetas de cocido buenísimas y muy cremosas, y las zamburiñas espectaculares. De postre una torrija caramelizada para compartir que estaba de muerte. Calidad-precio inmejorable en Solares.",
        avatarColor: "#2ecc71"
    },
    {
        author: "Carlos Fernández",
        stars: 5,
        date: "Hace 1 mes",
        text: "Un sitio imprescindible en Solares. Todo lo que pedimos estaba de categoría: los chipirones a la plancha brutales con su refrito, y las alcachofas con foie deliciosas. La atención es de lo mejor, camareros muy profesionales y simpáticos. Raciones abundantes a muy buen precio. ¡Recomendadísimo!",
        avatarColor: "#3498db"
    },
    {
        author: "Ana Belén M.",
        stars: 4,
        date: "Hace 1 mes",
        text: "Muy buena comida y ambiente. Estuvimos en la terraza tomando unas raciones. El pulpo a la gallega y los huevos rotos espectaculares. El servicio fue un poco lento porque estaba llenísimo (normal siendo fin de semana), pero la amabilidad del personal compensa todo. Volveré seguro.",
        avatarColor: "#9b59b6"
    },
    {
        author: "Javier Ortiz",
        stars: 5,
        date: "Hace 2 meses",
        text: "Cachopo espectacular, de los mejores que he comido. Pedimos también croquetas y unas navajas frescas del día muy ricas. Las raciones son muy grandes, con hambre no te quedas. Relación calidad precio fantástica y el servicio inmejorable. Un acierto seguro en Cantabria.",
        avatarColor: "#e74c3c"
    },
    {
        author: "Laura S.",
        stars: 5,
        date: "Hace 2 meses",
        text: "El trato recibido fue maravilloso de principio a fin. El camarero nos recomendó el pulpo a la brasa y las setas con paletilla ibérica, un acierto total. De postre el pastel de frutas casero, riquísimo. El local es muy amplio y está impecable. Para repetir mil veces.",
        avatarColor: "#16a085"
    }
];

// Load reviews from localStorage if available, otherwise use initialReviews
let reviews = initialReviews;
try {
    var storedReviews = localStorage.getItem('tavern_reviews');
    if (storedReviews) {
        reviews = JSON.parse(storedReviews) || initialReviews;
    }
} catch(e) {
    reviews = initialReviews;
}
let totalReviewsCount = 480 + (reviews.length - initialReviews.length);

// Calculate Rating Bars dynamically based on total reviews
function getRatingDistribution() {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    // Add real reviews counts (simulating the 480 reviews baseline distribution)
    // 5 stars: 84%, 4 stars: 11%, 3 stars: 3%, 2 stars: 1%, 1 star: 1%
    counts[5] = Math.round(totalReviewsCount * 0.84);
    counts[4] = Math.round(totalReviewsCount * 0.11);
    counts[3] = Math.round(totalReviewsCount * 0.03);
    counts[2] = Math.round(totalReviewsCount * 0.01);
    counts[1] = Math.round(totalReviewsCount * 0.01);
    
    // Adjust slightly for newly added reviews
    reviews.forEach(r => {
        if (r.stars && counts[r.stars] !== undefined) {
            counts[r.stars]++;
        }
    });

    return counts;
}

// Render rating progress bars
function renderRatingBars() {
    const barsContainer = document.getElementById('widget-rating-bars');
    if (!barsContainer) return;
    
    const distribution = getRatingDistribution();
    const values = Object.keys(distribution).map(function(key) {
        return distribution[key];
    });
    const maxVal = Math.max.apply(null, values);
    
    barsContainer.innerHTML = '';
    
    for (let star = 5; star >= 1; star--) {
        const count = distribution[star];
        const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
        
        const row = document.createElement('div');
        row.className = 'rating-bar-row';
        row.innerHTML = `
            <span class="star-label">${star}</span>
            <div class="rating-bar-container">
                <div class="rating-bar-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="rating-value">${count}</span>
        `;
        barsContainer.appendChild(row);
    }
}

// Generate stars SVG string helper
function getStarsSVG(starsCount) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= starsCount) {
            starsHTML += `<svg viewBox="0 0 24 24" class="icon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
        } else {
            starsHTML += `<svg viewBox="0 0 24 24" class="icon" style="fill: #2c2d30;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
        }
    }
    return starsHTML;
}

// Render all reviews in the carousel
function renderReviewsList() {
    const carousel = document.getElementById('reviews-carousel');
    if (!carousel) return;
    
    carousel.innerHTML = '';
    
    // Render reviews in reverse order (newest first)
    reviews.slice().reverse().forEach(r => {
        const initial = r.author.charAt(0).toUpperCase();
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-card-header">
                <div class="review-avatar" style="background-color: ${r.avatarColor || '#f39c12'}">
                    ${initial}
                </div>
                <div class="review-author-info">
                    <span class="review-author-name">${r.author}</span>
                    <span class="review-date">${r.date}</span>
                </div>
            </div>
            <div class="review-stars">
                ${getStarsSVG(r.stars)}
            </div>
            <p class="review-text">${r.text}</p>
        `;
        carousel.appendChild(card);
    });
}

// Add a new review to the database
function addNewReview(author, stars, text, avatarColor) {
    const newReview = {
        author,
        stars: parseInt(stars, 10),
        date: "Hace un momento",
        text,
        avatarColor: avatarColor || "#8b0022"
    };
    
    reviews.push(newReview);
    localStorage.setItem('tavern_reviews', JSON.stringify(reviews));
    
    // Increment total counter
    totalReviewsCount++;
    
    // Re-render
    renderRatingBars();
    renderReviewsList();
    
    // Update review count counters in text
    document.querySelectorAll('.reviews-count').forEach(el => {
        el.textContent = `${totalReviewsCount} opiniones en Google Maps`;
    });
}

// Carousel Controls Logic
function initCarouselControls() {
    const carousel = document.getElementById('reviews-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    nextBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('.review-card').offsetWidth;
        carousel.scrollBy({ left: cardWidth + 30, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('.review-card').offsetWidth;
        carousel.scrollBy({ left: -(cardWidth + 30), behavior: 'smooth' });
    });
    
    // Hide/show buttons based on scroll position (optional polish)
    carousel.addEventListener('scroll', () => {
        if (carousel.scrollLeft <= 5) {
            prevBtn.style.opacity = '0.5';
        } else {
            prevBtn.style.opacity = '1';
        }
        
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5) {
            nextBtn.style.opacity = '0.5';
        } else {
            nextBtn.style.opacity = '1';
        }
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderRatingBars();
    renderReviewsList();
    initCarouselControls();
});
