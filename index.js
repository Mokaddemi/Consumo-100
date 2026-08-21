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


// ============================================================
// MENÚ MÓVIL
// ============================================================

(function () {

    const navEl = document.querySelector('nav');

    if (!navEl) return;

    const burger =
        navEl.querySelector('.nav-hamburger, .nav-burger');

    if (!burger) return;

    burger.addEventListener('click', () => {
        navEl.classList.toggle('mobile-open');
    });

    navEl.querySelectorAll('.nav-links a').forEach(link => {

        link.addEventListener('click', () => {
            navEl.classList.remove('mobile-open');
        });

    });

})();


// ============================================================
// BUSCADOR DEL INICIO
// ============================================================
//
// En Inicio ya NO mostramos:
// - categorías
// - chips
// - las 12 tarjetas
//
// Solo mostramos:
// - buscador
// - resultados desplegables
// - botón "Ver todos los comercios"
//
// Los comercios utilizados aquí son los socios reales
// que tenemos actualmente en los datos.
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
        emoji: "☁️"
    },

    {
        id: 2,
        nombre: "Viajes Sandratour",
        categoria: "Alimentación",
        tag: "Carnicería",
        direccion: "Calle calvario 21",
        telefono: "600 45 96 07",
        correo: "sandratourviajes@gmail.com",
        emoji: "🥩"
    },

    {
        id: 3,
        nombre: "Lavadero Rapiz Santomera",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/ Alfonso xlll N - 3",
        telefono: "968 86 57 72",
        correo: "villaescusaherrerosantiago@gmail.com",
        emoji: "👗"
    },

    {
        id: 4,
        nombre: "María Torres. Peluquería y estética",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Avenida maestro puyg Valera 22 Santomera Murcis",
        telefono: "968 86 01 23",
        correo: "mariatorrescanovas28@gmail.com",
        emoji: "💇"
    },

    {
        id: 5,
        nombre: "Lidia Pelu",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Calle los huertanos Bajo( Parque Manolo )",
        telefono: "678 56 15 65",
        correo: "Lidiapelu@hotmail.es",
        emoji: "💇"
    },

    {
        id: 6,
        nombre: "REGUERPC",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Tomas Y Valiente, 20",
        telefono: "606 84 78 75",
        correo: "info@reguerpc.com",
        emoji: "💻"
    },

    {
        id: 7,
        nombre: "Inmobiliaria Mundicasa",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/ Maestro Puig Valera n 12 bajo",
        telefono: "619 68 95 42",
        correo: "Info@mundicasa.com",
        emoji: "🏠"
    },

    {
        id: 8,
        nombre: "La despensa de Pedro bodega",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Avd Juan Carlos I N 51 bajo . Cp 30140 Santomera Murcia",
        telefono: "620 34 06 93",
        correo: "Salazonespedro@hotmail.com",
        emoji: "🍷"
    },

    {
        id: 9,
        nombre: "Diego Friclima s.l.",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/Gaudi 12. Santomera",
        telefono: "696 97 56 71",
        correo: "diegofriclima@gmail.com",
        emoji: "❄️"
    },

    {
        id: 10,
        nombre: "Lubespa Distribuciónes del Levante SL",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Carretera de Alicante 38",
        telefono: "620 84 31 35",
        correo: "Ventas@lubricantes-online.com",
        emoji: "🚚"
    },

    {
        id: 11,
        nombre: "Tamara Bellot Estilistas",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Calle Del Tomillo ,7 bajo",
        telefono: "689 53 51 10",
        correo: "tamaracostaja@gmail.com",
        emoji: "💇"
    },

    {
        id: 12,
        nombre: "LIBRERÍA CIRCULO",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "C/CALVARIO,26 BAJO SANTOMERA (MURCIA)",
        telefono: "968 86 12 72",
        correo: "libreriacirculosantomera@gmail.com",
        emoji: "📚"
    }

];


// ============================================================
// NORMALIZAR TEXTO
// ============================================================

function normalizeStr(texto) {

    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// ============================================================
// SEGURIDAD PARA HTML
// ============================================================

function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// BUSCAR COMERCIOS
// ============================================================

function buscarComercios(query) {

    const q = normalizeStr(query).trim();

    if (!q) {
        return [];
    }

    return COMERCIOS.filter(comercio => {

        const textoBusqueda = normalizeStr([
            comercio.nombre,
            comercio.categoria,
            comercio.tag,
            comercio.direccion
        ].join(" "));

        return textoBusqueda.includes(q);

    });

}


// ============================================================
// MOSTRAR RESULTADOS
// ============================================================

function renderHomeSearchResults(query) {

    const results =
        document.getElementById("homeSearchResults");

    if (!results) return;


    const q =
        normalizeStr(query).trim();


    // Si no hay búsqueda
    if (!q) {

        results.innerHTML = "";

        results.classList.remove("show");

        return;
    }


    // Buscar
    const encontrados =
        buscarComercios(query);


    // Sin resultados
    if (encontrados.length === 0) {

        results.innerHTML = `

            <div class="home-search-empty">

                <span class="home-search-empty-icon">
                    🔍
                </span>

                <span>
                    No hemos encontrado ningún comercio
                    para
                    <strong>
                        ${escapeHtml(query)}
                    </strong>
                </span>

            </div>

        `;

        results.classList.add("show");

        return;
    }


    // Mostrar resultados
    results.innerHTML = encontrados
        .slice(0, 8)
        .map(comercio => `

            <a
                class="home-search-result"
                href="./b*Socios/DIRECTORIO PREVIEW.htm"
            >

                <span class="home-search-result-icon">
                    ${comercio.emoji}
                </span>


                <span class="home-search-result-info">

                    <strong>
                        ${escapeHtml(comercio.nombre)}
                    </strong>

                    <small>
                        ${escapeHtml(comercio.categoria)}
                        ·
                        ${escapeHtml(comercio.tag)}
                    </small>

                    <em>
                        ${escapeHtml(comercio.direccion)}
                    </em>

                </span>


                <span class="home-search-result-arrow">
                    →
                </span>

            </a>

        `)
        .join("");


    // Enlace para ver todos
    results.innerHTML += `

        <a
            class="home-search-see-all"
            href="./b*Socios/DIRECTORIO PREVIEW.htm"
        >

            Ver todos los comercios →

        </a>

    `;


    results.classList.add("show");

}


// ============================================================
// INPUT DEL BUSCADOR
// ============================================================

const homeSearchInput =
    document.getElementById("homeSearchInput");


const homeSearchBtn =
    document.getElementById("homeSearchBtn");


// Escribir
if (homeSearchInput) {

    homeSearchInput.addEventListener(
        "input",
        () => {

            renderHomeSearchResults(
                homeSearchInput.value
            );

        }
    );


    // Enter
    homeSearchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                renderHomeSearchResults(
                    homeSearchInput.value
                );

            }


            // Escape
            if (event.key === "Escape") {

                homeSearchInput.value = "";

                renderHomeSearchResults("");

                homeSearchInput.blur();

            }

        }
    );

}


// Botón Buscar
if (homeSearchBtn && homeSearchInput) {

    homeSearchBtn.addEventListener(
        "click",
        () => {

            renderHomeSearchResults(
                homeSearchInput.value
            );

        }
    );

}


// ============================================================
// CERRAR RESULTADOS AL HACER CLICK FUERA
// ============================================================

document.addEventListener("click", event => {

    const searchArea =
        document.querySelector(".dir-search");

    const results =
        document.getElementById("homeSearchResults");

    if (!searchArea || !results) return;


    if (
        !searchArea.contains(event.target) &&
        !results.contains(event.target)
    ) {

        results.classList.remove("show");

    }

});


// ============================================================
// NAV ACTIVE LINK
// ============================================================

const navLinks =
    document.querySelectorAll(".nav-links a");


const sections =
    document.querySelectorAll("section[id]");


if ("IntersectionObserver" in window) {

    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(e => {

                    if (!e.isIntersecting) return;


                    navLinks.forEach(
                        link => link.style.color = ""
                    );


                    const link =
                        document.querySelector(
                            `.nav-links a[href="#${e.target.id}"]`
                        );


                    if (link) {

                        link.style.color =
                            "var(--teal)";

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    sections.forEach(section => {

        navObserver.observe(section);

    });

}


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


        const progress =
            Math.min(
                (timestamp - start) / duration,
                1
            );


        const value =
            Math.floor(progress * target);


        el.textContent =
            (target >= 100 ? "+" : "") +
            value +
            (el.dataset.suffix || "");


        if (progress < 1) {

            requestAnimationFrame(step);

        } else {

            el.textContent =
                (target >= 100 ? "+" : "") +
                target +
                (el.dataset.suffix || "");

        }

    };


    requestAnimationFrame(step);

}


const statsSection =
    document.querySelector(".hero-stats");


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    document
                        .querySelectorAll(".stat strong")
                        .forEach((el, i) => {

                            const targets = [
                                120,
                                12,
                                8
                            ];


                            const suffixes = [
                                "",
                                "",
                                "k+"
                            ];


                            el.dataset.suffix =
                                suffixes[i];


                            animateCount(
                                el,
                                targets[i]
                            );

                        });


                    statsObserver.disconnect();

                });

            },
            {
                threshold: 0.5
            }
        );


    statsObserver.observe(statsSection);

}
