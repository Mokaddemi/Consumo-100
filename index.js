// ============================================================
// SCROLL REVEAL
// ============================================================

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => io.observe(el));
} else {
    reveals.forEach(el => el.classList.add("visible"));
}


// ============================================================
// MENÚ MÓVIL
// ============================================================

(function () {
    const navEl = document.querySelector("nav");

    if (!navEl) return;

    const burger =
        navEl.querySelector(".nav-hamburger, .nav-burger");

    if (!burger) return;

    burger.addEventListener("click", () => {
        navEl.classList.toggle("mobile-open");
    });

    navEl.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navEl.classList.remove("mobile-open");
        });
    });
})();


// ============================================================
// SOCIOS
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
        direccion: "Avenida maestro puyg Valera 22 Santomera Murcia",
        telefono: "968 86 01 23",
        correo: "mariatorrescanovas28@gmail.com",
        emoji: "💇"
    },

    {
        id: 5,
        nombre: "Lidia Pelu",
        categoria: "Moda",
        tag: "Ropa & Accesorios",
        direccion: "Calle los huertanos Bajo (Parque Manolo)",
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
        direccion: "Avd Juan Carlos I N 51 bajo. Cp 30140 Santomera Murcia",
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
        direccion: "Calle Del Tomillo, 7 bajo",
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
// UTILIDADES
// ============================================================

function normalizeStr(value) {

    return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ============================================================
// ELEMENTOS DEL BUSCADOR
// ============================================================

const searchInput =
    document.getElementById("homeSearchInput");

const searchButton =
    document.getElementById("homeSearchBtn");

const searchResults =
    document.getElementById("homeSearchResults");

const searchBox =
    document.getElementById("homeSearchBox");


// ============================================================
// BUSCAR COMERCIOS
// ============================================================

function buscarComercios(query) {

    const q = normalizeStr(query).trim();

    if (!q) {
        return [];
    }

    return COMERCIOS.filter(comercio => {

        const texto = normalizeStr([
            comercio.nombre,
            comercio.categoria,
            comercio.tag,
            comercio.direccion
        ].join(" "));

        return texto.includes(q);
    });
}


// ============================================================
// OCULTAR RESULTADOS
// ============================================================

function ocultarResultados() {

    if (!searchResults) return;

    searchResults.innerHTML = "";

    searchResults.classList.remove("show");
}


// ============================================================
// MOSTRAR RESULTADOS
// ============================================================

function mostrarResultados(query) {

    if (!searchResults) return;

    const texto =
        String(query || "").trim();


    // --------------------------------------------------------
    // SI EL BUSCADOR ESTÁ VACÍO
    // --------------------------------------------------------

    if (!texto) {

        ocultarResultados();

        return;
    }


    // --------------------------------------------------------
    // BUSCAR
    // --------------------------------------------------------

    const resultados =
        buscarComercios(texto);


    // --------------------------------------------------------
    // SIN RESULTADOS
    // --------------------------------------------------------

    if (resultados.length === 0) {

        searchResults.innerHTML = `

            <div class="home-search-empty">

                <span>🔍</span>

                No hemos encontrado ningún comercio para

                <strong>
                    ${escapeHtml(texto)}
                </strong>.

            </div>

        `;

        searchResults.classList.add("show");

        return;
    }


    // --------------------------------------------------------
    // RESULTADOS
    // --------------------------------------------------------

    searchResults.innerHTML =
        resultados.map(comercio => {

            return `

                <a
                    class="home-search-result"
                    href="./b*Socios/DIRECTORIO PREVIEW.htm"
                    data-comercio-id="${comercio.id}"
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

            `;

        }).join("");


    // --------------------------------------------------------
    // VER TODOS
    // --------------------------------------------------------

    searchResults.innerHTML += `

        <a
            class="home-search-see-all"
            href="./b*Socios/DIRECTORIO PREVIEW.htm"
        >

            Ver todos los comercios →

        </a>

    `;


    searchResults.classList.add("show");
}


// ============================================================
// EVENTO: ESCRIBIR EN EL BUSCADOR
// ============================================================

if (searchInput) {

    searchInput.addEventListener("input", () => {

        mostrarResultados(
            searchInput.value
        );

    });


    // --------------------------------------------------------
    // TECLADO
    // --------------------------------------------------------

    searchInput.addEventListener("keydown", event => {


        // ENTER

        if (event.key === "Enter") {

            event.preventDefault();

            mostrarResultados(
                searchInput.value
            );

        }


        // ESCAPE

        if (event.key === "Escape") {

            searchInput.value = "";

            ocultarResultados();

            searchInput.blur();

        }

    });

}


// ============================================================
// EVENTO: BOTÓN BUSCAR
// ============================================================

if (searchButton) {

    searchButton.addEventListener("click", event => {

        event.preventDefault();

        if (!searchInput) return;

        mostrarResultados(
            searchInput.value
        );

    });

}


// ============================================================
// CERRAR RESULTADOS AL HACER CLICK FUERA
// ============================================================

document.addEventListener("click", event => {

    if (!searchResults) return;


    const clickDentroDelBuscador =
        searchBox &&
        searchBox.contains(event.target);


    const clickDentroResultados =
        searchResults.contains(event.target);


    if (
        !clickDentroDelBuscador &&
        !clickDentroResultados
    ) {

        ocultarResultados();

    }

});


// ============================================================
// NAV ACTIVE
// ============================================================

const navLinks =
    document.querySelectorAll(".nav-links a");

const sections =
    document.querySelectorAll("section[id]");


if (
    "IntersectionObserver" in window &&
    sections.length
) {

    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navLinks.forEach(link => {

                        link.style.color = "";

                    });


                    const link =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
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
// CONTADORES
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
            Math.floor(
                progress * target
            );


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


// ============================================================
// OBSERVER DE CONTADORES
// ============================================================

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
                        .forEach((el, index) => {

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


                            if (
                                index >=
                                targets.length
                            ) {
                                return;
                            }


                            el.dataset.suffix =
                                suffixes[index];


                            animateCount(
                                el,
                                targets[index]
                            );

                        });


                    statsObserver.disconnect();

                });

            },
            {
                threshold: 0.5
            }
        );


    statsObserver.observe(
        statsSection
    );

}
