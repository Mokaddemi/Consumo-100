

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Menú móvil
(function () {
    const navEl = document.querySelector('nav');
    const burger = navEl.querySelector('.nav-hamburger, .nav-burger');
    if (!burger) return;
    burger.addEventListener('click', () => navEl.classList.toggle('mobile-open'));
    navEl.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => navEl.classList.remove('mobile-open'))
    );
})();

// ── DIRECTORIO: datos ──
const COMERCIOS = [
    { id: 1, nombre: "Carnicería García", categoria: "Alimentación", tag: "Carnicería", direccion: "C/ Mayor, 14 · Santomera", emoji: "🥩", open: true, featured: false },
    { id: 2, nombre: "Frutas y Verduras El Huerto", categoria: "Alimentación", tag: "Frutería", direccion: "Avda. de Murcia, 8 · Santomera", emoji: "🥦", open: true, featured: true },
    { id: 3, nombre: "Boutique Almendra", categoria: "Moda", tag: "Ropa & Accesorios", direccion: "C/ Real, 22 · Santomera", emoji: "👗", open: true, featured: false },
    { id: 4, nombre: "Calzados Mira", categoria: "Moda", tag: "Calzado", direccion: "C/ San Roque, 5 · Santomera", emoji: "👟", open: false, featured: false },
    { id: 5, nombre: "Cafetería El Patio", categoria: "Hostelería", tag: "Café & Tapas", direccion: "Plaza Mayor, 2 · Santomera", emoji: "☕", open: true, featured: false },
    { id: 6, nombre: "Restaurante La Acequia", categoria: "Hostelería", tag: "Restaurante", direccion: "Camino del Río, 11 · Santomera", emoji: "🍽️", open: true, featured: false },
    { id: 7, nombre: "Peluquería & Estética Noa", categoria: "Servicios", tag: "Peluquería", direccion: "C/ Mayor, 31 · Santomera", emoji: "✂️", open: true, featured: false },
    { id: 8, nombre: "Ferretería El Pino", categoria: "Servicios", tag: "Ferretería", direccion: "Avda. de Murcia, 44 · Santomera", emoji: "🔧", open: true, featured: false },
    { id: 9, nombre: "Farmacia Hernández", categoria: "Salud", tag: "Farmacia", direccion: "Plaza de la Iglesia, 3 · Santomera", emoji: "💊", open: true, featured: false },
    { id: 10, nombre: "Papelería & Librería Páginas", categoria: "Cultura", tag: "Librería", direccion: "C/ Real, 9 · Santomera", emoji: "📚", open: true, featured: false },
    { id: 11, nombre: "Sport Santomera", categoria: "Deporte", tag: "Artículos deportivos", direccion: "C/ San Roque, 18 · Santomera", emoji: "⚽", open: true, featured: false },
    { id: 12, nombre: "Muebles & Decoración Arteva", categoria: "Hogar", tag: "Decoración", direccion: "Avda. de la Vega, 7 · Santomera", emoji: "🛋️", open: false, featured: false },
];

const DIR_CATEGORIES = [
    { id: "todos", label: "Todos" },
    { id: "Alimentación", label: "Alimentación" },
    { id: "Moda", label: "Moda" },
    { id: "Hostelería", label: "Hostelería" },
    { id: "Servicios", label: "Servicios" },
    { id: "Salud", label: "Salud" },
    { id: "Deporte", label: "Deporte" },
    { id: "Hogar", label: "Hogar" },
    { id: "Cultura", label: "Cultura" },
];

let dirActiveCat = "todos";
let dirSearchQuery = "";

function normalizeStr(s) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getDirFiltered() {
    let list = [...COMERCIOS];
    if (dirActiveCat !== "todos") {
        list = list.filter(c => c.categoria === dirActiveCat);
    }
    if (dirSearchQuery.trim()) {
        const q = normalizeStr(dirSearchQuery);
        list = list.filter(c =>
            normalizeStr(c.nombre).includes(q) ||
            normalizeStr(c.categoria).includes(q) ||
            normalizeStr(c.tag).includes(q) ||
            normalizeStr(c.direccion).includes(q)
        );
    }
    return [...list.filter(c => c.featured), ...list.filter(c => !c.featured)];
}

function renderDirCard(comercio) {
    const statusText = comercio.open ? "Abierto" : "Cerrado";
    return `
        <div class="dir-card" data-categoria="${comercio.categoria}">
          <div class="dir-icon">${comercio.emoji}</div>
          <div class="dir-info">
            <strong>${comercio.nombre}</strong>
            <span>${comercio.categoria} · ${comercio.tag}</span>
          </div>
        </div>`;
}

function renderDirGrid() {
    const grid = document.getElementById("dirGrid");
    const countEl = document.getElementById("dirResultsCount");
    const filtered = getDirFiltered();

    grid.classList.remove("ready");
    grid.classList.add("filtering");

    setTimeout(() => {
        if (filtered.length === 0) {
            grid.innerHTML = `
            <div class="dir-empty">
              <span class="dir-empty-icon">🔍</span>
              Sin resultados. Prueba otra categoría o ajusta tu búsqueda.
            </div>`;
        } else {
            grid.innerHTML = filtered.map(renderDirCard).join("");
        }

        countEl.innerHTML = filtered.length === COMERCIOS.length
            ? `Mostrando <strong>${filtered.length}</strong> comercios`
            : `Mostrando <strong>${filtered.length}</strong> de <strong>${COMERCIOS.length}</strong> comercios`;

        grid.classList.remove("filtering");
        grid.classList.add("ready");
    }, 140);
}

function renderDirChips() {
    const wrap = document.getElementById("categoryChips");

    wrap.innerHTML = DIR_CATEGORIES.map(cat => {
        const count = cat.id === "todos"
            ? COMERCIOS.length
            : COMERCIOS.filter(c => c.categoria === cat.id).length;
        if (count === 0) return "";
        const isActive = dirActiveCat === cat.id;
        const badge = cat.id !== "todos"
            ? ` <small style="opacity:.65;font-size:.72em;font-weight:700;">${count}</small>`
            : "";
        return `<span class="chip${isActive ? " active" : ""}" data-cat="${cat.id}">${cat.label}${badge}</span>`;
    }).join("");

    wrap.querySelectorAll(".chip").forEach(chip => {
        chip.addEventListener("click", () => {
            dirActiveCat = chip.dataset.cat;
            wrap.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            renderDirGrid();
        });
    });
}

// Búsqueda en tiempo real
const dirSearchInput = document.querySelector(".dir-search input");
const dirSearchBtn = document.querySelector(".dir-search button");

dirSearchInput.addEventListener("input", () => {
    dirSearchQuery = dirSearchInput.value;
    renderDirGrid();
});
dirSearchBtn.addEventListener("click", () => {
    dirSearchQuery = dirSearchInput.value;
    renderDirGrid();
});

// Arranque
renderDirChips();
renderDirGrid();

// Nav active link highlight
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.style.color = '');
            const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (link) link.style.color = 'var(--teal)';
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// Hero stat counter animation
function animateCount(el, target) {
    let start = 0;
    const duration = 1600;
    const step = timestamp => {
        if (!start) start = timestamp;
        const p = Math.min((timestamp - start) / duration, 1);
        const val = Math.floor(p * target);
        el.textContent = (target >= 100 ? '+' : '') + val + (el.dataset.suffix || '');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = (target >= 100 ? '+' : '') + target + (el.dataset.suffix || '');
    };
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.stat strong').forEach((el, i) => {
                const targets = [120, 12, 8];
                const suffixes = ['', '', 'k+'];
                el.dataset.suffix = suffixes[i];
                animateCount(el, targets[i]);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);