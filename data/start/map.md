---
# Campos según docs/Format_Page.md > Inicio > Mapa:
#   nombrePais   -> Nombre Pais
#   lat / lng    -> Cordenadas en mapa
#   estado       -> Convenio Activo o Proxima Oportunidad ("available" | "upcoming")
#   continente   -> Continente
#   semestre     -> Semestre
#   carreras     -> Carreras
#   cupos        -> Cupos
#   idiomas      -> Idiomas
#   detalle      -> Detalle
#   sitioOficial -> Sitio Oficial
#
# Campos extra (no están en Format_Page.md, requeridos por el componente):
#   id    -> identificador único usado por el mapa y el parámetro ?dest=
#   flag  -> emoji de bandera
#   ciudad -> ciudad mostrada junto al país
#   universidad -> nombre de la universidad aliada (se muestra como título del panel)
items:
  # ---- Disponibles (con convenio activo) ----
  - id: "ue-madrid"
    nombrePais: "España"
    flag: "🇪🇸"
    continente: "Europa"
    ciudad: "Madrid"
    universidad: "Universidad Europea"
    lat: 40.42
    lng: -3.70
    estado: "available"
    semestre: "Sep–Ene · Feb–Jun"
    carreras: "Todas las facultades"
    cupos: "Sin límite"
    idiomas: "Esp / Ing"
    detalle: "166€ por crédito ECTS. Al regresar a UVG se paga 50% del curso a convalidar."
    sitioOficial: "https://universidadeuropea.com"

  - id: "u-rosario"
    nombrePais: "Colombia"
    flag: "🇨🇴"
    continente: "América Latina"
    ciudad: "Bogotá"
    universidad: "Universidad del Rosario"
    lat: 4.71
    lng: -74.07
    estado: "available"
    semestre: "Jul–Nov · Ene–May"
    carreras: "Pregrado y posgrado"
    cupos: "4 (2 por sem.)"
    idiomas: "Español"
    detalle: "Sin pago de tuition. Estudiante cubre alojamiento, transporte, seguro y visado."
    sitioOficial: "https://www.urosario.edu.co"

  - id: "jmu"
    nombrePais: "Alemania"
    flag: "🇩🇪"
    continente: "Europa"
    ciudad: "Wurzburgo"
    universidad: "Universität Würzburg (JMU)"
    lat: 49.79
    lng: 9.93
    estado: "available"
    semestre: "Oct–Feb · Abr–Jul"
    carreras: "Todas las facultades"
    cupos: "Sin límite"
    idiomas: "Alemán B1 / Inglés"
    detalle: "Intercambio sin tuition. Máx. 3 semestres. Erasmus+ activo."
    sitioOficial: "https://www.uni-wuerzburg.de"

  - id: "u-houston"
    nombrePais: "Estados Unidos"
    flag: "🇺🇸"
    continente: "Norteamérica"
    ciudad: "Houston, TX"
    universidad: "University of Houston"
    lat: 29.76
    lng: -95.36
    estado: "available"
    semestre: "Otoño · Primavera"
    carreras: "Todas las facultades"
    cupos: "3 / año"
    idiomas: "Inglés TOEFL 79 / IELTS 6.5"
    detalle: "Intercambio recíproco. Sin pago de tuition en anfitriona."
    sitioOficial: "https://uh.edu"

  - id: "komatsu"
    nombrePais: "Japón"
    flag: "🇯🇵"
    continente: "Asia"
    ciudad: "Komatsu"
    universidad: "Universidad de Komatsu"
    lat: 36.40
    lng: 136.45
    estado: "available"
    semestre: "Prácticas (hasta 10 meses)"
    carreras: "Internships académicos"
    cupos: "Sin límite"
    idiomas: "Japonés / Inglés"
    detalle: "Prácticas académicas con apoyo en alojamiento, visa y permisos."
    sitioOficial: "https://www.komatsu-u.ac.jp"

  - id: "cmu-disney"
    nombrePais: "Estados Unidos"
    flag: "🇺🇸"
    continente: "Norteamérica"
    ciudad: "Mount Pleasant, MI"
    universidad: "CMU · Disney Academic Exchange"
    lat: 43.59
    lng: -84.77
    estado: "available"
    semestre: "1 o 2 semestres"
    carreras: "Recreación, turismo, hospitalidad"
    cupos: "Selección Disney"
    idiomas: "Inglés"
    detalle: "Programa con compensación económica de Disney. Visado J-1."
    sitioOficial: "https://disneyprograms.com"

  - id: "uclm"
    nombrePais: "España"
    flag: "🇪🇸"
    continente: "Europa"
    ciudad: "Castilla-La Mancha"
    universidad: "Universidad de Castilla-La Mancha"
    lat: 39.86
    lng: -4.02
    estado: "available"
    semestre: "Sep–Ene · Feb–Jun"
    carreras: "Todas las facultades"
    cupos: "4 / año"
    idiomas: "Español"
    detalle: "Convenio marco + anexo de intercambio. Sin matrícula en destino."
    sitioOficial: "https://www.uclm.es/internacional"

  - id: "tu-dresden"
    nombrePais: "Alemania"
    flag: "🇩🇪"
    continente: "Europa"
    ciudad: "Dresde"
    universidad: "TU Dresden"
    lat: 51.05
    lng: 13.74
    estado: "available"
    semestre: "Oct–Mar · Abr–Sep"
    carreras: "Ingeniería Civil"
    cupos: "1"
    idiomas: "Inglés B1 / B2"
    detalle: "Erasmus+ KA171 · Movilidad activa."
    sitioOficial: "https://tu-dresden.de"

  - id: "u-manizales"
    nombrePais: "Colombia"
    flag: "🇨🇴"
    continente: "América Latina"
    ciudad: "Manizales"
    universidad: "Universidad de Manizales"
    lat: 5.07
    lng: -75.52
    estado: "available"
    semestre: "Pendiente"
    carreras: "Todas las facultades"
    cupos: "2"
    idiomas: "Español"
    detalle: "Convenio marco firmado. Incluye investigación, innovación y proyección."
    sitioOficial: "https://www.umanizales.edu.co"

  - id: "uqtr"
    nombrePais: "Canadá"
    flag: "🇨🇦"
    continente: "Norteamérica"
    ciudad: "Trois-Rivières"
    universidad: "UQTR · Université du Québec"
    lat: 46.34
    lng: -72.54
    estado: "available"
    semestre: "Trimestre otoño · invierno"
    carreras: "Todas las facultades"
    cupos: "2"
    idiomas: "Francés (DALF/DELF)"
    detalle: "Estudiante asume matrícula, seguro, alojamiento y manutención."
    sitioOficial: "https://www.uqtr.ca"

  - id: "emporia"
    nombrePais: "Estados Unidos"
    flag: "🇺🇸"
    continente: "Norteamérica"
    ciudad: "Emporia, KS"
    universidad: "Emporia State University"
    lat: 38.40
    lng: -96.18
    estado: "available"
    semestre: "Otoño · Primavera · Verano"
    carreras: "Todas las facultades"
    cupos: "2"
    idiomas: "Inglés"
    detalle: "Out-of-state tuition asumida por el estudiante."
    sitioOficial: "https://www.emporia.edu"

  - id: "kanazawa"
    nombrePais: "Japón"
    flag: "🇯🇵"
    continente: "Asia"
    ciudad: "Kanazawa"
    universidad: "Kanazawa University"
    lat: 36.56
    lng: 136.65
    estado: "available"
    semestre: "Otoño · Primavera"
    carreras: "Todas las facultades"
    cupos: "1 o 2"
    idiomas: "Japonés / Inglés"
    detalle: "Exención de matrícula por convenio."
    sitioOficial: "https://www.kanazawa-u.ac.jp"

  - id: "nagoya"
    nombrePais: "Japón"
    flag: "🇯🇵"
    continente: "Asia"
    ciudad: "Nagoya"
    universidad: "Nagoya University"
    lat: 35.18
    lng: 136.91
    estado: "available"
    semestre: "Sep–Ene · Feb–Jun"
    carreras: "Ingeniería y CC. Sociales"
    cupos: "1 o 2"
    idiomas: "Inglés IELTS 6.0 / TOEFL 80"
    detalle: "Maestría en inglés. Exención MEXT. Contactar supervisor antes de aplicar."
    sitioOficial: "https://en.nagoya-u.ac.jp"

  - id: "upv-ehu"
    nombrePais: "España"
    flag: "🇪🇸"
    continente: "Europa"
    ciudad: "País Vasco"
    universidad: "Universidad del País Vasco"
    lat: 43.26
    lng: -2.93
    estado: "available"
    semestre: "Sep–Feb · Feb–Jul"
    carreras: "Todas las facultades"
    cupos: "4"
    idiomas: "Español / Euskera"
    detalle: "Convenio de movilidad 2016. Sin pago de tasas académicas."
    sitioOficial: "https://www.ehu.eus"

  # ---- Próximas oportunidades (borrador / en gestión) ----
  - id: "ucr"
    nombrePais: "Costa Rica"
    flag: "🇨🇷"
    continente: "América Latina"
    ciudad: "San José"
    universidad: "Universidad de Costa Rica"
    lat: 9.93
    lng: -84.08
    estado: "upcoming"
    semestre: "Feb–Jun · Ago–Dic"
    carreras: "Todas las facultades"
    cupos: "2"
    idiomas: "Español"
    detalle: "Estudiante paga matrícula en UVG, no en UCR."
    sitioOficial: "https://www.ucr.ac.cr"

  - id: "uwyo"
    nombrePais: "Estados Unidos"
    flag: "🇺🇸"
    continente: "Norteamérica"
    ciudad: "Laramie, WY"
    universidad: "University of Wyoming"
    lat: 41.31
    lng: -105.59
    estado: "upcoming"
    semestre: "Ago–Dic · Ene–May"
    carreras: "Múltiples áreas"
    cupos: "4"
    idiomas: "Inglés"
    detalle: "Exención de tuition (Home Payment B). Solicitud $50 + intercambio $75."
    sitioOficial: "https://www.uwyo.edu"

  - id: "utp"
    nombrePais: "Panamá"
    flag: "🇵🇦"
    continente: "América Latina"
    ciudad: "Ciudad de Panamá"
    universidad: "Universidad Tecnológica de Panamá"
    lat: 8.97
    lng: -79.53
    estado: "upcoming"
    semestre: "Pendiente"
    carreras: "Ingenierías y tecnologías"
    cupos: "1 o 2"
    idiomas: "Español"
    detalle: "Pendiente confirmar modalidad de intercambio activa 2026."
    sitioOficial: "https://www.utp.ac.pa"

  - id: "ntut"
    nombrePais: "Taiwán"
    flag: "🇹🇼"
    continente: "Asia"
    ciudad: "Taipéi"
    universidad: "National Taipei Univ. of Technology"
    lat: 25.03
    lng: 121.56
    estado: "upcoming"
    semestre: "Sep–Dic · Feb–Jun"
    carreras: "Ingeniería, Tecnología, Diseño"
    cupos: "5"
    idiomas: "Inglés / Chino"
    detalle: "Exención de matrícula por convenio. Pendiente fechas 2026."
    sitioOficial: "https://www.ntut.edu.tw"

  - id: "ugr"
    nombrePais: "España"
    flag: "🇪🇸"
    continente: "Europa"
    ciudad: "Granada"
    universidad: "Universidad de Granada"
    lat: 37.18
    lng: -3.60
    estado: "upcoming"
    semestre: "Pendiente"
    carreras: "Todas las facultades"
    cupos: "4"
    idiomas: "Español B2"
    detalle: "Convenio permite exención de matrícula."
    sitioOficial: "https://www.ugr.es"

  - id: "ull"
    nombrePais: "España"
    flag: "🇪🇸"
    continente: "Europa"
    ciudad: "La Laguna"
    universidad: "Universidad de La Laguna"
    lat: 28.48
    lng: -16.32
    estado: "upcoming"
    semestre: "Sep–Feb · Feb–Jul"
    carreras: "Humanidades, CC., Ingenierías"
    cupos: "4"
    idiomas: "Español B2"
    detalle: "Exención de matrícula. Alojamiento Colegio Mayor €270-750/mes."
    sitioOficial: "https://www.ull.es"

  - id: "umh"
    nombrePais: "España"
    flag: "🇪🇸"
    continente: "Europa"
    ciudad: "Elche"
    universidad: "Universidad Miguel Hernández"
    lat: 38.27
    lng: -0.70
    estado: "upcoming"
    semestre: "Pendiente"
    carreras: "CC. Sociales, Salud, Ingenierías"
    cupos: "4"
    idiomas: "Español B2"
    detalle: "Pendiente confirmar exención de matrícula."
    sitioOficial: "https://www.umh.es"

  - id: "tor-vergata"
    nombrePais: "Italia"
    flag: "🇮🇹"
    continente: "Europa"
    ciudad: "Roma"
    universidad: "University of Rome Tor Vergata"
    lat: 41.90
    lng: 12.49
    estado: "upcoming"
    semestre: "Sep–Ene · Feb–Jun"
    carreras: "Economía, Derecho, Ing., Medicina"
    cupos: "5"
    idiomas: "Italiano / Inglés B2"
    detalle: "Matrícula exenta. Primer plazo €156 + seguro de salud €150."
    sitioOficial: "https://web.uniroma2.it"

  - id: "uazuay"
    nombrePais: "Ecuador"
    flag: "🇪🇨"
    continente: "América Latina"
    ciudad: "Cuenca"
    universidad: "Universidad del Azuay"
    lat: -2.90
    lng: -79.00
    estado: "upcoming"
    semestre: "Pendiente"
    carreras: "Arq., Diseño, Ingenierías, Salud"
    cupos: "Pendiente"
    idiomas: "Español"
    detalle: "Costo de alojamiento mensual estimado: $250–400 USD."
    sitioOficial: "https://www.uazuay.edu.ec"

  - id: "sorbonne"
    nombrePais: "Francia"
    flag: "🇫🇷"
    continente: "Europa"
    ciudad: "París"
    universidad: "Université Sorbonne Nouvelle"
    lat: 48.85
    lng: 2.35
    estado: "upcoming"
    semestre: "Sep–Ene · Ene–Jun"
    carreras: "Artes, Letras, CC. Humanas"
    cupos: "Pendiente"
    idiomas: "Francés B2/C1"
    detalle: "Postulación directa como visitante. Costo vida París €1,000–1,500/mes."
    sitioOficial: "https://www.sorbonne-nouvelle.fr"

  - id: "kriete"
    nombrePais: "El Salvador"
    flag: "🇸🇻"
    continente: "América Latina"
    ciudad: "San Salvador"
    universidad: "Instituto Kriete de Ingeniería"
    lat: 13.69
    lng: -89.21
    estado: "upcoming"
    semestre: "Pendiente"
    carreras: "Ingeniería y Ciencias"
    cupos: "1 o 2"
    idiomas: "Español"
    detalle: "Postulación como visitante. Alojamiento estimado $300–500 USD/mes."
    sitioOficial: "https://www.kriete.edu.sv"

  - id: "utt"
    nombrePais: "Francia"
    flag: "🇫🇷"
    continente: "Europa"
    ciudad: "Troyes"
    universidad: "Université de Technologie de Troyes"
    lat: 48.30
    lng: 4.08
    estado: "upcoming"
    semestre: "Sep–Ene · Feb–Jun"
    carreras: "Ingeniería, Tecnología"
    cupos: "Pendiente"
    idiomas: "Francés B2"
    detalle: "Postulación directa. Matrícula internacional €3,000–5,000/año."
    sitioOficial: "https://www.utt.fr"

  - id: "usn-norway"
    nombrePais: "Noruega"
    flag: "🇳🇴"
    continente: "Europa"
    ciudad: "Notodden"
    universidad: "University of South-Eastern Norway"
    lat: 59.56
    lng: 9.26
    estado: "upcoming"
    semestre: "Ago–Dic · Ene–Jun"
    carreras: "Gestión Ambiental y Sostenibilidad"
    cupos: "Pendiente"
    idiomas: "Inglés"
    detalle: "Líder en Gestión Sostenible y Ecología."
    sitioOficial: "https://www.usn.no"
---

# Inicio · Mapa

Destinos y universidades aliadas mostrados en el mapa mundial (`WorldMapSection.astro`) de la página de Inicio.
Este mismo dataset alimenta el resumen por región en la página de Intercambios (`DestinationsRedirectSection.astro`).
Ver el formato general en [`docs/Format_Page.md`](../../docs/Format_Page.md).
