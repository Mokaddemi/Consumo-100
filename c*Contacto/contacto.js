/* =========================================================
   API CONTACT
   Consumo Placer
   Vercel + Resend
========================================================= */


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   API
========================================================= */

export default async function handler(req, res) {


    /* =====================================================
       SOLO POST
    ===================================================== */

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false,

            error:
                "Método no permitido."

        });

    }


    try {


        /* =================================================
           COMPROBAR API KEY
        ================================================= */

        const apiKey =
            process.env.RESEND_API_KEY;


        if (!apiKey) {

            console.error(
                "Falta RESEND_API_KEY en Vercel."
            );


            return res.status(500).json({

                success: false,

                error:
                    "El servicio de correo no está configurado."

            });

        }


        /* =================================================
           DATOS RECIBIDOS
        ================================================= */

        const body =
            req.body || {};


        const nombre =
            String(
                body.nombre || ""
            ).trim();


        const telefono =
            String(
                body.telefono || ""
            ).trim();


        const email =
            String(
                body.email || ""
            ).trim();


        const asunto =
            String(
                body.asunto || ""
            ).trim();


        const mensaje =
            String(
                body.mensaje || ""
            ).trim();


        /* =================================================
           VALIDACIÓN
        ================================================= */

        if (
            !nombre ||
            !telefono ||
            !email
        ) {

            return res.status(400).json({

                success: false,

                error:
                    "Faltan datos obligatorios."

            });

        }


        /* =================================================
           VALIDACIÓN BÁSICA DEL EMAIL
        ================================================= */

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email);


        if (!emailValido) {

            return res.status(400).json({

                success: false,

                error:
                    "El correo electrónico no es válido."

            });

        }


        /* =================================================
           HTML DEL CORREO
        ================================================= */

        const html = `

<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Nuevo contacto - Consumo Placer
    </title>

</head>


<body style="
    margin:0;
    padding:0;
    background:#f5f2e9;
    font-family:Arial,Helvetica,sans-serif;
    color:#203a38;
">

    <div style="
        max-width:650px;
        margin:40px auto;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
        box-shadow:0 8px 30px rgba(0,0,0,0.08);
    ">


        <!-- CABECERA -->

        <div style="
            background:#0c807e;
            padding:28px 30px;
            color:#ffffff;
        ">

            <h1 style="
                margin:0;
                font-size:26px;
            ">
                Nuevo contacto
            </h1>


            <p style="
                margin:8px 0 0;
                font-size:15px;
                opacity:.9;
            ">
                Consumo Placer
            </p>

        </div>


        <!-- CONTENIDO -->

        <div style="
            padding:30px;
        ">


            <h2 style="
                margin-top:0;
                color:#203a38;
                font-size:21px;
            ">
                Datos del contacto
            </h2>


            <div style="
                border:1px solid #e6e6e6;
                border-radius:12px;
                overflow:hidden;
            ">


                <div style="
                    padding:15px;
                    border-bottom:1px solid #e6e6e6;
                ">

                    <strong>
                        Nombre
                    </strong>

                    <br>

                    ${escapeHtml(nombre)}

                </div>


                <div style="
                    padding:15px;
                    border-bottom:1px solid #e6e6e6;
                ">

                    <strong>
                        Teléfono
                    </strong>

                    <br>

                    ${escapeHtml(telefono)}

                </div>


                <div style="
                    padding:15px;
                    border-bottom:1px solid #e6e6e6;
                ">

                    <strong>
                        Email
                    </strong>

                    <br>

                    <a
                        href="mailto:${escapeHtml(email)}"
                        style="
                            color:#0c807e;
                        "
                    >
                        ${escapeHtml(email)}
                    </a>

                </div>


                ${
                    asunto
                        ? `

                            <div style="
                                padding:15px;
                                border-bottom:1px solid #e6e6e6;
                            ">

                                <strong>
                                    Asunto
                                </strong>

                                <br>

                                ${escapeHtml(asunto)}

                            </div>

                        `
                        : ""
                }


            </div>


            ${
                mensaje
                    ? `

                        <h2 style="
                            margin-top:30px;
                            color:#203a38;
                            font-size:21px;
                        ">
                            Mensaje
                        </h2>


                        <div style="
                            background:#f7f7f4;
                            border-radius:12px;
                            padding:20px;
                            white-space:pre-wrap;
                            line-height:1.6;
                        ">
                            ${escapeHtml(mensaje)}
                        </div>

                    `
                    : ""
            }


            <div style="
                margin-top:30px;
                padding-top:20px;
                border-top:1px solid #eeeeee;
                color:#777777;
                font-size:13px;
            ">

                Este mensaje ha sido enviado
                desde el formulario de contacto
                de Consumo Placer.

            </div>


        </div>

    </div>

</body>

</html>

`;


        /* =================================================
           ENVIAR A RESEND
        ================================================= */

        const resendResponse =
            await fetch(
                "https://api.resend.com/emails",
                {

                    method: "POST",

                    headers: {

                        "Authorization":
                            `Bearer ${apiKey}`,

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            from:
                                "Consumo Placer <contacto@consumoplacer.es>",

                            to: [
                                "info@limonlab.es"
                            ],

                            reply_to:
                                email,

                            subject:
                                asunto
                                    ? `Nuevo contacto - ${asunto}`
                                    : `Nuevo contacto - ${nombre}`,

                            html:
                                html

                        })

                }
            );


        /* =================================================
           RESPUESTA RESEND
        ================================================= */

        const resendData =
            await resendResponse
                .json()
                .catch(
                    function () {
                        return {};
                    }
                );


        if (!resendResponse.ok) {

            console.error(
                "Error de Resend:",
                resendData
            );


            return res.status(500).json({

                success: false,

                error:
                    "No se ha podido enviar el correo."

            });

        }


        /* =================================================
           TODO CORRECTO
        ================================================= */

        return res.status(200).json({

            success: true,

            message:
                "Correo enviado correctamente.",

            id:
                resendData.id || null

        });


    } catch (error) {


        console.error(
            "Error interno:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                "Se ha producido un error al enviar el formulario."

        });

    }

}
