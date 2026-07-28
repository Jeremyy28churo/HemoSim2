export interface Canton {
  id: string;
  nombre: string;
  region: 'Costa' | 'Sierra';
  altitud_promedio: number;
  clima: string;
  terreno: string;
  produccion_animal_principal: string[];
  especies_tipicas: string[];
  desafios: string[];
  ventajas: string[];
  dato_curioso: string;
}

export const cantones: Canton[] = [
  {
    id: "machala",
    nombre: "Machala",
    region: "Costa",
    altitud_promedio: 10,
    clima: "Tropical cálido",
    terreno: "Llano costero",
    produccion_animal_principal: ["Porcinos", "Aves", "Bovinos"],
    especies_tipicas: ["Pollo de engorde", "Cerdo comercial", "Vaca mestiza"],
    desafios: ["Calor excesivo", "Humedad alta", "Parásitos externos"],
    ventajas: ["Fácil acceso", "Abundante agua", "Mercado cercano"],
    dato_curioso: "Es la capital y centro comercial de la provincia, rodeada de bananeras."
  },
  {
    id: "arenillas",
    nombre: "Arenillas",
    region: "Costa",
    altitud_promedio: 15,
    clima: "Tropical seco",
    terreno: "Llano y semi-árido",
    produccion_animal_principal: ["Bovinos", "Caprinos"],
    especies_tipicas: ["Vaca Brahman", "Cabra criolla"],
    desafios: ["Sequías estacionales", "Escasez de pasto en verano"],
    ventajas: ["Menor humedad", "Amplias extensiones de tierra"],
    dato_curioso: "Cuenta con la Reserva Ecológica Arenillas, un bosque seco tropical."
  },
  {
    id: "atahualpa",
    nombre: "Atahualpa",
    region: "Sierra",
    altitud_promedio: 1180,
    clima: "Templado húmedo",
    terreno: "Montañoso",
    produccion_animal_principal: ["Bovinos (leche)", "Porcinos"],
    especies_tipicas: ["Vaca Holstein", "Vaca Brown Swiss"],
    desafios: ["Terreno escarpado", "Clima variable"],
    ventajas: ["Pastos nutritivos", "Clima fresco favorable para lechería"],
    dato_curioso: "Conocida como la 'Orquídea de Los Andes' por su clima templado."
  },
  {
    id: "balsas",
    nombre: "Balsas",
    region: "Sierra",
    altitud_promedio: 800,
    clima: "Subtropical",
    terreno: "Lomas y valles",
    produccion_animal_principal: ["Aves", "Porcinos"],
    especies_tipicas: ["Pollo Broiler", "Gallina Ponedora"],
    desafios: ["Control de enfermedades avícolas", "Manejo de desechos"],
    ventajas: ["Clima ideal para avicultura", "Polo de desarrollo agroindustrial"],
    dato_curioso: "Es uno de los centros avícolas más importantes del sur del país."
  },
  {
    id: "chilla",
    nombre: "Chilla",
    region: "Sierra",
    altitud_promedio: 2450,
    clima: "Frío de montaña",
    terreno: "Alta montaña",
    produccion_animal_principal: ["Bovinos", "Ovinos"],
    especies_tipicas: ["Vaca de altura", "Oveja criolla"],
    desafios: ["Hipoxia (baja presión de O2)", "Temperaturas frías"],
    ventajas: ["Menor incidencia de parásitos tropicales", "Pastos de altura"],
    dato_curioso: "Es el cantón más alto y frío de la provincia de El Oro."
  },
  {
    id: "el_guabo",
    nombre: "El Guabo",
    region: "Costa",
    altitud_promedio: 25,
    clima: "Tropical húmedo",
    terreno: "Llanura aluvial",
    produccion_animal_principal: ["Bovinos", "Porcinos"],
    especies_tipicas: ["Vaca Brahman", "Cerdo Landrace"],
    desafios: ["Inundaciones en invierno", "Humedad extrema"],
    ventajas: ["Pastos verdes todo el año", "Tierra muy fértil"],
    dato_curioso: "Tiene gran producción bananera que a veces se usa para complementar alimentación animal."
  },
  {
    id: "huaquillas",
    nombre: "Huaquillas",
    region: "Costa",
    altitud_promedio: 15,
    clima: "Tropical seco",
    terreno: "Costero y llano",
    produccion_animal_principal: ["Aves", "Caprinos"],
    especies_tipicas: ["Cabra criolla", "Aves de traspatio"],
    desafios: ["Escasez de agua dulce", "Alta salinidad"],
    ventajas: ["Comercio transfronterizo fácil", "Clima estable"],
    dato_curioso: "Es la principal frontera comercial terrestre con Perú en el sur."
  },
  {
    id: "las_lajas",
    nombre: "Las Lajas",
    region: "Costa",
    altitud_promedio: 150,
    clima: "Tropical húmedo",
    terreno: "Piedemonte",
    produccion_animal_principal: ["Bovinos (carne y doble propósito)"],
    especies_tipicas: ["Vaca Gyr", "Vaca Brahman"],
    desafios: ["Malas vías de acceso", "Aislamiento"],
    ventajas: ["Grandes fincas ganaderas", "Entorno natural limpio"],
    dato_curioso: "Su bosque petrificado Puyango es un atractivo turístico mundial."
  },
  {
    id: "marcabeli",
    nombre: "Marcabelí",
    region: "Sierra",
    altitud_promedio: 900,
    clima: "Subtropical",
    terreno: "Valles y lomas",
    produccion_animal_principal: ["Bovinos", "Aves"],
    especies_tipicas: ["Vaca doble propósito", "Aves ponedoras"],
    desafios: ["Topografía irregular", "Distancia a mercados mayores"],
    ventajas: ["Clima muy agradable", "Buena calidad de agua"],
    dato_curioso: "Conocido como el 'Edén de los Andes' por su verdor permanente."
  },
  {
    id: "pasaje",
    nombre: "Pasaje",
    region: "Costa",
    altitud_promedio: 20,
    clima: "Tropical cálido",
    terreno: "Llano y ríos",
    produccion_animal_principal: ["Porcinos", "Bovinos"],
    especies_tipicas: ["Cerdo comercial", "Bovinos de carne"],
    desafios: ["Calor intenso", "Riesgo de crecientes del río Jubones"],
    ventajas: ["Abundante agua", "Suelos ricos"],
    dato_curioso: "Atravesado por el río Jubones, que condiciona su geografía y agricultura."
  },
  {
    id: "pinas",
    nombre: "Piñas",
    region: "Sierra",
    altitud_promedio: 1000,
    clima: "Subtropical húmedo",
    terreno: "Montañoso",
    produccion_animal_principal: ["Bovinos", "Aves", "Porcinos"],
    especies_tipicas: ["Vaca Brown Swiss", "Aves de corral"],
    desafios: ["Mucha neblina y humedad", "Terrenos pendientes"],
    ventajas: ["Microclimas variados", "Flora abundante para forraje"],
    dato_curioso: "Se la conoce como la 'Orquídea de los Andes', famosa por su biodiversidad."
  },
  {
    id: "portovelo",
    nombre: "Portovelo",
    region: "Sierra",
    altitud_promedio: 650,
    clima: "Tropical de transición",
    terreno: "Montañoso y rocoso",
    produccion_animal_principal: ["Bovinos", "Equinos"],
    especies_tipicas: ["Vaca criolla", "Caballos de carga"],
    desafios: ["Actividad minera contamina fuentes de agua", "Suelos pedregosos"],
    ventajas: ["Clima cálido sin exceso de humedad", "Tradición de manejo animal"],
    dato_curioso: "Es el primer centro minero del Ecuador, lo que ha desplazado a la agricultura."
  },
  {
    id: "santa_rosa",
    nombre: "Santa Rosa",
    region: "Costa",
    altitud_promedio: 10,
    clima: "Tropical",
    terreno: "Llano y marismas",
    produccion_animal_principal: ["Bovinos", "Porcinos"],
    especies_tipicas: ["Vaca de carne", "Cerdo"],
    desafios: ["Inundaciones", "Humedad"],
    ventajas: ["Grandes planicies", "Cercanía al mar moderando temperatura"],
    dato_curioso: "También es famoso por su producción camaronera, además de la ganadería."
  },
  {
    id: "zaruma",
    nombre: "Zaruma",
    region: "Sierra",
    altitud_promedio: 1200,
    clima: "Templado",
    terreno: "Muy escarpado",
    produccion_animal_principal: ["Bovinos (leche)", "Porcinos"],
    especies_tipicas: ["Vaca Holstein", "Cerdo criollo"],
    desafios: ["Falta de terrenos planos", "Altos costos logísticos"],
    ventajas: ["Clima excelente para lácteos", "Pastizales de alta calidad"],
    dato_curioso: "Ciudad Patrimonio Cultural, conocida por su café y arquitectura, pero con fuerte tradición láctea."
  }
];
