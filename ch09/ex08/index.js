export const State = Object.freeze({
    NORMAL: Symbol("normal"),
    ALARM_SET: Symbol("alarmSet"),
    ALARM_SOUNDING: Symbol("alarmSounding"),
    SNOOZING: Symbol("snoozing"),
  });
  
  export const Action = Object.freeze({
    NONE: Symbol("none"),
    SOUND_ALARM: Symbol("soundAlarm"),
    STOP_ALARM: Symbol("stopAlarm"),
  });
  
  // 関数型プログラミングで改良
  // 状態遷移が関数になったことで、状態間の遷移を直接指定してテストできる
  export function setAlarm(state) {
    switch (state) {
      case State.NORMAL:
        return { nextState: State.ALARM_SET, action: Action.NONE };
      default:
        return { nextState: state, action: Action.NONE };
    }
  }
  
  export function cancelAlarm(state) {
    switch (state) {
      case State.ALARM_SET:
        return { nextState: State.NORMAL, action: Action.NONE };
      case State.ALARM_SOUNDING:
        return { nextState: State.NORMAL, action: Action.STOP_ALARM };
      case State.SNOOZING:
        return { nextState: State.NORMAL, action: Action.NONE };
      default:
        return { nextState: state, action: Action.NONE };
    }
  }
  
  export function reachedToAlarmTime(state) {
    switch (state) {
      case State.ALARM_SET:
        return { nextState: State.ALARM_SOUNDING, action: Action.SOUND_ALARM };
      default:
        return { nextState: state, action: Action.NONE };
    }
  }
  
  export function snooze(state) {
    switch (state) {
      case State.ALARM_SOUNDING:
        return { nextState: State.SNOOZING, action: Action.STOP_ALARM };
      default:
        return { nextState: state, action: Action.NONE };
    }
  }
  
  export function elapseSnoozeTime(state) {
    switch (state) {
      case State.SNOOZING:
        return { nextState: State.ALARM_SOUNDING, action: Action.SOUND_ALARM };
      default:
        return { nextState: state, action: Action.NONE };
    }
  }
  