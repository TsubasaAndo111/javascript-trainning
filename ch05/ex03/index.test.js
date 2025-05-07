import { month } from "./index.js";

describe("if-else", () => {
  it("aaa", () => {
    expect(month.ifelse("aaa")).toBe(false);
  });

  it("null", () => {
    expect(month.ifelse()).toBe(false);
  });

  it("Jan", () => {
    expect(month.ifelse("Jan")).toBe(true);
  });

  it("Feb", () => {
    expect(month.ifelse("Feb")).toBe(false);
  });

  it("Mar", () => {
    expect(month.ifelse("Mar")).toBe(true);
  });

  it("Apr", () => {
    expect(month.ifelse("Apr")).toBe(false);
  });

  it("May", () => {
    expect(month.ifelse("May")).toBe(true);
  });

  it("Jun", () => {
    expect(month.ifelse("Jun")).toBe(false);
  });

  it("Jul", () => {
    expect(month.ifelse("Jul")).toBe(true);
  });

  it("Aug", () => {
    expect(month.ifelse("Aug")).toBe(true);
  });

  it("Sep", () => {
    expect(month.ifelse("Sep")).toBe(false);
  });

  it("Oct", () => {
    expect(month.ifelse("Oct")).toBe(true);
  });

  it("Nov", () => {
    expect(month.ifelse("Nov")).toBe(false);
  });

  it("Dec", () => {
    expect(month.ifelse("Dec")).toBe(true);
  });
});

describe("switch", () => {
  it("aaa", () => {
    expect(month.switch("aaa")).toBe(false);
  });

  it("null", () => {
    expect(month.switch()).toBe(false);
  });

  it("Jan", () => {
    expect(month.switch("Jan")).toBe(true);
  });

  it("Feb", () => {
    expect(month.switch("Feb")).toBe(false);
  });

  it("Mar", () => {
    expect(month.switch("Mar")).toBe(true);
  });

  it("Apr", () => {
    expect(month.switch("Apr")).toBe(false);
  });

  it("May", () => {
    expect(month.switch("May")).toBe(true);
  });

  it("Jun", () => {
    expect(month.switch("Jun")).toBe(false);
  });

  it("Jul", () => {
    expect(month.switch("Jul")).toBe(true);
  });

  it("Aug", () => {
    expect(month.switch("Aug")).toBe(true);
  });

  it("Sep", () => {
    expect(month.switch("Sep")).toBe(false);
  });

  it("Oct", () => {
    expect(month.switch("Oct")).toBe(true);
  });

  it("Nov", () => {
    expect(month.switch("Nov")).toBe(false);
  });

  it("Dec", () => {
    expect(month.switch("Dec")).toBe(true);
  });
});
