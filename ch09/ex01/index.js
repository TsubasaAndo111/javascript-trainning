export class C {
  // 静的メソッドはコンストラクタに対して呼び出されるから、C.method()
  static method() {
    return 1;
  }

  // インスタンスメソッドなので、new C().method()
  method() {
    return 2;
  }

  // 静的プロパティとしてクラスCを定義 C.C
  static C = class {
    // 静的メソッドはコンストラクタに対して呼び出されるから、C.C.method()
    static method() {
      return 3;
    }

    // インスタンスメソッドなので、new C.C().method()
    method() {
      return 4;
    }
  };

  // インスタンスプロパティなので、new C().C
  C = class {
    // 静的メソッドはコンストラクタに対して呼び出されるから、new C().C.method()
    static method() {
      return 5;
    }

    // インスタンスメソッドなので、new C().C().method()
    method() {
      return 6;
    }
  };
}
