// ============================================================
// INDEX.JS - CONSUMO PLACER
// ============================================================

(function () {

    "use strict";


    // ========================================================
    // FUNCIONES GENERALES
    // ========================================================

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


    // ========================================================
    // SCROLL REVEAL
    // ========================================================

    function initScrollReveal() {

        const reveals =
            document.querySelectorAll(".reveal");

        if (!reveals.length) return;

        if ("IntersectionObserver" in window) {

            const io =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(entry => {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                io.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );

            reveals.forEach(
                element => io.observe(element)
            );

        } else {

            reveals.forEach(
                element =>
                    element.classList.add("visible")
            );

        }

    }


    // ========================================================
    // MENÚ MÓVIL
    // ========================================================

    function initMobileMenu() {

        const nav =
            document.querySelector("nav");

        if (!nav) return;


        const burger =
            nav.querySelector(
                ".nav-hamburger, .nav-burger"
            );

        if (!burger) return;


        // Nos aseguramos de que el botón sea realmente
        // un botón y no intente enviar ningún formulario.
        burger.setAttribute(
            "type",
            "button"
        );


        // Evitar duplicar eventos.
        if (
            burger.dataset.menuInitialized === "true"
        ) {
            return;
        }

        burger.dataset.menuInitialized = "true";


        function toggleMenu(event) {

            if (event) {

                event.preventDefault();
                event.stopPropagation();

            }


            nav.classList.toggle(
                "mobile-open"
            );


            const abierto =
                nav.classList.contains(
                    "mobile-open"
                );


            burger.setAttribute(
                "aria-expanded",
                abierto
                    ? "true"
                    : "false"
            );

        }


        // Click normal
        burger.addEventListener(
            "click",
            toggleMenu
        );


        // Táctil en móvil
        burger.addEventListener(
            "pointerup",
            function (event) {

                if (
                    event.pointerType ===
                    "touch"
                ) {

                    event.preventDefault();
                    event.stopPropagation();

                    nav.classList.toggle(
                        "mobile-open"
                    );


                    const abierto =
                        nav.classList.contains(
                            "mobile-open"
                        );


                    burger.setAttribute(
                        "aria-expanded",
                        abierto
                            ? "true"
                            : "false"
                    );

                }

            },
            {
                passive: false
            }
        );


        // Cerrar al pulsar cualquier enlace
        nav
            .querySelectorAll(".nav-links a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    function () {

                        nav.classList.remove(
                            "mobile-open"
                        );


                        burger.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    // ========================================================
    // LISTA REAL DE SOCIOS
    // ========================================================

    function obtenerComercios() {

        if (
            typeof COMERCIOS !== "undefined" &&
            Array.isArray(COMERCIOS)
        ) {

            return COMERCIOS;

        }

        console.error(
            "No se ha encontrado COMERCIOS. socios.js debe cargarse antes que index.js."
        );

        return [];

    }


    // ========================================================
    // BUSCADOR
    // ========================================================

    function initSearch() {

        const searchInput =
            document.getElementById(
                "homeSearchInput"
            ) ||
            document.getElementById(
                "searchInput"
            ) ||
            document.querySelector(
                ".dir-search input"
            ) ||
            document.querySelector(
                ".search-wrap input"
            );


        const searchButton =
            document.getElementById(
                "homeSearchBtn"
            ) ||
            document.getElementById(
                "searchBtn"
            ) ||
            document.querySelector(
                ".dir-search button"
            ) ||
            document.querySelector(
                ".search-wrap button"
            );


        const searchResults =
            document.getElementById(
                "homeSearchResults"
            ) ||
            document.getElementById(
                "searchResults"
            );


        const searchBox =
            document.getElementById(
                "homeSearchBox"
            ) ||
            document.querySelector(
                ".dir-search"
            ) ||
            document.querySelector(
                ".search-wrap"
            );


        if (!searchInput) {

            console.warn(
                "No se ha encontrado el buscador."
            );

            return;

        }


        if (!searchResults) {

            console.warn(
                "No se ha encontrado el contenedor de resultados."
            );

            return;

        }


        function buscar(query) {

            const q =
                normalizeStr(query).trim();


            if (!q) {

                return [];

            }


            const comercios =
                obtenerComercios();


            return comercios.filter(
                comercio => {

                    const datos = [

                        comercio.nombre,

                        comercio.tag,

                        comercio.categoria,

                        comercio.direccion,

                        comercio.telefono,

                        comercio.correo

                    ];


                    const texto =
                        normalizeStr(
                            datos.join(" ")
                        );


                    return texto.includes(q);

                }
            );

        }


        function ocultarResultados() {

            searchResults.innerHTML = "";

            searchResults.classList.remove(
                "show"
            );

            searchResults.style.display =
                "none";

        }


        function mostrarResultados(query) {

            const texto =
                String(query || "").trim();


            if (!texto) {

                ocultarResultados();

                return;

            }


            const resultados =
                buscar(texto);


            if (!resultados.length) {

                searchResults.innerHTML = `

                    <div class="home-search-empty">

                        <span
                            class="home-search-empty-icon"
                        >
                            🔍
                        </span>

                        <div>

                            No hemos encontrado ningún comercio para

                            <strong>
                                ${escapeHtml(texto)}
                            </strong>.

                        </div>

                    </div>

                `;


                searchResults.classList.add(
                    "show"
                );

                searchResults.style.display =
                    "block";

                return;

            }


            let html = "";


            resultados.forEach(
                comercio => {

                    const nombre =
                        escapeHtml(
                            comercio.nombre
                        );


                    const tag =
                        escapeHtml(
                            comercio.tag || ""
                        );


                    const direccion =
                        escapeHtml(
                            comercio.direccion || ""
                        );


                    const emoji =
                        comercio.emoji || "";


                    html += `

                        <a
                            class="home-search-result"
                            href="./b*Socios/DIRECTORIO%20PREVIEW.htm"
                            data-comercio-id="${escapeHtml(comercio.id)}"
                        >

                            <span
                                class="home-search-result-icon"
                                aria-hidden="true"
                            >
                                ${emoji}
                            </span>


                            <span
                                class="home-search-result-info"
                            >

                                <strong>
                                    ${nombre}
                                </strong>


                                <small>
                                    ${tag}
                                </small>


                                <em>
                                    ${direccion}
                                </em>

                            </span>


                            <span
                                class="home-search-result-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>

                        </a>

                    `;

                }
            );


            html += `

                <a
                    class="home-search-see-all"
                    href="./b*Socios/DIRECTORIO%20PREVIEW.htm"
                >
                    Ver todos los comercios →
                </a>

            `;


            searchResults.innerHTML =
                html;


            searchResults.classList.add(
                "show"
            );

            searchResults.style.display =
                "block";

        }


        searchInput.addEventListener(
            "input",
            function () {

                mostrarResultados(
                    this.value
                );

            }
        );


        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    mostrarResultados(
                        this.value
                    );

                }


                if (
                    event.key === "Escape"
                ) {

                    this.value = "";

                    ocultarResultados();

                    this.blur();

                }

            }
        );


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    mostrarResultados(
                        searchInput.value
                    );

                }
            );

        }


        document.addEventListener(
            "click",
            function (event) {

                const dentroBuscador =
                    searchBox &&
                    searchBox.contains(
                        event.target
                    );


                const dentroResultados =
                    searchResults.contains(
                        event.target
                    );


                if (
                    !dentroBuscador &&
                    !dentroResultados
                ) {

                    ocultarResultados();

                }

            }
        );

    }


    // ========================================================
    // NAVEGACIÓN ACTIVA
    // ========================================================

    function initNavigation() {

        const navLinks =
            document.querySelectorAll(
                ".nav-links a"
            );


        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        if (
            !sections.length ||
            !("IntersectionObserver" in window)
        ) {

            return;

        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            navLinks.forEach(
                                link => {

                                    link.style.color =
                                        "";

                                }
                            );


                            const link =
                                document.querySelector(
                                    `.nav-links a[href="#${entry.target.id}"]`
                                );


                            if (link) {

                                link.style.color =
                                    "var(--teal)";

                            }

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        sections.forEach(
            section =>
                observer.observe(section)
        );

    }


    // ========================================================
    // CONTADORES
    // ========================================================

    function animateCount(
        element,
        target
    ) {

        let start = null;

        const duration = 1600;


        function step(timestamp) {

            if (!start) {

                start = timestamp;

            }


            const progress =
                Math.min(
                    (timestamp - start) /
                        duration,
                    1
                );


            const value =
                Math.floor(
                    progress * target
                );


            const prefix =
                target >= 100
                    ? "+"
                    : "";


            element.textContent =
                prefix +
                value +
                (
                    element.dataset.suffix ||
                    ""
                );


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    step
                );

            } else {

                element.textContent =
                    prefix +
                    target +
                    (
                        element.dataset.suffix ||
                        ""
                    );

            }

        }


        requestAnimationFrame(
            step
        );

    }


    function initCounters() {

        const statsSection =
            document.querySelector(
                ".hero-stats"
            );


        if (!statsSection) {

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            return;

        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const comercios =
                                obtenerComercios();


                            const targets = [

                                120,

                                comercios.length,

                                8

                            ];


                            const suffixes = [

                                "",

                                "",

                                "k+"

                            ];


                            document
                                .querySelectorAll(
                                    ".stat strong"
                                )
                                .forEach(
                                    (
                                        element,
                                        index
                                    ) => {

                                        if (
                                            index >=
                                            targets.length
                                        ) {

                                            return;

                                        }


                                        element.dataset.suffix =
                                            suffixes[index];


                                        animateCount(
                                            element,
                                            targets[index]
                                        );

                                    }
                                );


                            observer.disconnect();

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        observer.observe(
            statsSection
        );

    }


    // ========================================================
    // INICIAR
    // ========================================================

    function init() {

        initScrollReveal();

        initMobileMenu();

        initSearch();

        initNavigation();

        initCounters();

    }


    // ========================================================
    // ARRANQUE
    // ========================================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
