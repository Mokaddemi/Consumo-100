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


        if (!reveals.length) {
            return;
        }


        if ("IntersectionObserver" in window) {

            const io =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(entry => {

                            if (
                                entry.isIntersecting
                            ) {

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
                element =>
                    io.observe(element)
            );


        } else {

            reveals.forEach(
                element =>
                    element.classList.add(
                        "visible"
                    )
            );

        }

    }


    // ========================================================
    // MENÚ MÓVIL
    // ========================================================

    function initMobileMenu() {

        const nav =
            document.querySelector("nav");


        if (!nav) {
            return;
        }


        const burger =
            nav.querySelector(
                ".nav-hamburger, .nav-burger"
            );


        if (!burger) {
            return;
        }


        burger.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "mobile-open"
                );

            }
        );


        nav
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open"
                        );

                    }
                );

            });

    }


    // ========================================================
    // CONSEGUIR LA LISTA REAL DE SOCIOS
    // ========================================================
    //
    // NO tenemos otra lista de comercios aquí.
    //
    // Usamos COMERCIOS de socios.js.
    //
    // Esperamos a DOMContentLoaded para dar tiempo a que
    // socios.js se haya cargado aunque aparezca después
    // de index.js en el HTML.
    // ========================================================

    function obtenerComercios() {

        if (
            typeof COMERCIOS !== "undefined" &&
            Array.isArray(COMERCIOS)
        ) {

            return COMERCIOS;

        }


        console.error(
            "No se ha encontrado COMERCIOS. Asegúrate de que socios.js está incluido en la página."
        );


        return [];

    }


    // ========================================================
    // BUSCADOR
    // ========================================================

    function initSearch() {

        const comercios =
            obtenerComercios();


        // ----------------------------------------------------
        // Aceptamos los nombres nuevos y también los antiguos
        // por si el HTML conserva alguna clase/ID anterior.
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // Comprobación
        // ----------------------------------------------------

        if (!searchInput) {

            console.warn(
                "No se ha encontrado el campo del buscador del Inicio."
            );

            return;

        }


        if (!searchResults) {

            console.warn(
                "No se ha encontrado el contenedor de resultados del buscador."
            );

            return;

        }


        // ====================================================
        // BUSCAR
        // ====================================================

        function buscar(query) {

            const q =
                normalizeStr(query).trim();


            if (!q) {
                return [];
            }


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


        // ====================================================
        // OCULTAR RESULTADOS
        // ====================================================

        function ocultar() {

            searchResults.innerHTML = "";

            searchResults.classList.remove(
                "show"
            );

            searchResults.style.display =
                "none";

        }


        // ====================================================
        // MOSTRAR RESULTADOS
        // ====================================================

        function mostrar(query) {

            const texto =
                String(query || "").trim();


            // Buscador vacío

            if (!texto) {

                ocultar();

                return;

            }


            const resultados =
                buscar(texto);


            // ------------------------------------------------
            // SIN RESULTADOS
            // ------------------------------------------------

            if (!resultados.length) {

                searchResults.innerHTML = `

                    <div class="home-search-empty">

                        <span class="home-search-empty-icon">
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


            // ------------------------------------------------
            // RESULTADOS
            // ------------------------------------------------

            let html = "";


            resultados.forEach(
                comercio => {

                    /*
                     * IMPORTANTE:
                     *
                     * La etiqueta visible SIEMPRE sale
                     * de comercio.tag.
                     *
                     * No usamos categoria.
                     *
                     * Por ejemplo:
                     *
                     * AMPARO BORRÁS -> Belleza
                     * Cortinas -> Hogar
                     * Viajes Sandratour -> Servicios
                     */

                    const tag =
                        comercio.tag || "";


                    const nombre =
                        escapeHtml(
                            comercio.nombre
                        );


                    const direccion =
                        escapeHtml(
                            comercio.direccion
                        );


                    html += `

                        <a
                            class="home-search-result"
                            href="/b*Socios/DIRECTORIO%20PREVIEW.htm"
                            data-comercio-id="${escapeHtml(comercio.id)}"
                        >

                            <span
                                class="home-search-result-icon"
                                aria-hidden="true"
                            >
                                ${comercio.emoji || ""}
                            </span>


                            <span
                                class="home-search-result-info"
                            >

                                <strong>
                                    ${nombre}
                                </strong>


                                <small>
                                    ${escapeHtml(tag)}
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


            // ------------------------------------------------
            // ENLACE A TODOS
            // ------------------------------------------------

            html += `

                <a
                    class="home-search-see-all"
                    href="/b*Socios/DIRECTORIO%20PREVIEW.htm"
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


        // ====================================================
        // INPUT
        // ====================================================

        searchInput.addEventListener(
            "input",
            function () {

                mostrar(
                    this.value
                );

            }
        );


        // ====================================================
        // ENTER
        // ====================================================

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    mostrar(
                        this.value
                    );

                }


                if (
                    event.key === "Escape"
                ) {

                    this.value = "";

                    ocultar();

                    this.blur();

                }

            }
        );


        // ====================================================
        // BOTÓN
        // ====================================================

        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    mostrar(
                        searchInput.value
                    );

                }
            );

        }


        // ====================================================
        // CLICK FUERA
        // ====================================================

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

                    ocultar();

                }

            }
        );


        // ====================================================
        // CLICK EN RESULTADO
        // ====================================================

        searchResults.addEventListener(
            "click",
            function () {

                /*
                 * No hacemos preventDefault.
                 *
                 * El enlace lleva directamente
                 * al directorio de Socios.
                 */

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


        if (
            !statsSection ||
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


                            /*
                             * Primer contador:
                             * mantenemos el número general
                             * que ya tenía la web.
                             *
                             * Segundo:
                             * número real de socios cargados.
                             *
                             * Tercero:
                             * mantenemos el dato original.
                             */

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
    // INICIAR TODO
    // ========================================================
    //
    // Esto es importante:
    //
    // Esperamos a que el documento esté cargado antes de
    // buscar COMERCIOS.
    //
    // Así socios.js tiene tiempo de cargar aunque aparezca
    // después de index.js.
    // ========================================================

    function init() {

        initScrollReveal();

        initMobileMenu();

        initSearch();

        initNavigation();

        initCounters();

    }


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
