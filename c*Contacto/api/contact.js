import { Resend } from "resend";

const resend =
    new Resend(
        process.env.RESEND_API_KEY
    );


function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


export default async function handler(
    req,
    res
) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            error: "Método no permitido."
        });

    }


    try {

        const datos =
            req.body || {};


        const nombre =
            String(
                datos.nombre || ""
            ).trim();


        const telefono =
            String(
                datos.telefono || ""
            ).trim();


        const email =
            String(
                datos.email || ""
            ).trim();


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


        const html = `

            <div style="
                font-family:Arial,sans-serif;
                max-width:650px;
                margin:auto;
                color:#222;
            ">

                <h1 style="
                    color:#1B3A8A;
                    margin-bottom:25px;
                ">
                    Nuevo contacto
                    - Consumo Placer
                </h1>


                <div style="
                    background:#f5f7fa;
                    padding:20px;
                    border-radius:12px;
                ">

                    <p>
                        <strong>Nombre:</strong>
                        ${escapeHtml(nombre)}
                    </p>


                    <p>
                        <strong>Teléfono:</strong>
                        ${escapeHtml(telefono)}
                    </p>


                    <p>
                        <strong>Email:</strong>
                        ${escapeHtml(email)}
                    </p>

                    ${
                        datos.asunto
                            ? `
                                <p>
                                    <strong>Asunto:</strong>
                                    ${escapeHtml(datos.asunto)}
                                </p>
                            `
                            : ""
                    }


                    ${
                        datos.mensaje
                            ? `
                                <p>
                                    <strong>Mensaje:</strong>
                                </p>

                                <div style="
                                    background:white;
                                    padding:15px;
                                    border-radius:8px;
                                    white-space:pre-wrap;
                                ">
                                    ${escapeHtml(
                                        datos.mensaje
                                    )}
                                </div>
                            `
                            : ""
                    }

                </div>


                <p style="
                    margin-top:25px;
                    color:#777;
                    font-size:13px;
                ">
                    Este mensaje ha sido enviado
                    desde el formulario de contacto
                    de Consumo Placer.
                </p>

            </div>

        `;


        const { data, error } =
            await resend.emails.send({

                from:
                    "Consumo Placer <contacto@consumoplacer.es>",

                to: [
                    "info@consumoplacer.es"
                ],

                replyTo: email,

                subject:
                    "Nuevo contacto - " +
                    nombre,

                html

            });


        if (error) {

            console.error(
                "Error Resend:",
                error
            );

            return res.status(500).json({

                success: false,

                error:
                    "No se ha podido enviar el correo."

            });

        }


        return res.status(200).json({

            success: true,

            id: data?.id || null

        });


    } catch (error) {

        console.error(
            "Error API contacto:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                "Error interno del servidor."

        });

    }

}
