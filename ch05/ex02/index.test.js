import { escape } from "./index.js";

describe("if-else", () => {
  it("if-else", () => {
    expect(escape.ifelse("aa0ccbstmnfavaaraa\"aa'cc\\aacc")).toBe("aa\\0cc\\bs\\tm\\n\\fa\\vaa\\raa\\\"aa\\\'cc\\\\aacc");
  });
});

describe("switch", () => {
  it("switch", () => {
    expect(escape.switch("aa0ccbstmnfavaaraa\"aa'cc\\aacc")).toBe("aa\\0cc\\bs\\tm\\n\\fa\\vaa\\raa\\\"aa\\\'cc\\\\aacc");
  });
});
