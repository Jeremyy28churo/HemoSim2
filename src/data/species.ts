export interface AnimalRange {
  min: number;
  max: number;
  typical: number;
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  location: string;
  category: 'rumiante' | 'monogastrico' | 'aviar';
  image: string;
  ranges: {
    hct: AnimalRange;
    hb: AnimalRange;
    alt: AnimalRange;
  };
  fact: string;
  description: string;
}

export const speciesList: Species[] = [
  {
    id: 'bovino-costa',
    name: 'Vaca / Bovino (Costa)',
    scientificName: 'Bos taurus / Bos indicus',
    location: 'Costa',
    category: 'rumiante',
    image: '/animals/vaca_costa.jpg',
    ranges: {
      hct: { min: 24, max: 46, typical: 35 },
      hb: { min: 8, max: 15, typical: 11.5 },
      alt: { min: 0, max: 500, typical: 50 }
    },
    fact: 'Los bovinos de costa tienen un pelaje más corto y brillante para disipar el calor.',
    description: 'Bovinos adaptados a las condiciones tropicales y de baja altitud de la costa ecuatoriana.'
  },
  {
    id: 'bovino-sierra',
    name: 'Vaca de Altura',
    scientificName: 'Bos taurus',
    location: 'Sierra',
    category: 'rumiante',
    image: '/animals/vaca_sierra.png',
    ranges: {
      hct: { min: 35, max: 55, typical: 45 },
      hb: { min: 12, max: 18, typical: 15 },
      alt: { min: 2000, max: 4000, typical: 2800 }
    },
    fact: 'Tienen un hematocrito naturalmente más alto para compensar la menor presión de oxígeno.',
    description: 'Bovinos criados en la cordillera andina, con adaptaciones fisiológicas a la hipoxia.'
  },
  {
    id: 'caprino-chilla',
    name: 'Cabra de Chilla',
    scientificName: 'Capra hircus',
    location: 'Sierra',
    category: 'rumiante',
    image: '/animals/cabra.jpg',
    ranges: {
      hct: { min: 22, max: 38, typical: 30 },
      hb: { min: 8, max: 12, typical: 10 },
      alt: { min: 2500, max: 4500, typical: 3000 }
    },
    fact: 'Las cabras de Chilla son sumamente ágiles en terrenos escarpados.',
    description: 'Caprinos adaptados a las zonas altas de El Oro, con gran resistencia.'
  },
  {
    id: 'ovino',
    name: 'Oveja',
    scientificName: 'Ovis aries',
    location: 'Ambas',
    category: 'rumiante',
    image: '/animals/oveja.jpg',
    ranges: {
      hct: { min: 27, max: 45, typical: 36 },
      hb: { min: 9, max: 15, typical: 12 },
      alt: { min: 0, max: 4000, typical: 2000 }
    },
    fact: 'Su gruesa capa de lana las protege del frío en los páramos.',
    description: 'Ovinos de propósito múltiple, adaptables a diversas altitudes.'
  },
  {
    id: 'porcino',
    name: 'Cerdo',
    scientificName: 'Sus scrofa domesticus',
    location: 'Ambas',
    category: 'monogastrico',
    image: '/animals/cerdo.jpg',
    ranges: {
      hct: { min: 32, max: 50, typical: 41 },
      hb: { min: 10, max: 16, typical: 13 },
      alt: { min: 0, max: 2500, typical: 1000 }
    },
    fact: 'No sudan, por lo que dependen de la sombra y el lodo para termorregularse.',
    description: 'Monogástricos criados principalmente para producción de carne.'
  },
  {
    id: 'equino',
    name: 'Caballo',
    scientificName: 'Equus caballus',
    location: 'Ambas',
    category: 'monogastrico',
    image: '/animals/caballo.jpg',
    ranges: {
      hct: { min: 32, max: 52, typical: 42 },
      hb: { min: 11, max: 19, typical: 15 },
      alt: { min: 0, max: 3500, typical: 1500 }
    },
    fact: 'Poseen un bazo muy contráctil que libera glóbulos rojos durante el ejercicio.',
    description: 'Animales de trabajo y monta con gran capacidad aeróbica.'
  },
  {
    id: 'aviar-broiler',
    name: 'Pollo Broiler',
    scientificName: 'Gallus gallus domesticus',
    location: 'Costa',
    category: 'aviar',
    image: '/animals/pollo.png',
    ranges: {
      hct: { min: 25, max: 40, typical: 32 },
      hb: { min: 8, max: 14, typical: 11 },
      alt: { min: 0, max: 1000, typical: 100 }
    },
    fact: 'Tienen glóbulos rojos nucleados, a diferencia de los mamíferos.',
    description: 'Aves de rápido crecimiento, sensibles a la altitud y temperaturas extremas.'
  },
  {
    id: 'aviar-ponedora',
    name: 'Gallina Ponedora',
    scientificName: 'Gallus gallus domesticus',
    location: 'Ambas',
    category: 'aviar',
    image: '/animals/gallina.png',
    ranges: {
      hct: { min: 28, max: 45, typical: 36 },
      hb: { min: 9, max: 15, typical: 12 },
      alt: { min: 0, max: 2000, typical: 500 }
    },
    fact: 'El color de la cáscara del huevo depende de la genética de la gallina, no de su nutrición.',
    description: 'Aves criadas para la producción constante de huevos.'
  }
];
