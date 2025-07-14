// instanceof演算子は、あるコンストラクターのprototypeプロパティが、あるオブジェクトのプロトタイプチェーン中のどこかに現れるかを検査する
export function instanceOf(object, constructor) {
    if (object == null || typeof object !== 'object') return false;
  
    // Object.getPrototypeOf(object)で一つ上のプロトタイプを取得
    let proto = Object.getPrototypeOf(object);
    const prototype = constructor.prototype;
  
    // プロトタイプチェーンをたどりながら、コンストラクターのprototypeプロパティと比較
    while (proto !== null) {
      if (proto === prototype) {
        return true;
      }
      // さらに一つ上のプロトタイプを取得
      proto = Object.getPrototypeOf(proto);
    }
  
    return false;
  }
  