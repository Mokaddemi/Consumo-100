// ============================================================
// INDEX.JS - CONSUMO PLACER
// ============================================================


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

    }, {
        threshold: 0.12
    });

    reveals.forEach(el => io.observe(el));

} else {

    reveals.forEach(el =>
        el.classList.add("visible")
    );
}


// ============================================================
// MENÚ MÓVIL
// ============================================================

(function () {

    const navEl = document.querySelector("nav");

    if (!navEl) return;

    const burger =
        navEl.querySelector(
            ".nav-hamburger, .nav-burger"
        );

    if (!burger) return;

    burger.addEventListener("click", () => {

        navEl.classList.toggle(
            "mobile-open"
        );

    });

    navEl
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navEl.classList.remove(
                    "mobile-open"
                );

            });

        });

})();


// ============================================================
// DATOS DE SOCIOS
// ============================================================
//
// IMPORTANTE:
//
// El index NO vuelve a crear una lista de comercios.
//
// Utilizamos la misma lista COMERCIOS que está en socios.js.
//
// Por eso:
//
// - no hay 12 comercios inventados
// - no hay etiquetas antiguas
// - el buscador utiliza los socios reales
// - las etiquetas utilizan comercio.tag
//
// socios.js debe cargarse ANTES que index.js.
// ============================================================

if (
    typeof COMERCIOS === "undefined"
) {

    console.error(
        "ERROR: socios.js debe cargarse antes que index.js."
    );

}


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
    document.getElementById(
        "homeSearchInput"
    );

const searchButton =
    document.getElementById(
        "homeSearchBtn"
    );

const searchResults =
    document.getElementById(
        "homeSearchResults"
    );

const searchBox =
    document.getElementById(
        "homeSearchBox"
    );


// ============================================================
// BUSCAR SOCIOS
// ============================================================

function buscarComercios(query) {

    if (
        typeof COMERCIOS === "undefined"
    ) {

        return [];
    }

    const q =
        normalizeStr(query).trim();

    if (!q) {

        return [];
    }

    return COMERCIOS.filter(
        comercio => {

            const texto =
                normalizeStr([

                    comercio.nombre,

                    comercio.categoria,

                    comercio.tag,

                    comercio.direccion,

                    comercio.telefono,

                    comercio.correo

                ].join(" "));

            return texto.includes(q);

        }
    );

}


// ============================================================
// OCULTAR RESULTADOS
// ============================================================

function ocultarResultados() {

    if (!searchResults) return;

    searchResults.innerHTML = "";

    searchResults.classList.remove(
        "show"
    );

}


// ============================================================
// MOSTRAR RESULTADOS
// ============================================================

function mostrarResultados(query) {

    if (!searchResults) return;

    const texto =
        String(query || "").trim();


    // --------------------------------------------------------
    // BUSCADOR VACÍO
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

        searchResults.classList.add(
            "show"
        );

        return;
    }


    // --------------------------------------------------------
    // RESULTADOS
    // --------------------------------------------------------

    searchResults.innerHTML =
        resultados
            .map(comercio => {

                /*
                 * IMPORTANTE:
                 *
                 * La etiqueta que mostramos es comercio.tag.
                 *
                 * NO usamos comercio.categoria
                 * como etiqueta.
                 *
                 * Así Amparo Borrás aparece como:
                 *
                 * Belleza
                 *
                 * y no como Moda.
                 */

                const tag =
                    comercio.tag || "";


                return `

                    <a
                        class="home-search-result"
                        href="/b*Socios/DIRECTORIO%20PREVIEW.htm"
                        data-comercio-id="${comercio.id}"
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
                                ${escapeHtml(
                                    comercio.nombre
                                )}
                            </strong>


                            <small>

                                ${escapeHtml(tag)}

                            </small>


                            <em>

                                ${escapeHtml(
                                    comercio.direccion
                                )}

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

            })
            .join("");


    // --------------------------------------------------------
    // VER TODOS
    // --------------------------------------------------------

    searchResults.innerHTML += `

        <a
            class="home-search-see-all"
            href="/b*Socios/DIRECTORIO%20PREVIEW.htm"
        >

            Ver todos los comercios →

        </a>

    `;


    searchResults.classList.add(
        "show"
    );

}


// ============================================================
// ESCRIBIR EN EL BUSCADOR
// ============================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            mostrarResultados(
                searchInput.value
            );

        }
    );


    // --------------------------------------------------------
    // TECLADO
    // --------------------------------------------------------

    searchInput.addEventListener(
        "keydown",
        event => {


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

        }
    );

}


// ============================================================
// BOTÓN BUSCAR
// ============================================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            if (!searchInput) return;

            mostrarResultados(
                searchInput.value
            );

        }
    );

}


// ============================================================
// CERRAR RESULTADOS AL HACER CLICK FUERA
// ============================================================

document.addEventListener(
    "click",
    event => {

        if (!searchResults) return;


        const clickDentroBuscador =
            searchBox &&
            searchBox.contains(
                event.target
            );


        const clickDentroResultados =
            searchResults.contains(
                event.target
            );


        if (
            !clickDentroBuscador &&
            !clickDentroResultados
        ) {

            ocultarResultados();

        }

    }
);


// ============================================================
// NAV ACTIVE
// ============================================================

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

const sections =
    document.querySelectorAll(
        "section[id]"
    );


if (
    "IntersectionObserver" in window &&
    sections.length
) {

    const navObserver =
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
        section => {

            navObserver.observe(
                section
            );

        }
    );

}


// ============================================================
// CONTADORES
// ============================================================

function animateCount(
    el,
    target
) {

    let start = 0;

    const duration = 1600;


    const step = timestamp => {

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


        el.textContent =
            (
                target >= 100
                    ? "+"
                    : ""
            ) +
            value +
            (
                el.dataset.suffix ||
                ""
            );


        if (progress < 1) {

            requestAnimationFrame(
                step
            );

        } else {

            el.textContent =
                (
                    target >= 100
                        ? "+"
                        : ""
                ) +
                target +
                (
                    el.dataset.suffix ||
                    ""
                );

        }

    };


    requestAnimationFrame(
        step
    );

}


// ============================================================
// OBSERVER DE CONTADORES
// ============================================================

const statsSection =
    document.querySelector(
        ".hero-stats"
    );


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        /*
                         * El primer contador puede mantenerse
                         * como cifra general de socios.
                         *
                         * El segundo contador utiliza ahora
                         * el número REAL de comercios.
                         */

                        const totalSocios =
                            typeof COMERCIOS !== "undefined"
                                ? COMERCIOS.length
                                : 0;


                        document
                            .querySelectorAll(
                                ".stat strong"
                            )
                            .forEach(
                                (el, index) => {

                                    const targets = [

                                        120,

                                        totalSocios,

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

                                }
                            );


                        statsObserver.disconnect();

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    statsObserver.observe(
        statsSection
    );

}
