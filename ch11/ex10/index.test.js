import { getDaysInMonth, countWeekdays, getWeekdayName, getFirstDayOfLastMonth } from "./index.js";


  describe("getDaysInMonth", () => {
    test("2月 (うるう年) は29日", () => {
      expect(getDaysInMonth(2024, 2)).toBe(29);
    });
  
    test("2月 (平年) は28日", () => {
      expect(getDaysInMonth(2023, 2)).toBe(28);
    });
  
    test("4月は30日", () => {
      expect(getDaysInMonth(2025, 4)).toBe(30);
    });
  
    test("12月は31日", () => {
      expect(getDaysInMonth(2025, 12)).toBe(31);
    });
  });
  
  describe("countWeekdays", () => {
    test("2025-08-04(月)〜2025-08-08(金) は5営業日", () => {
      expect(countWeekdays("2025-08-04", "2025-08-08")).toBe(5);
    });
  
    test("土日を含む週は営業日が減る", () => {
      expect(countWeekdays("2025-08-01", "2025-08-07")).toBe(5);
    });
  
    test("全て土日の場合は0", () => {
      expect(countWeekdays("2025-08-02", "2025-08-03")).toBe(0);
    });
  
    test("1日だけで平日なら1", () => {
      expect(countWeekdays("2025-08-05", "2025-08-05")).toBe(1);
    });
  
    test("1日だけで土日なら0", () => {
      expect(countWeekdays("2025-08-03", "2025-08-03")).toBe(0); 
    });
  });
  
  describe("getWeekdayName", () => {
    test("2025-08-07 は 木曜日 (ja-JP)", () => {
      expect(getWeekdayName("2025-08-07", "ja-JP")).toBe("木曜日");
    });
  
    test("2025-08-07 は Thursday (en-US)", () => {
      expect(getWeekdayName("2025-08-07", "en-US")).toBe("Thursday");
    });
  
    test("2025-08-03 は 日曜日 (ja-JP)", () => {
      expect(getWeekdayName("2025-08-03", "ja-JP")).toBe("日曜日");
    });
  });
  
  describe("getFirstDayOfLastMonth", () => {
    test("先月1日 0:00:00 のDateが返る (ローカルタイム)", () => {
      const result = getFirstDayOfLastMonth();
      const now = new Date();
  
      // 現在の月の1日
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthEnd = new Date(currentMonthStart);
      lastMonthEnd.setDate(0); // 前月末日
  
      const expected = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth(), 1);
      expected.setHours(0, 0, 0, 0);
  
      expect(result).toEqual(expected)
    });
  });
  