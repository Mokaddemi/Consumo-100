/* =========================================================
   MENÚ MÓVIL
========================================================= */

(function () {

    const navEl = document.querySelector("nav");

    if (!navEl) return;

    const burger =
        navEl.querySelector(
            ".nav-hamburger, .nav-burger"
        );

    if (!burger) return;

    burger.addEventListener(
        "click",
        function () {

            navEl.classList.toggle(
                "mobile-open"
            );

        }
    );

    navEl
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    navEl.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });

})();


/* =========================================================
   RIPPLE
========================================================= */

const btn =
    document.getElementById("btnSend");

if (btn) {

    btn.addEventListener(
        "pointerdown",
        e => {

            const r =
                document.createElement("span");

            r.classList.add("ripple");

            const rect =
                btn.getBoundingClientRect();

            const s =
                Math.max(
                    btn.offsetWidth,
                    btn.offsetHeight
                );

            Object.assign(
                r.style,
                {
                    width: s + "px",
                    height: s + "px",
                    left:
                        (
                            e.clientX -
                            rect.left -
                            s / 2
                        ) + "px",
                    top:
                        (
                            e.clientY -
                            rect.top -
                            s / 2
                        ) + "px"
                }
            );

            btn.appendChild(r);

            setTimeout(
                () => r.remove(),
                600
            );

        }
    );

}


/* =========================================================
   FORMULARIO DE CONTACTO
========================================================= */

const form =
    document.getElementById(
        "contactForm"
    );

const success =
    document.getElementById(
        "formSuccess"
    );


if (form && btn) {

    form.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            let ok = true;


            /* -----------------------------------------------
               VALIDACIÓN
            ------------------------------------------------ */

            [
                "nombre",
                "telefono",
                "email"
            ].forEach(
                id => {

                    const el =
                        document.getElementById(
                            id
                        );

                    if (!el) return;


                    if (
                        !el.value.trim()
                    ) {

                        el.classList.add(
                            "err"
                        );

                        ok = false;


                        el.addEventListener(
                            "input",
                            () =>
                                el.classList.remove(
                                    "err"
                                ),
                            {
                                once: true
                            }
                        );

                    }

                }
            );


            /* -----------------------------------------------
               PRIVACIDAD
            ------------------------------------------------ */

            const priv =
                document.getElementById(
                    "privacy"
                );


            if (
                priv &&
                !priv.checked
            ) {

                priv.classList.add(
                    "err"
                );

                ok = false;


                priv.addEventListener(
                    "change",
                    () =>
                        priv.classList.remove(
                            "err"
                        ),
                    {
                        once: true
                    }
                );

            }


            if (!ok) return;


            /* -----------------------------------------------
               ESTADO DEL BOTÓN
            ------------------------------------------------ */

            btn.disabled = true;


            const btnText =
                btn.querySelector(
                    ".btn-send-text"
                );


            if (btnText) {

                btnText.textContent =
                    "enviando…";

            }


            try {

                /* -------------------------------------------
                   RECOGER TODOS LOS DATOS DEL FORMULARIO
                -------------------------------------------- */

                const formData =
                    new FormData(form);


                const datos = {};


                formData.forEach(
                    (value, key) => {

                        if (
                            value instanceof File
                        ) {

                            return;

                        }

                        datos[key] =
                            String(value);

                    }
                );


                /* -------------------------------------------
                   ENVIAR AL SERVIDOR
                -------------------------------------------- */

                const response =
                    await fetch(
                        "/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    datos
                                )
                        }
                    );


                const result =
                    await response
                        .json()
                        .catch(
                            () => ({})
                        );


                if (
                    !response.ok ||
                    !result.success
                ) {

                    throw new Error(
                        result.error ||
                        "No se pudo enviar el formulario."
                    );

                }


                /* -------------------------------------------
                   ÉXITO
                -------------------------------------------- */

                btn.style.display =
                    "none";


                if (success) {

                    success.classList.add(
                        "show"
                    );

                }


                form.reset();


            } catch (error) {

                console.error(
                    "Error enviando el formulario:",
                    error
                );


                alert(
                    "No hemos podido enviar el formulario. Por favor, inténtalo de nuevo."
                );


                btn.disabled = false;


                if (btnText) {

                    btnText.textContent =
                        "Enviar mensaje";

                }

            }

        }
    );

}
