export function littleToBigEndian(uint32array) {
  const inputView = new DataView(
    uint32array.buffer,
    uint32array.byteOffset,
    uint32array.byteLength
  );
  const buffer = new ArrayBuffer(uint32array.length * 4);
  const outputView = new DataView(buffer);

  for (let i = 0; i < uint32array.length; i++) {
    const offset = i * 4;
    // リトルエンディアンで読み取り
    const value = inputView.getUint32(offset, true); // 読み取り時に littleEndian = true
    // ビッグエンディアンで書き込み
    outputView.setUint32(offset, value, false); // 書き込み時に littleEndian = false
  }

  return new Uint32Array(buffer);
}

export function bigToLittleEndian(uint32array) {
  const inputView = new DataView(
    uint32array.buffer,
    uint32array.byteOffset,
    uint32array.byteLength
  );
  const buffer = new ArrayBuffer(uint32array.length * 4);
  const outputView = new DataView(buffer);

  for (let i = 0; i < uint32array.length; i++) {
    const offset = i * 4;
    // ビッグエンディアンで読み取り
    const value = inputView.getUint32(offset, false); // 読み取り時に littleEndian = false
    // リトルエンディアンで書き込み
    outputView.setUint32(offset, value, true); // 書き込み時に littleEndian = true
  }

  return new Uint32Array(buffer);
}
