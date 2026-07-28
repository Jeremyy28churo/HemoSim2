export const HUFNER_CONSTANT = 1.34; // mL O2 per g of Hb

export const calculateO2Capacity = (hb: number): number => {
  return hb * HUFNER_CONSTANT;
};

export const calculateO2Saturation = (altitude: number, isHighAltitudeAdapted: boolean = false): number => {
  // Base saturation at sea level is ~99%
  // Especies adaptadas a la altura tienen mayor afinidad por el O2 (curva desplazada a la izquierda)
  const dropRate = isHighAltitudeAdapted ? 1.5 : 6.0; 
  
  const drop = (altitude / 1000) * dropRate;
  const sat = 99 - drop;
  
  const minSat = isHighAltitudeAdapted ? 75 : 50;
  return Math.max(minSat, Math.min(100, sat)); 
};

export const calculateBloodVolume = (weight: number, category: 'rumiante' | 'monogastrico' | 'aviar'): number => {
  // Approx blood volume: 70ml/kg for ruminants, 75ml/kg for monogastrics, 85ml/kg for avians
  let factor = 70;
  if (category === 'monogastrico') factor = 75;
  if (category === 'aviar') factor = 85;
  return weight * factor;
};

export const calculateAdaptationIndex = (hct: number, altitude: number, baseHct: number): number => {
  // Rough estimate of adaptation based on Hct response to altitude
  // If altitude is high, Hct should be higher than base
  if (altitude < 500) return 100; // Well adapted to low altitude by default
  
  const expectedHctIncrease = (altitude / 1000) * 2; // Expect 2% increase per 1000m
  const optimalHct = baseHct + expectedHctIncrease;
  
  const diff = Math.abs(hct - optimalHct);
  const index = 100 - (diff * 5); // Lose 5% for every point of mismatch
  return Math.max(0, Math.min(100, index));
};

export const checkRanges = (val: number, min: number, max: number): 'low' | 'normal' | 'high' => {
  if (val < min) return 'low';
  if (val > max) return 'high';
  return 'normal';
};
