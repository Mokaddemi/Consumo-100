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
    if (!navEl) return;

    const burger = navEl.querySelector('.nav-hamburger, .nav-burger');
    if (!burger) return;

    burger.addEventListener('click', () => {
        navEl.classList.toggle('mobile-open');
    });

    navEl.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => {
            navEl.classList.remove('mobile-open');
        })
    );
})();


// ============================================================
// DIRECTORIO - 12 SOCIOS REALES
// Datos tomados del directorio de socios
// ============================================================

const COMERCIOS = [

    {
        id: 1,
        nombre: "Limonlab",
        categoria: "Marketing",
        tag: "Agencia",
        direccion: "Calle Familia Sanchez Muñoz 29",
        telefono: "644 65 57 99",
        correo: "info@limonlab.es",
        abreM: "09:00",
        cierraM: "21:30",
        abreT: null,
        cierraT: null,
        emoji: "☁️",
        featured: true
    },

    {
        id: 2,
        nombre: "Viajes Sandratour",
        categoria: "Alimentación",
        tag: "Carnicería",
        direccion: "Calle calvario 21",
        telefono: "600 45 96 07",
        correo: "sandratourviajes@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:30",
        cierraT: "19:00",
        emoji: "🥩",
        featured: false
    },

    {
        id: 3,
        nombre: "Lavadero Rapiz Santomera",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/ Alfonso xlll N - 3",
        telefono: "968 86 57 72",
        correo: "villaescusaherrerosantiago@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:30",
        cierraT: "19:00",
        emoji: "👗",
        featured: false
    },

    {
        id: 4,
        nombre: "María Torres. Peluquería y estética",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Avenida maestro puyg Valera 22 Santomera Murcis",
        telefono: "968 86 01 23",
        correo: "mariatorrescanovas28@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "16:30",
        cierraT: "20:30",
        emoji: "👗",
        featured: false
    },

    {
        id: 5,
        nombre: "Lidia Pelu",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Calle los huertanos Bajo( Parque Manolo )",
        telefono: "678 56 15 65",
        correo: "Lidiapelu@hotmail.es",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "16:30",
        cierraT: "20:30",
        emoji: "👗",
        featured: false
    },

    {
        id: 6,
        nombre: "REGUERPC",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Tomas Y Valiente, 20",
        telefono: "606 84 78 75",
        correo: "info@reguerpc.com",
        abreM: "10:00",
        cierraM: "20:30",
        abreT: null,
        cierraT: null,
        emoji: "👗",
        featured: false
    },

    {
        id: 7,
        nombre: "Inmobiliaria Mundicasa",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/ Maestro Puig Valera n 12 bajo",
        telefono: "619 68 95 42",
        correo: "Info@mundicasa.com",
        abreM: "10:30",
        cierraM: "14:00",
        abreT: null,
        cierraT: null,
        emoji: "👗",
        featured: false
    },

    {
        id: 8,
        nombre: "La despensa de Pedro bodega",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Avd Juan Carlos I N 51 bajo . Cp 30140 Santomera Murcia",
        telefono: "620 34 06 93",
        correo: "Salazonespedro@hotmail.com",
        abreM: "07:30",
        cierraM: "19:00",
        abreT: null,
        cierraT: null,
        emoji: "👗",
        featured: false
    },

    {
        id: 9,
        nombre: "Diego Friclima s.l.",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/Gaudi 12. Santomera",
        telefono: "696 97 56 71",
        correo: "diegofriclima@gmail.com",
        abreM: "08:00",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "18:30",
        emoji: "👗",
        featured: false
    },

    {
        id: 10,
        nombre: "Lubespa Distribuciónes del Levante SL",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Carretera de Alicante 38",
        telefono: "620 84 31 35",
        correo: "Ventas@lubricantes-online.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "20:00",
        emoji: "👗",
        featured: false
    },

    {
        id: 11,
        nombre: "Tamara Bellot Estilistas",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Calle Del Tomillo ,7 bajo",
        telefono: "689 53 51 10",
        correo: "tamaracostaja@gmail.com",
        abreM: null,
        cierraM: null,
        abreT: null,
        cierraT: null,
        emoji: "👗",
        featured: false
    },

    {
        id: 12,
        nombre: "LIBRERÍA CIRCULO",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/CALVARIO,26 BAJO SANTOMERA (MURCIA)",
        telefono: "968 86 12 72",
        correo: "libreriacirculosantomera@gmail.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "16:30",
        cierraT: "20:30",
        emoji: "👗",
        featured: false
    }

];


// ============================================================
// CATEGORÍAS
// ============================================================

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
    { id: "Marketing", label: "Marketing" }
];


let dirActiveCat = "todos";
let dirSearchQuery = "";


// ============================================================
// NORMALIZAR TEXTO
// ============================================================

function normalizeStr(s) {
    return String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ============================================================
// FILTRAR COMERCIOS
// ============================================================

function getDirFiltered() {

    let list = [...COMERCIOS];

    if (dirActiveCat !== "todos") {
        list = list.filter(c =>
            c.categoria === dirActiveCat
        );
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

    return [
        ...list.filter(c => c.featured),
        ...list.filter(c => !c.featured)
    ];
}


// ============================================================
// TARJETA DEL DIRECTORIO
// ============================================================

function renderDirCard(comercio) {

    return `
        <div
            class="dir-card"
            data-categoria="${comercio.categoria}"
        >

            <div class="dir-icon">
                ${comercio.emoji}
            </div>

            <div class="dir-info">

                <strong>
                    ${comercio.nombre}
                </strong>

                <span>
                    ${comercio.categoria} · ${comercio.tag}
                </span>

            </div>

        </div>
    `;
}


// ============================================================
// MOSTRAR GRID
// ============================================================

function renderDirGrid() {

    const grid = document.getElementById("dirGrid");
    const countEl = document.getElementById("dirResultsCount");

    if (!grid || !countEl) return;

    const filtered = getDirFiltered();

    grid.classList.remove("ready");
    grid.classList.add("filtering");

    setTimeout(() => {

        if (filtered.length === 0) {

            grid.innerHTML = `
                <div class="dir-empty">

                    <span class="dir-empty-icon">
                        🔍
                    </span>

                    Sin resultados.
                    Prueba otra categoría
                    o ajusta tu búsqueda.

                </div>
            `;

        } else {

            grid.innerHTML =
                filtered
                    .map(renderDirCard)
                    .join("");

        }


        countEl.innerHTML =
            filtered.length === COMERCIOS.length

                ? `Mostrando <strong>${filtered.length}</strong> comercios`

                : `Mostrando <strong>${filtered.length}</strong> de <strong>${COMERCIOS.length}</strong> comercios`;


        grid.classList.remove("filtering");
        grid.classList.add("ready");

    }, 140);
}


// ============================================================
// FILTROS
// ============================================================

function renderDirChips() {

    const wrap = document.getElementById("categoryChips");

    if (!wrap) return;

    wrap.innerHTML = DIR_CATEGORIES
        .map(cat => {

            const count =
                cat.id === "todos"
                    ? COMERCIOS.length
                    : COMERCIOS.filter(
                        c => c.categoria === cat.id
                    ).length;

            if (count === 0) return "";

            const isActive =
                dirActiveCat === cat.id;

            const badge =
                cat.id !== "todos"
                    ? ` <small style="
                        opacity:.65;
                        font-size:.72em;
                        font-weight:700;
                      ">
                        ${count}
                      </small>`
                    : "";

            return `
                <span
                    class="chip${isActive ? " active" : ""}"
                    data-cat="${cat.id}"
                >
                    ${cat.label}${badge}
                </span>
            `;

        })
        .join("");


    wrap.querySelectorAll(".chip")
        .forEach(chip => {

            chip.addEventListener("click", () => {

                dirActiveCat =
                    chip.dataset.cat;

                wrap.querySelectorAll(".chip")
                    .forEach(c =>
                        c.classList.remove("active")
                    );

                chip.classList.add("active");

                renderDirGrid();

            });

        });
}


// ============================================================
// BÚSQUEDA
// ============================================================

const dirSearchInput =
    document.querySelector(".dir-search input");

const dirSearchBtn =
    document.querySelector(".dir-search button");


if (dirSearchInput) {

    dirSearchInput.addEventListener("input", () => {

        dirSearchQuery =
            dirSearchInput.value;

        renderDirGrid();

    });

}


if (dirSearchBtn) {

    dirSearchBtn.addEventListener("click", () => {

        dirSearchQuery =
            dirSearchInput
                ? dirSearchInput.value
                : "";

        renderDirGrid();

    });

}


// ============================================================
// ARRANQUE
// ============================================================

renderDirChips();
renderDirGrid();


// ============================================================
// NAV ACTIVE
// ============================================================

const navLinks =
    document.querySelectorAll('.nav-links a');

const sections =
    document.querySelectorAll('section[id]');


const navObserver =
    new IntersectionObserver(entries => {

        entries.forEach(e => {

            if (e.isIntersecting) {

                navLinks.forEach(
                    l => l.style.color = ''
                );

                const link =
                    document.querySelector(
                        `.nav-links a[href="#${e.target.id}"]`
                    );

                if (link) {
                    link.style.color =
                        'var(--teal)';
                }

            }

        });

    }, { threshold: 0.4 });


sections.forEach(s =>
    navObserver.observe(s)
);


// ============================================================
// CONTADOR DEL HERO
// ============================================================

function animateCount(el, target) {

    let start = 0;
    const duration = 1600;

    const step = timestamp => {

        if (!start) {
            start = timestamp;
        }

        const p =
            Math.min(
                (timestamp - start) / duration,
                1
            );

        const val =
            Math.floor(p * target);

        el.textContent =
            (target >= 100 ? '+' : '') +
            val +
            (el.dataset.suffix || '');

        if (p < 1) {

            requestAnimationFrame(step);

        } else {

            el.textContent =
                (target >= 100 ? '+' : '') +
                target +
                (el.dataset.suffix || '');

        }

    };

    requestAnimationFrame(step);
}


const statsObserver =
    new IntersectionObserver(entries => {

        entries.forEach(e => {

            if (e.isIntersecting) {

                document
                    .querySelectorAll('.stat strong')
                    .forEach((el, i) => {

                        const targets = [
                            120,
                            12,
                            8
                        ];

                        const suffixes = [
                            '',
                            '',
                            'k+'
                        ];

                        el.dataset.suffix =
                            suffixes[i];

                        animateCount(
                            el,
                            targets[i]
                        );

                    });

                statsObserver.disconnect();
            }

        });

    }, { threshold: 0.5 });


const statsSection =
    document.querySelector('.hero-stats');

if (statsSection) {
    statsObserver.observe(statsSection);
}
