const fs = require("fs");

async function main() {
  const file = await fs.promises.open("./file.txt", "r");
  const stat = await file.stat();

  const CHUNK = 64 * 1024;
  const chunks = [];
  let offset = 0;

  while (offset < stat.size) {
    const len = Math.min(CHUNK, stat.size - offset);
    const buf = Buffer.allocUnsafe(len);
    const { bytesRead } = await file.read(buf, 0, len, offset);
    if (bytesRead === 0) break;
    chunks.push(buf.subarray(0, bytesRead));
    offset += bytesRead;
  }
  await file.close();

  const body = Buffer.concat(chunks);

  const res = await fetch("http://localhost:8000/test/hello.txt", {
    method: "PUT",
    body,
    duplex: "half",
  });
  console.log(res.status, await res.text());
}

main().catch(console.error);
