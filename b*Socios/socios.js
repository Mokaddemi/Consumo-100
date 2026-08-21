// ============================================================
// SOCIOS.JS
// Directorio de comercios - Consumo Placer
// ============================================================

(function () {
    const navEl = document.querySelector('nav');

    if (!navEl) return;

    const burger = navEl.querySelector('.nav-hamburger, .nav-burger');

    if (burger) {
        burger.addEventListener('click', () => {
            navEl.classList.toggle('mobile-open');
        });

        navEl.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navEl.classList.remove('mobile-open');
            });
        });
    }
})();


// ============================================================
// DATOS DE LOS COMERCIOS
// ============================================================

const COMERCIOS = [
    {
        id: 1,
        nombre: "Limonlab",
        categoria: "Marketing",
        direccion: "Calle Familia Sanchez Muñoz 29",
        telefono: "644 65 57 99",
        correo: "info@limonlab.es",
        abreM: "09:00",
        cierraM: "21:30",
        abreT: "null",
        cierraT: "null",
        tag: "Agencia"
    },

    {
        id: 2,
        nombre: "Viajes Sandratour",
        categoria: "Alimentación",
        direccion: "Calle calvario 21",
        telefono: "600 45 96 07",
        correo: "sandratourviajes@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:30",
        cierraT: "19:00",
        tag: "Carnicería"
    },

    {
        id: 3,
        nombre: "Lavadero Rapiz Santomera",
        categoria: "Moda",
        direccion: "C/ Alfonso xlll N - 3",
        telefono: "968 86 57 72",
        correo: "villaescusaherrerosantiago@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:30",
        cierraT: "19:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 4,
        nombre: "María Torres. Peluquería y estética",
        categoria: "Moda",
        direccion: "Avenida maestro puyg Valera 22 Santomera Murcis",
        telefono: "968 86 01 23",
        correo: "mariatorrescanovas28@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "16:30",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 5,
        nombre: "Lidia Pelu",
        categoria: "Moda",
        direccion: "Calle los huertanos Bajo( Parque Manolo )",
        telefono: "678 56 15 65",
        correo: "Lidiapelu@hotmail.es",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "16:30",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 6,
        nombre: "REGUERPC",
        categoria: "Moda",
        direccion: "Tomas Y Valiente, 20",
        telefono: "606 84 78 75",
        correo: "info@reguerpc.com",
        abreM: "10:00",
        cierraM: "20:30",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 7,
        nombre: "Inmobiliaria Mundicasa",
        categoria: "Moda",
        direccion: "C/ Maestro Puig Valera n 12 bajo",
        telefono: "619 68 95 42",
        correo: "Info@mundicasa.com",
        abreM: "10:30",
        cierraM: "14:00",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 8,
        nombre: "La despensa de Pedro bodega",
        categoria: "Moda",
        direccion: "Avd Juan Carlos I N 51 bajo . Cp 30140 Santomera Murcia",
        telefono: "620 34 06 93",
        correo: "Salazonespedro@hotmail.com",
        abreM: "07:30",
        cierraM: "19:00",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 9,
        nombre: "Diego Friclima s.l.",
        categoria: "Moda",
        direccion: "C/Gaudi 12. Santomera",
        telefono: "696 97 56 71",
        correo: "diegofriclima@gmail.com",
        abreM: "08:00",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "18:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 10,
        nombre: "Lubespa Distribuciónes del Levante SL",
        categoria: "Moda",
        direccion: "Carretera de Alicante 38",
        telefono: "620 84 31 35",
        correo: "Ventas@lubricantes-online.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 11,
        nombre: "Tamara Bellot Estilistas",
        categoria: "Moda",
        direccion: "Calle Del Tomillo ,7 bajo",
        telefono: "689 53 51 10",
        correo: "tamaracostaja@gmail.com",
        abreM: "null",
        cierraM: "null",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 12,
        nombre: "LIBRERÍA CIRCULO",
        categoria: "Moda",
        direccion: "C/CALVARIO,26 BAJO SANTOMERA (MURCIA)",
        telefono: "968 86 12 72",
        correo: "libreriacirculosantomera@gmail.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "16:30",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 13,
        nombre: "FCO.ALCARAZ TOMAS E HIJOS(OPEL SANTOMERA)",
        categoria: "Moda",
        direccion: "CTRA MURCIA -ALICANTE,37",
        telefono: "679 99 39 30",
        correo: "opelsantom@hotmail.com",
        abreM: "08:30",
        cierraM: "14:00",
        abreT: "16:30",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 14,
        nombre: "D'Mia Collection Passione",
        categoria: "Moda",
        direccion: "Avenida Juan Carlos I, 36 bajo C",
        telefono: "968 30 98 05",
        correo: "estacion@alhamaes.com",
        abreM: "10:00",
        cierraM: "14:00",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 15,
        nombre: "Estación de Servicio Alhama",
        categoria: "Moda",
        direccion: "Crt. Abanilla Km 6. 30140 Santomera.",
        telefono: "620 30 41 75",
        correo: "dmiatienda@gmail.com",
        abreM: "10:00",
        cierraM: "14:30",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 16,
        nombre: "Esthilinea",
        categoria: "Moda",
        direccion: "calle la mina 35",
        telefono: "629 53 77 66",
        correo: "esthilinea@gmail.com",
        abreM: "09:30",
        cierraM: "20:00",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 17,
        nombre: "NEO Peluqueros",
        categoria: "Moda",
        direccion: "C/ Severo Ochoa, 3 Bajoa",
        telefono: "968 86 22 75",
        correo: "neopeluqueros@gmail.com",
        abreM: "09:30",
        cierraM: "13:00",
        abreT: "16:30",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 18,
        nombre: "AUTOMATICOS JERONIMO, SL",
        categoria: "Moda",
        direccion: "CALLE MAESTRO FALLA,6, SANTOMERA",
        telefono: "649 88 61 22",
        correo: "jeronimo@automaticosjeronimo.es",
        abreM: "null",
        cierraM: "null",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 19,
        nombre: "Moda y Complementos ISALA",
        categoria: "Moda",
        direccion: "C/Jose Espinosa,9,Santomera",
        telefono: "630 79 12 33",
        correo: "maribel.micm@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 20,
        nombre: "Encarna Ortíz Estética Integral",
        categoria: "Moda",
        direccion: "Picasso 17",
        telefono: "609 52 83 88",
        correo: "encarnaesteticaintegral@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "15:30",
        cierraT: "21:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 21,
        nombre: "Cortinas el Metro",
        categoria: "Moda",
        direccion: "Calle Maestro Puig Valera 64",
        telefono: "968 86 06 60",
        correo: "Info@cortinaselmetro.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 22,
        nombre: "optica davinci",
        categoria: "Moda",
        direccion: "calle san leon, 32",
        telefono: "665 18 30 45",
        correo: "santomera@davinciopticas.es",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 23,
        nombre: "Amarillo Limón Mercería y Lencería",
        categoria: "Moda",
        direccion: "Calle San León 36C Santomera Murcia",
        telefono: "684 30 06 68",
        correo: "merceamarillolimon@gmail.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 24,
        nombre: "Carnicería Baca",
        categoria: "Moda",
        direccion: "Calle maestros s/n",
        telefono: "646 57 25 81",
        correo: "castellozapatamar@gmail.com",
        abreM: "08:00",
        cierraM: "14:00",
        abreT: "null",
        cierraT: "null",
        tag: "Ropa & Accesorios"
    },

    {
        id: 25,
        nombre: "Estética y peluquería L&mami",
        categoria: "Moda",
        direccion: "Calle los almendros, 4 bajo",
        telefono: "968 86 40 79",
        correo: "lina_8426@hotmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "16:00",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 26,
        nombre: "OPTICA TESSA",
        categoria: "Moda",
        direccion: "Calle de la Gloria ,6",
        telefono: "968 86 02 01",
        correo: "tessaoptica@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "16:30",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 27,
        nombre: "EL KIOSKO",
        categoria: "Moda",
        direccion: "C/ ISABEL LA CATÓLICA, 31 SANTOMERA",
        telefono: "968 86 51 09",
        correo: "espin@elkioskosantomera.com",
        abreM: "09:15",
        cierraM: "14:00",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Ropa & Accesorios"
    },

    {
        id: 28,
        nombre: "Deportes Alextani",
        categoria: "Moda",
        direccion: "Calle Calvario 21 Santomera",
        telefono: "968 86 15 80",
        correo: "deportesalextani@gmail.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:30",
        cierraT: "21:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 29,
        nombre: "HERBOSANA",
        categoria: "Moda",
        direccion: "C/LA GLORIA,7 SANTOMERA MURCIA",
        telefono: "968 86 44 50",
        correo: "herbosana@gmail.com",
        abreM: "09:30",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:00",
        tag: "Ropa & Accesorios"
    },

    {
        id: 30,
        nombre: "CENTRO DE NUTRICION MIELGO",
        categoria: "Alimentacion",
        direccion: "C/ CUATRO ESQUINAS, 4 BAJO",
        telefono: "968 86 18 38",
        correo: "pilarmielgomartinez@gmail.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "16:30",
        cierraT: "20:30",
        tag: "Alimentacion"
    },

    {
        id: 31,
        nombre: "RADIO SURESTE COPE",
        categoria: "Cultura",
        direccion: "C/ CAMPOAMOR 8-1º, 30140 SANTOMERA-MURCIA",
        telefono: "968 86 51 13",
        correo: "RADIOSURESTE@RADIOSURESTE.ES",
        abreM: "null",
        cierraM: "null",
        abreT: "null",
        cierraT: "null",
        tag: "Radio"
    },

    {
        id: 32,
        nombre: "SEXYSHOP Juguetería para Adultos",
        categoria: "Servicios",
        direccion: "Calle Ángel Nieto, 9, Bajo",
        telefono: "968 86 17 37",
        correo: "sexyshop@sexyshop.es",
        abreM: "11:00",
        cierraM: "14:00",
        abreT: "17:00",
        cierraT: "21:00",
        tag: "Plazer"
    },

    {
        id: 33,
        nombre: "Huellamoda",
        categoria: "Moda",
        direccion: "Calvario 20 Bajo",
        telefono: "659 46 17 74",
        correo: "huellasantomera@hotmail.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:30",
        cierraT: "20:30",
        tag: "Moda"
    },

    {
        id: 34,
        nombre: "SERVIPIZZA",
        categoria: "Hostelería",
        direccion: "Plaza Almazara, 8",
        telefono: "655 45 15 60",
        correo: "supervisor@servipizza.com",
        abreM: "13:00",
        cierraM: "23:30",
        abreT: "null",
        cierraT: "null",
        tag: "Hostelería"
    },

    {
        id: 35,
        nombre: "El Metro Hombre",
        categoria: "Moda",
        direccion: "Calle Maestro Puig Valera,20.30140 Santomera",
        telefono: "968 86 44 49",
        correo: "patroescolar@gmail.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Moda"
    },

    {
        id: 36,
        nombre: "Genesis Boutique",
        categoria: "Moda",
        direccion: "C/ los pasos 13",
        telefono: "968 86 13 99",
        correo: "Genesis-boutique@hotmail.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Moda"
    },

    {
        id: 37,
        nombre: "RB Mª Dolores Rejuvenecimiento & Bienestar",
        categoria: "Servicios",
        direccion: "C/ Calvario 21 bajo",
        telefono: "696 04 84 08",
        correo: "mdolores.reyesbas@gmail.com",
        abreM: "10:30",
        cierraM: "14:00",
        abreT: "15:00",
        cierraT: "20:30",
        tag: "Servicios"
    },

    {
        id: 38,
        nombre: "Reche",
        categoria: "Moda",
        direccion: "C. de la Gloria, 59, 30140 Santomera, Murcia",
        telefono: "687 37 85 67",
        correo: "santomera@rechetxt.com",
        abreM: "10:00",
        cierraM: "13:45",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Moda"
    },

    {
        id: 39,
        nombre: "pizzería pinocho",
        categoria: "Alimentacion",
        direccion: "c. villaconchita esquina la luz",
        telefono: "629 53 81 94",
        correo: "santi@pizzeriapinocho.es",
        abreM: "19:00",
        cierraM: "23:00",
        abreT: "null",
        cierraT: "null",
        tag: "Alimentacion"
    },

    {
        id: 40,
        nombre: "AMPARO BORRÁS",
        categoria: "Moda",
        direccion: "AVDA. JUAN CARLOS I Nº19 SANTOMERA",
        telefono: "699 14 28 51",
        correo: "asesoriadavidsimon@gmail.com",
        abreM: "09:30",
        cierraM: "20:00",
        abreT: "null",
        cierraT: "null",
        tag: "Moda"
    },

    {
        id: 41,
        nombre: "Marce Soto Clinic Terapias Alternativas",
        categoria: "Moda",
        direccion: "Paseo de la Mota 47 1A",
        telefono: "678 44 25 93",
        correo: "Marcesotosanchez@gmail.com",
        abreM: "08:30",
        cierraM: "21:00",
        abreT: "null",
        cierraT: "null",
        tag: "Moda"
    },

    {
        id: 42,
        nombre: "Cortinas el metro",
        categoria: "Hogar",
        direccion: "C/Maestro Puig Valera 64",
        telefono: "677 61 99 31",
        correo: "pepeelmetro@gmail.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:30",
        tag: "Hogar"
    },

    {
        id: 43,
        nombre: "Dsastre Santomera",
        categoria: "Moda",
        direccion: "C/ San León 34 Santomera",
        telefono: "659789396",
        correo: "celiagomariz41@gmail.com",
        abreM: "10:30",
        cierraM: "20:30",
        abreT: "null",
        cierraT: "null",
        tag: "Moda"
    },

    {
        id: 44,
        nombre: "Hotel Santos",
        categoria: "Alimentacion",
        direccion: "Calle Almazara 11",
        telefono: "968 86 52 11",
        correo: "hotelsantos@hotel-santos.com",
        abreM: "",
        cierraM: "",
        abreT: "",
        cierraT: "",
        tag: "Alimentacion"
    },

    {
        id: 45,
        nombre: "Confitería Salmerón",
        categoria: "Alimentacion",
        direccion: "Calle Alboraya 26 y calle severo Ochoa 6b.",
        telefono: "968 86 53 78 y 968 86 15 25",
        correo: "confiteriasalmeron@gmail.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "17:00",
        cierraT: "21:00",
        tag: "Alimentacion"
    },

    {
        id: 46,
        nombre: "Frutería Hnos Ortín Ayllón",
        categoria: "Alimentacion",
        direccion: "Mercados, Plaza Europa",
        telefono: "664 15 42 12",
        correo: "Ortinayllon@gmail.com",
        abreM: "09:00",
        cierraM: "13:30",
        abreT: "13:30",
        cierraT: "19:00",
        tag: "Alimentacion"
    },

    {
        id: 47,
        nombre: "Pintauñas",
        categoria: "Moda",
        direccion: "Plaza De la Iglesia,3 bajo",
        telefono: "661 21 39 52",
        correo: "info.malpensadas@gmail.com",
        abreM: "",
        cierraM: "",
        abreT: "",
        cierraT: "",
        tag: "Moda"
    },

    {
        id: 48,
        nombre: "African Clinica Veterinaria",
        categoria: "Servicios",
        direccion: "Maestro Puig Valera, 31",
        telefono: "607 90 25 01",
        correo: "info@africanclinicaveterinaria.com",
        abreM: "09:30",
        cierraM: "19:00",
        abreT: "null",
        cierraT: "null",
        tag: "Servicios"
    },

    {
        id: 49,
        nombre: "Sergio Planes peluqueros",
        categoria: "Moda",
        direccion: "C/juan laorden n2",
        telefono: "968 86 42 15 y 669 04 06 11",
        correo: "sergioplanes@gmail.com",
        abreM: "09:30",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "21:00",
        tag: "Moda"
    },

    {
        id: 50,
        nombre: "Imprenta Joaquín cascales",
        categoria: "Servicios",
        direccion: "Con borregueras,32",
        telefono: "625 58 44 45",
        correo: "Imprentacascales@gmail.com",
        abreM: "09:30",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "19:00",
        tag: "Servicios"
    },

    {
        id: 51,
        nombre: "Mercería Alarcon",
        categoria: "Cultura",
        direccion: "orilla del alfajor 84",
        telefono: "626 34 51 90",
        correo: "ginelopeztorres@gmail.com",
        abreM: "09:00",
        cierraM: "14:00",
        abreT: "16:00",
        cierraT: "20:00",
        tag: "Cultura"
    },

    {
        id: 52,
        nombre: "TIVIPARK",
        categoria: "Alimentacion",
        direccion: "plaza Almazara #2 bajo 99",
        telefono: "629 17 78 16",
        correo: "Tivipark@gmail.com",
        abreM: "08:00",
        cierraM: "13:00",
        abreT: "17:00",
        cierraT: "21:00",
        tag: "Alimentacion"
    },

    {
        id: 53,
        nombre: "CLÍNICA SINCROST",
        categoria: "Hogar",
        direccion: "Calle Maestro Puig Valera 95",
        telefono: "635 49 98 36",
        correo: "clinica.sincrost@gmail.com",
        abreM: "09:00",
        cierraM: "20:00",
        abreT: "null",
        cierraT: "null",
        tag: "Hogar"
    },

    {
        id: 54,
        nombre: "Recordarte Fotografía",
        categoria: "Servicios",
        direccion: "Avd Poeta Julian Andugar,1",
        telefono: "673 09 13 18",
        correo: "digital@recordartefotografia.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "17:00",
        cierraT: "20:00",
        tag: "Servicios"
    },

    {
        id: 55,
        nombre: "Gestoria Ruiz Garcia",
        categoria: "Servicios",
        direccion: "Av. Comision pro ayuntamiento, 3 Santomera",
        telefono: "968861529",
        correo: "german@gestoriaruizgarcia.com",
        abreM: "09:00",
        cierraM: "14:30",
        abreT: "16:30",
        cierraT: "20:00",
        tag: "Servicios"
    },

    {
        id: 56,
        nombre: "Hokuhome",
        categoria: "Servicios",
        direccion: "Ctra. De Alicante,32",
        telefono: "968 86 52 67",
        correo: "Info@hokuhome.com",
        abreM: "10:00",
        cierraM: "13:30",
        abreT: "16:30",
        cierraT: "20:30",
        tag: "Servicios"
    },

    {
        id: 57,
        nombre: "La Pelu de Lola 2.0",
        categoria: "Moda",
        direccion: "Avenida Juan Carlos 1,núm 20",
        telefono: "635 26 37 97",
        correo: "lapeludelola2013@gmail.com",
        abreM: "",
        cierraM: "",
        abreT: "",
        cierraT: "",
        tag: "Moda"
    },

    {
        id: 58,
        nombre: "Limón gastrobar santomera",
        categoria: "Servicios",
        direccion: "Calle Ortega Cano 1",
        telefono: "628 86 92 93",
        correo: "limongastrobar@gmail.com",
        abreM: "09:00",
        cierraM: "16:00",
        abreT: "null",
        cierraT: "null",
        tag: "Servicios"
    },

    {
        id: 59,
        nombre: "DÑA ENGRACIA",
        categoria: "Alimentacion",
        direccion: "CALLE CALVARIO 23, SANTOMERA MURCIA 30140",
        telefono: "690 25 84 61",
        correo: "info@bocalim.com",
        abreM: "06:00",
        cierraM: "24:00",
        abreT: "null",
        cierraT: "null",
        tag: "Alimentacion"
    },

    {
        id: 60,
        nombre: "Camisería Vicente",
        categoria: "Moda",
        direccion: "Avda. Poeta Julián Andugar, 81",
        telefono: "618 11 36 35",
        correo: "merchegarciaandugar@gmail.com",
        abreM: "10:00",
        cierraM: "14:00",
        abreT: "17:00",
        cierraT: "21:00",
        tag: "Moda"
    }
];


// ============================================================
// CATEGORÍAS
// ============================================================

const CATEGORIES = [
    {
        id: "todos",
        label: "Todos",
        emoji: null
    },
    {
        id: "Alimentación",
        label: "Alimentación",
        emoji: "🥗"
    },
    {
        id: "Moda",
        label: "Moda",
        emoji: "👗"
    },
    {
        id: "Hostelería",
        label: "Hostelería",
        emoji: "☕"
    },
    {
        id: "Servicios",
        label: "Servicios",
        emoji: "🔧"
    },
    {
        id: "Salud",
        label: "Salud",
        emoji: "💊"
    },
    {
        id: "Deporte",
        label: "Deporte",
        emoji: "⚽"
    },
    {
        id: "Hogar",
        label: "Hogar",
        emoji: "🛋️"
    },
    {
        id: "Cultura",
        label: "Cultura",
        emoji: "📚"
    },
    {
        id: "Marketing",
        label: "Marketing",
        emoji: "☁️"
    }
];


// ============================================================
// ESTADO
// ============================================================

let activeCategory = "todos";
let searchQuery = "";
let sortOrder = "nombre";
let currentPage = 1;

const PER_PAGE = 24;


// ============================================================
// FILTRADO
// ============================================================

function getFiltered() {

    let list = [...COMERCIOS];

    if (activeCategory !== "todos") {

        list = list.filter(
            c => c.categoria === activeCategory
        );
    }

    if (searchQuery.trim()) {

        const q = searchQuery
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        list = list.filter(c => {

            const nombre =
                c.nombre
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

            const categoria =
                c.categoria
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

            const direccion =
                c.direccion
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

            const tag =
                (c.tag || "")
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

            return (
                nombre.includes(q) ||
                categoria.includes(q) ||
                direccion.includes(q) ||
                tag.includes(q)
            );
        });
    }

    if (sortOrder === "nombre") {

        list.sort((a, b) =>
            a.nombre.localeCompare(
                b.nombre,
                "es"
            )
        );

    } else {

        list.sort((a, b) =>
            a.categoria.localeCompare(
                b.categoria,
                "es"
            ) ||
            a.nombre.localeCompare(
                b.nombre,
                "es"
            )
        );
    }

    return list;
}


// ============================================================
// ESTADO DEL COMERCIO
// ============================================================

function calcularEstado(
    abreM,
    cierraM,
    abreT,
    cierraT
) {

    const ahora = new Date();

    const minutosActuales =
        ahora.getHours() * 60 +
        ahora.getMinutes();

    function aMin(str) {

        if (
            !str ||
            str === "null"
        ) {
            return null;
        }

        const partes =
            str.split(":");

        const h =
            Number(partes[0]);

        const m =
            Number(partes[1]);

        if (
            Number.isNaN(h) ||
            Number.isNaN(m)
        ) {
            return null;
        }

        return h * 60 + m;
    }

    const amAbre = aMin(abreM);
    const amCierra = aMin(cierraM);
    const pmAbre = aMin(abreT);
    const pmCierra = aMin(cierraT);

    if (
        amAbre !== null &&
        amCierra !== null &&
        minutosActuales >= amAbre &&
        minutosActuales < amCierra
    ) {

        return {
            open: true,
            texto: `Abierto · Cierra a las ${cierraM}`
        };
    }

    if (
        pmAbre !== null &&
        pmCierra !== null &&
        minutosActuales >= pmAbre &&
        minutosActuales < pmCierra
    ) {

        return {
            open: true,
            texto: `Abierto · Cierra a las ${cierraT}`
        };
    }

    if (
        amAbre !== null &&
        minutosActuales < amAbre
    ) {

        return {
            open: false,
            texto: `Cerrado · Abre a las ${abreM}`
        };
    }

    if (
        pmAbre !== null &&
        pmCierra !== null &&
        minutosActuales < pmAbre
    ) {

        return {
            open: false,
            texto: `Cerrado · Abre a las ${abreT}`
        };
    }

    return {
        open: false,
        texto: "Cerrado por hoy"
    };
}


// ============================================================
// COLORES DE LAS TARJETAS
// ============================================================

function getCardColor(id) {

    const colores = [

        "linear-gradient(135deg,#dbeafe,#bfdbfe)",

        "linear-gradient(135deg,#ede9fe,#ddd6fe)",

        "linear-gradient(135deg,#fce7f3,#fbcfe8)",

        "linear-gradient(135deg,#dcfce7,#bbf7d0)",

        "linear-gradient(135deg,#fef3c7,#fde68a)",

        "linear-gradient(135deg,#cffafe,#a5f3fc)",

        "linear-gradient(135deg,#ffedd5,#fed7aa)",

        "linear-gradient(135deg,#e0e7ff,#c7d2fe)",

        "linear-gradient(135deg,#f3e8ff,#e9d5ff)",

        "linear-gradient(135deg,#ccfbf1,#99f6e4)",

        "linear-gradient(135deg,#fae8ff,#f5d0fe)",

        "linear-gradient(135deg,#fef9c3,#fef08a)"
    ];

    return colores[
        (Number(id) - 1) %
        colores.length
    ];
}


// ============================================================
// TARJETA DE COMERCIO
// ============================================================

function renderCard(
    comercio,
    index
) {

    const cardColor =
        getCardColor(
            comercio.id
        );

    const estado =
        calcularEstado(
            comercio.abreM,
            comercio.cierraM,
            comercio.abreT,
            comercio.cierraT
        );

    const hoursClass =
        estado.open
            ? "open"
            : "closed";

    return `

        <article
            class="card"
            role="listitem"
            style="animation-delay:${index * 55}ms"
            aria-label="${comercio.nombre}"
        >

            <div
                class="card-thumb"
                style="
                    background:${cardColor};
                    position:relative;
                "
            >

                <!-- ETIQUETA -->
                <span
                    class="card-category-tag"
                    style="
                        position:absolute;
                        top:14px;
                        right:14px;
                        z-index:3;
                        display:inline-flex;
                        align-items:center;
                        gap:6px;
                        padding:6px 11px;
                        border-radius:999px;
                        background:rgba(255,255,255,.94);
                        color:#173574;
                        font-size:.72rem;
                        font-weight:700;
                        line-height:1;
                        letter-spacing:.01em;
                        box-shadow:0 2px 8px rgba(23,53,116,.10);
                        white-space:nowrap;
                    "
                >

                    <span
                        aria-hidden="true"
                        style="
                            width:6px;
                            height:6px;
                            border-radius:50%;
                            background:currentColor;
                            display:inline-block;
                            flex:0 0 6px;
                        "
                    ></span>

                    ${comercio.tag || comercio.categoria}

                </span>

                <div class="card-thumb-inner"></div>

            </div>


            <div class="card-body">

                <h3 class="card-name">
                    ${comercio.nombre}
                </h3>


                <p class="card-address">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >

                        <path
                            d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"
                        />

                        <circle
                            cx="12"
                            cy="10"
                            r="3"
                        />

                    </svg>

                    ${comercio.direccion}

                </p>


                <div
                    style="
                        font-size:.85rem;
                        color:var(--navy);
                        opacity:.75;
                        line-height:1.55;
                        display:flex;
                        flex-direction:column;
                        gap:.4rem;
                        margin-top:.5rem;
                    "
                >

                    ${
                        comercio.telefono
                            ? `
                                <span
                                    style="
                                        display:flex;
                                        align-items:center;
                                        gap:.4rem;
                                    "
                                >

                                    <svg
                                        viewBox="0 0 24 24"
                                        width="14"
                                        height="14"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >

                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2
                                            19.79 19.79 0 0 1-8.63-3.07
                                            19.5 19.5 0 0 1-6-6
                                            19.79 19.79 0 0 1-3.07-8.67
                                            A2 2 0 0 1 4.11 2h3
                                            a2 2 0 0 1 2 1.72
                                            12.84 12.84 0 0 0 .7 2.81
                                            2 2 0 0 1-.45 2.11
                                            L8.09 9.91a16 16 0 0 0 6 6
                                            l1.27-1.27a2 2 0 0 1 2.11-.45
                                            12.84 12.84 0 0 0 2.81.7
                                            A2 2 0 0 1 22 16.92z"
                                        ></path>

                                    </svg>

                                    ${comercio.telefono}

                                </span>
                            `
                            : ""
                    }


                    ${
                        comercio.correo
                            ? `
                                <span
                                    style="
                                        display:flex;
                                        align-items:center;
                                        gap:.4rem;
                                    "
                                >

                                    <svg
                                        viewBox="0 0 24 24"
                                        width="14"
                                        height="14"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >

                                        <rect
                                            width="20"
                                            height="16"
                                            x="2"
                                            y="4"
                                            rx="2"
                                        ></rect>

                                        <path
                                            d="m22 7-8.97 5.7
                                            a1.94 1.94 0 0 1-2.06 0
                                            L2 7"
                                        ></path>

                                    </svg>

                                    ${comercio.correo}

                                </span>
                            `
                            : ""
                    }

                </div>


                <div class="card-footer">

                    <span class="card-hours">

                        <span
                            class="hours-dot ${hoursClass}"
                        ></span>

                        <span
                            style="
                                color:${estado.open
                                    ? "#22c55e"
                                    : "#ef4444"};
                                font-weight:600;
                            "
                        >
                            ${estado.texto}
                        </span>

                    </span>


                    <span
                        class="card-cta"
                        aria-label="Ver más sobre ${comercio.nombre}"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-width="2.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >

                            <path
                                d="M5 12h14M12 5l7 7-7 7"
                            />

                        </svg>

                    </span>

                </div>

            </div>

        </article>
    `;
}


// ============================================================
// GRID
// ============================================================

function renderGrid() {

    const grid =
        document.getElementById(
            "commerceGrid"
        );

    const countEl =
        document.getElementById(
            "resultsCount"
        );

    if (!grid || !countEl) return;

    const filtered =
        getFiltered();

    const totalPages =
        Math.ceil(
            filtered.length /
            PER_PAGE
        ) || 1;

    if (
        currentPage >
        totalPages
    ) {
        currentPage =
            totalPages;
    }

    const start =
        (currentPage - 1) *
        PER_PAGE;

    const end =
        Math.min(
            start + PER_PAGE,
            filtered.length
        );

    const pageItems =
        filtered.slice(
            start,
            end
        );

    grid.classList.remove(
        "ready"
    );

    grid.classList.add(
        "filtering"
    );

    setTimeout(() => {

        if (
            filtered.length === 0
        ) {

            grid.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        🔍
                    </div>

                    <h3 class="empty-title">
                        Sin resultados
                    </h3>

                    <p class="empty-sub">
                        Prueba con otra categoría o ajusta tu búsqueda.
                    </p>

                </div>
            `;

        } else {

            grid.innerHTML =
                pageItems
                    .map(
                        (comercio, i) =>
                            renderCard(
                                comercio,
                                i
                            )
                    )
                    .join("");
        }


        if (
            filtered.length === 0
        ) {

            countEl.innerHTML =
                `<strong>0</strong> comercios`;

        } else {

            countEl.innerHTML =
                `Mostrando <strong>${start + 1}–${end}</strong> de <strong>${filtered.length}</strong> comercios`;
        }


        grid.classList.remove(
            "filtering"
        );

        grid.classList.add(
            "ready"
        );


        renderPagination(
            totalPages
        );

    }, 140);
}


// ============================================================
// FILTROS
// ============================================================

function renderFilters() {

    const wrap =
        document.querySelector(
            ".filters"
        );

    if (!wrap) return;

    const label =
        wrap.querySelector(
            ".filter-label"
        );

    if (!label) return;

    const html =
        CATEGORIES
            .map(cat => {

                const count =
                    cat.id === "todos"
                        ? COMERCIOS.length
                        : COMERCIOS.filter(
                            c =>
                                c.categoria ===
                                cat.id
                        ).length;

                if (count === 0) {
                    return "";
                }

                const isActive =
                    activeCategory ===
                    cat.id;

                return `

                    <button
                        class="filter-btn${isActive ? " active" : ""}"
                        data-cat="${cat.id}"
                        aria-pressed="${isActive}"
                    >

                        ${
                            cat.emoji
                                ? `<span>${cat.emoji}</span>`
                                : ""
                        }

                        ${cat.label}

                        ${
                            cat.id !== "todos"
                                ? `
                                    <span class="filter-count">
                                        ${count}
                                    </span>
                                `
                                : ""
                        }

                    </button>

                `;
            })
            .join("");


    wrap.innerHTML = "";

    wrap.appendChild(
        label
    );

    wrap.insertAdjacentHTML(
        "beforeend",
        html
    );


    wrap
        .querySelectorAll(
            ".filter-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    activeCategory =
                        button.dataset.cat;

                    currentPage =
                        1;

                    wrap
                        .querySelectorAll(
                            ".filter-btn"
                        )
                        .forEach(btn => {

                            const active =
                                btn.dataset.cat ===
                                activeCategory;

                            btn.classList.toggle(
                                "active",
                                active
                            );

                            btn.setAttribute(
                                "aria-pressed",
                                active
                            );
                        });

                    renderGrid();
                }
            );
        });
}


// ============================================================
// BÚSQUEDA
// ============================================================

const searchInput =
    document.getElementById(
        "searchInput"
    );

const searchClear =
    document.getElementById(
        "searchClear"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            searchQuery =
                searchInput.value;

            currentPage =
                1;

            if (searchClear) {

                searchClear.classList.toggle(
                    "visible",
                    searchQuery.length > 0
                );
            }

            renderGrid();
        }
    );
}


if (searchClear) {

    searchClear.addEventListener(
        "click",
        () => {

            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }

            searchQuery = "";

            currentPage = 1;

            searchClear.classList.remove(
                "visible"
            );

            renderGrid();
        }
    );
}


// ============================================================
// ORDENAR
// ============================================================

const sortSelect =
    document.getElementById(
        "sortSelect"
    );

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        event => {

            sortOrder =
                event.target.value;

            currentPage =
                1;

            renderGrid();
        }
    );
}


// ============================================================
// PAGINACIÓN
// ============================================================

function renderPagination(
    totalPages
) {

    const pagination =
        document.getElementById(
            "pagination"
        );

    if (!pagination) return;


    if (totalPages <= 1) {

        pagination.innerHTML = "";

        return;
    }


    const prevSvg = `

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >

            <path
                d="M15 18l-6-6 6-6"
            />

        </svg>

    `;


    const nextSvg = `

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >

            <path
                d="M9 18l6-6-6-6"
            />

        </svg>

    `;


    let pages = [];


    if (totalPages <= 7) {

        for (
            let i = 1;
            i <= totalPages;
            i++
        ) {
            pages.push(i);
        }

    } else {

        pages = [
            1,
            "...",
            totalPages
        ];

        if (
            currentPage > 1 &&
            currentPage < totalPages
        ) {

            pages.splice(
                1,
                0,
                currentPage
            );
        }
    }


    pagination.innerHTML = `

        <button
            class="page-btn"
            data-action="prev"
            aria-label="Anterior"
            ${currentPage === 1 ? "disabled" : ""}
        >

            ${prevSvg}

        </button>


        ${pages
            .map(page => {

                if (
                    page === "..."
                ) {

                    return `
                        <span class="page-ellipsis">
                            …
                        </span>
                    `;
                }

                return `

                    <button
                        class="page-btn${page === currentPage ? " active" : ""}"
                        data-page="${page}"
                    >

                        ${page}

                    </button>

                `;
            })
            .join("")
        }


        <button
            class="page-btn"
            data-action="next"
            aria-label="Siguiente"
            ${currentPage === totalPages ? "disabled" : ""}
        >

            ${nextSvg}

        </button>

    `;


    pagination
        .querySelectorAll(
            ".page-btn:not([disabled])"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.dataset.action ===
                        "prev"
                    ) {

                        currentPage--;

                    } else if (
                        button.dataset.action ===
                        "next"
                    ) {

                        currentPage++;

                    } else {

                        currentPage =
                            Number(
                                button.dataset.page
                            );
                    }


                    const grid =
                        document.getElementById(
                            "commerceGrid"
                        );

                    if (grid) {

                        grid.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }


                    renderGrid();
                }
            );
        });
}


// ============================================================
// ARRANQUE
// ============================================================

renderFilters();

renderGrid();
