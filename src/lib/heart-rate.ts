export type HeartRateReading = {
  bpm: number;
  timestamp: number;
};

export function parseHeartRateMeasurement(value: DataView): number | null {
  const flags = value.getUint8(0);
  const is16Bit = (flags & 0x01) === 1;

  let index = 1;
  if (is16Bit) {
    if (value.byteLength < 3) {
      return null;
    }
    return value.getUint16(index, true);
  }

  if (value.byteLength < 2) {
    return null;
  }

  return value.getUint8(index);
}
