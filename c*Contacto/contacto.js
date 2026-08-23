/* =========================================================
   CONTACTO - CONSUMO PLACER
   EmailJS
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       CONFIGURACIÓN EMAILJS
    ===================================================== */

    const EMAILJS_PUBLIC_KEY = "P3BFxoTsF-3JRuSBN";

    const EMAILJS_SERVICE_ID = "service_cq2gbua";

    const EMAILJS_TEMPLATE_ID = "template_zb3i3ht";


    /* =====================================================
       INICIALIZAR EMAILJS
    ===================================================== */

    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    } else {

        console.error(
            "EmailJS no se ha cargado correctamente."
        );

    }


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const navEl = document.querySelector("nav");

    if (navEl) {

        const burger =
            navEl.querySelector(
                ".nav-hamburger, .nav-burger"
            );

        if (burger) {

            burger.addEventListener("click", function () {

                const isOpen =
                    navEl.classList.toggle("mobile-open");

                burger.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            });


            navEl
                .querySelectorAll(".nav-links a")
                .forEach(function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navEl.classList.remove(
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

    }


    /* =====================================================
       ELEMENTOS DEL FORMULARIO
    ===================================================== */

    const form =
        document.getElementById("contactForm");

    const btn =
        document.getElementById("btnSend");

    const success =
        document.getElementById("formSuccess");


    if (!form || !btn) {

        console.warn(
            "No se encontró el formulario de contacto."
        );

        return;

    }


    /* =====================================================
       CAMPOS
    ===================================================== */

    const nombre =
        document.getElementById("nombre");

    const apellidos =
        document.getElementById("apellidos");

    const telefono =
        document.getElementById("telefono");

    const email =
        document.getElementById("email");

    const mensaje =
        document.getElementById("mensaje");

    const privacy =
        document.getElementById("privacy");


    /* =====================================================
       CAMPOS OCULTOS PARA EMAILJS
    ===================================================== */

    const emailjsName =
        document.getElementById("emailjsName");

    const emailjsMessage =
        document.getElementById("emailjsMessage");

    const emailjsAsunto =
        document.getElementById("emailjsAsunto");


    /* =====================================================
       RIPPLE DEL BOTÓN
    ===================================================== */

    btn.addEventListener(
        "pointerdown",
        function (e) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                btn.getBoundingClientRect();

            const size =
                Math.max(
                    btn.offsetWidth,
                    btn.offsetHeight
                );

            Object.assign(
                ripple.style,
                {
                    width: size + "px",
                    height: size + "px",

                    left:
                        (
                            e.clientX -
                            rect.left -
                            size / 2
                        ) + "px",

                    top:
                        (
                            e.clientY -
                            rect.top -
                            size / 2
                        ) + "px"
                }
            );

            btn.appendChild(ripple);

            setTimeout(
                function () {
                    ripple.remove();
                },
                600
            );

        }
    );


    /* =====================================================
       QUITAR ERROR DE UN CAMPO
    ===================================================== */

    function clearError(element) {

        if (!element) {
            return;
        }

        element.classList.remove("err");

    }


    /* =====================================================
       MOSTRAR ERROR
    ===================================================== */

    function showError(element) {

        if (!element) {
            return;
        }

        element.classList.add("err");

    }


    /* =====================================================
       VALIDAR EMAIL
    ===================================================== */

    function isValidEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value
        );

    }


    /* =====================================================
       VALIDACIÓN
    ===================================================== */

    function validateForm() {

        let valid = true;


        /* Nombre */

        if (
            !nombre ||
            !nombre.value.trim()
        ) {

            showError(nombre);

            valid = false;

        } else {

            clearError(nombre);

        }


        /* Teléfono */

        if (
            !telefono ||
            !telefono.value.trim()
        ) {

            showError(telefono);

            valid = false;

        } else {

            clearError(telefono);

        }


        /* Email */

        if (
            !email ||
            !email.value.trim()
        ) {

            showError(email);

            valid = false;

        } else if (
            !isValidEmail(
                email.value.trim()
            )
        ) {

            showError(email);

            valid = false;

        } else {

            clearError(email);

        }


        /* Privacidad */

        if (
            !privacy ||
            !privacy.checked
        ) {

            showError(privacy);

            valid = false;

        } else {

            clearError(privacy);

        }


        return valid;

    }


    /* =====================================================
       QUITAR ERRORES AL ESCRIBIR
    ===================================================== */

    if (nombre) {

        nombre.addEventListener(
            "input",
            function () {
                clearError(nombre);
            }
        );

    }


    if (telefono) {

        telefono.addEventListener(
            "input",
            function () {
                clearError(telefono);
            }
        );

    }


    if (email) {

        email.addEventListener(
            "input",
            function () {
                clearError(email);
            }
        );

    }


    if (privacy) {

        privacy.addEventListener(
            "change",
            function () {
                clearError(privacy);
            }
        );

    }


    /* =====================================================
       ENVIAR FORMULARIO
    ===================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Validar */

            if (!validateForm()) {
                return;
            }


            /* Comprobar EmailJS */

            if (
                typeof emailjs === "undefined"
            ) {

                console.error(
                    "EmailJS no está disponible."
                );

                alert(
                    "No se ha podido conectar con el servicio de correo. Inténtalo de nuevo."
                );

                return;

            }


            /* =============================================
               PREPARAR DATOS PARA LA PLANTILLA
            ============================================= */

            if (emailjsName) {

                emailjsName.value =
                    nombre
                        ? nombre.value.trim()
                        : "";

            }


            if (emailjsMessage) {

                emailjsMessage.value =
                    mensaje
                        ? mensaje.value.trim()
                        : "";

            }


            if (emailjsAsunto) {

                emailjsAsunto.value =
                    "Nuevo contacto desde Consumo Placer";

            }


            /* =============================================
               ESTADO: ENVIANDO
            ============================================= */

            btn.disabled = true;

            btn.classList.add("sending");

            const btnText =
                btn.querySelector(
                    ".btn-send-text"
                );

            if (btnText) {

                btnText.textContent =
                    "enviando…";

            }


            /* =============================================
               ENVIAR CON EMAILJS
            ============================================= */

            emailjs
                .sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    form
                )

                .then(
                    function (response) {

                        console.log(
                            "Correo enviado correctamente:",
                            response
                        );


                        /* Ocultar botón */

                        btn.style.display =
                            "none";


                        /* Mostrar éxito */

                        if (success) {

                            success.classList.add(
                                "show"
                            );

                        }


                        /* Limpiar formulario */

                        form.reset();


                        /* Limpiar campos ocultos */

                        if (emailjsName) {
                            emailjsName.value = "";
                        }

                        if (emailjsMessage) {
                            emailjsMessage.value = "";
                        }

                        if (emailjsAsunto) {
                            emailjsAsunto.value =
                                "Nuevo contacto desde Consumo Placer";
                        }

                    },

                    function (error) {

                        console.error(
                            "Error de EmailJS:",
                            error
                        );


                        /* Restaurar botón */

                        btn.disabled = false;

                        btn.classList.remove(
                            "sending"
                        );

                        btn.style.display =
                            "";


                        if (btnText) {

                            btnText.textContent =
                                "enviar";

                        }


                        /* Mensaje */

                        alert(
                            "No se ha podido enviar el mensaje. Por favor, inténtalo de nuevo."
                        );

                    }
                );

        }
    );

})();
