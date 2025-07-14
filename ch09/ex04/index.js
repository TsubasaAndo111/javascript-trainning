// --------------------------------------------------------------
// classを使った記法
// 戦士クラス
export class Warrior {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

// 魔法戦士クラス（戦士を継承）
export class MagicWarrior extends Warrior {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}

// --------------------------------------------------------------
// prototypeを使った記法
// 戦士のコンストラクタ関数
export function Warrior(atk) {
  this.atk = atk;
}

Warrior.prototype.attack = function () {
  return this.atk * 2;
};

// 魔法戦士のコンストラクタ関数
export function MagicWarrior(atk, mgc) {
  Warrior.call(this, atk); // Warriorのコンストラクタを継承
  this.mgc = mgc;
}

// MagicWarriorのプロトタイプが、Warriorプロトタイプを継承するようにする
MagicWarrior.prototype = Object.create(Warrior.prototype);

// コンストラクタは継承ではなく、独自に定義
MagicWarrior.prototype.constructor = MagicWarrior;

// attack メソッドのオーバーライド
MagicWarrior.prototype.attack = function () {
  return Warrior.prototype.attack.call(this) + this.mgc;
};

// --------------------------------------------------------------