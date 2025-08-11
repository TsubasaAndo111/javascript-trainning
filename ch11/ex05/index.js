export function detectFileType(buffer) {
    const bytes = new Uint8Array(buffer);
  
    // PDF: 25 50 44 46 (%PDF)
    if (bytes.slice(0, 4).every((b, i) => b === [0x25, 0x50, 0x44, 0x46][i])) {
      return "PDF";
    }
  
    // ZIP: 50 4B 03 04 or 50 4B 05 06 or 50 4B 07 08
    const zipSignatures = [
      [0x50, 0x4b, 0x03, 0x04],
      [0x50, 0x4b, 0x05, 0x06],
      [0x50, 0x4b, 0x07, 0x08],
    ];
    for (const sig of zipSignatures) {
      if (bytes.slice(0, sig.length).every((b, i) => b === sig[i])) {
        return "ZIP";
      }
    }
  
    // GIF: 47 49 46 38 37 61 (GIF87a) or 38 39 61 (GIF89a)
    const gifSignatures = [
        [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]
    ]
    for (const sig of gifSignatures) {
        if (bytes.slice(0, sig.length).every((b, i) => b === sig[i])) {
          return "GIF";
        }
      }
  
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    if (bytes.slice(0, pngSignature.length).every((b, i) => b === pngSignature[i])) {
      return "PNG";
    }
  
    // その他は UNKNOWN
    return "UNKNOWN";
  }
  