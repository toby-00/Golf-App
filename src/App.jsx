import { strokesGainedTable } from '../data/strokesGainedTable';

export function calculateSG(startDist, endDist, lieType, isPutt = false) {
  const from = strokesGainedTable[lieType][startDist];
  const to = isPutt ? strokesGainedTable.green[endDist] : strokesGainedTable['green'][3];
  return from - to - 1;
}

