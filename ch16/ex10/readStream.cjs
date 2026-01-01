const fs = require("fs");

async function main() {
  // fs.createReadStream
  const res = await fetch("http://localhost:8000/test/hello.txt", {
    method: "PUT",
    body: fs.createReadStream("./file.txt"),
    duplex: "half",
  });

  console.log(res.status, await res.text());
}

main().catch(console.error);
