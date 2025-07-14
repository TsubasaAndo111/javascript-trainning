import {
  State,
  Action,
  setAlarm,
  cancelAlarm,
  reachedToAlarmTime,
  snooze,
  elapseSnoozeTime,
} from "./index.js";

describe("Alarm Clock State Transitions", () => {
  test("通常 → アラーム設定 → アラームセット中", () => {
    const { nextState, action } = setAlarm(State.NORMAL);
    expect(nextState).toBe(State.ALARM_SET);
    expect(action).toBe(Action.NONE);
  });

  test("アラームセット中 → アラーム設定時刻到達 → アラーム鳴動中", () => {
    const { nextState, action } = reachedToAlarmTime(State.ALARM_SET);
    expect(nextState).toBe(State.ALARM_SOUNDING);
    expect(action).toBe(Action.SOUND_ALARM);
  });

  test("アラーム鳴動中→ スヌーズ → スヌーズ中", () => {
    const { nextState, action } = snooze(State.ALARM_SOUNDING);
    expect(nextState).toBe(State.SNOOZING);
    expect(action).toBe(Action.STOP_ALARM);
  });

  test("スヌーズ中 → スヌーズ設定時間経過 → アラーム鳴動中", () => {
    const { nextState, action } = elapseSnoozeTime(State.SNOOZING);
    expect(nextState).toBe(State.ALARM_SOUNDING);
    expect(action).toBe(Action.SOUND_ALARM);
  });

  test("アラームセット中 → アラーム解除 → 通常", () => {
    const { nextState, action } = cancelAlarm(State.ALARM_SET);
    expect(nextState).toBe(State.NORMAL);
    expect(action).toBe(Action.NONE);
  });

  test("アラーム鳴動中 → アラーム解除 → 通常", () => {
    const { nextState, action } = cancelAlarm(State.ALARM_SOUNDING);
    expect(nextState).toBe(State.NORMAL);
    expect(action).toBe(Action.STOP_ALARM);
  });
  test("スヌーズ中 → アラーム解除 → 通常", () => {
    const { nextState, action } = cancelAlarm(State.SNOOZING);
    expect(nextState).toBe(State.NORMAL);
    expect(action).toBe(Action.NONE);
  });
});
