import { littleToBigEndian, bigToLittleEndian } from "./index.js";

describe("littleToBigEndian", () => {

  test("リトルからビッグへの変換", () => {
    const input = new Uint32Array([0x78563412, 0xDDCCBBAA]);
    const expected = new Uint32Array([0x12345678, 0xAABBCCDD]);

    const result = bigToLittleEndian(input);

    expect(result).toEqual(expected);
  });
});

describe("bitToLittleEndian", () => {
    test("ビッグからリトルへの変換", () => {
        const input = new Uint32Array([0x78563412, 0xDDCCBBAA]);
        const expected = new Uint32Array([0x12345678, 0xAABBCCDD]);
    
        const result = bigToLittleEndian(input);
    
        expect(result).toEqual(expected);
      });

  });
  