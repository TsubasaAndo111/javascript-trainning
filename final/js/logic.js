/*
データ作成と判定モジュール
*/

export const CoreLogic = {
  // 問題を取得し、その場で待ち牌を自動計算して返す
  getQuestion: function () {
    // 50%の確率で意図的に聴牌を作るか、完全ランダムにするかを分岐
    const isTenpaiBias = Math.random() < 0.5;
    let hand13 = [];

    if (isTenpaiBias) {
      // 【聴牌確定ルート】アガリ形から1枚抜いて作る
      while (true) {
        const agari14 = this.generateAgariHand();
        if (!agari14) continue;

        const removeIndex = Math.floor(Math.random() * 14);
        hand13 = [...agari14];
        hand13.splice(removeIndex, 1);
        hand13.sort((a, b) => a - b);

        // 確実に待ちが存在するかチェックしてから採用
        if (this.calculateWaits(hand13).length > 0) break;
      }
    } else {
      // 【完全ランダムルート】36枚の山から13枚引く（高確率でノーテン）
      hand13 = this.generateRandomHand();
    }

    return {
      hand: hand13,
      waits: this.calculateWaits(hand13), // ノーテンなら [] が入る
    };
  },

  // 内部関数：36枚の山牌からランダムに13枚抽出する
  generateRandomHand: function () {
    const deck = [];
    for (let i = 1; i <= 9; i++) {
      deck.push(i, i, i, i); // 1〜9を4枚ずつ
    }
    // シャッフル（フィッシャー–イェーツのアルゴリズム）
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck.slice(0, 13).sort((a, b) => a - b);
  },
  // 内部関数：4面子1雀頭の正しいアガリ形（14枚）をランダムに作る
  generateAgariHand: function () {
    const counts = new Array(10).fill(0);
    const head = Math.floor(Math.random() * 9) + 1;
    counts[head] += 2;

    for (let i = 0; i < 4; i++) {
      const isKoutsu = Math.random() < 0.3;
      if (isKoutsu) {
        const koutsu = Math.floor(Math.random() * 9) + 1;
        counts[koutsu] += 3;
      } else {
        const shuntsuStart = Math.floor(Math.random() * 7) + 1;
        counts[shuntsuStart]++;
        counts[shuntsuStart + 1]++;
        counts[shuntsuStart + 2]++;
      }
    }

    for (let i = 1; i <= 9; i++) {
      if (counts[i] > 4) return null;
    }

    const hand = [];
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < counts[i]; j++) {
        hand.push(i);
      }
    }
    return hand;
  },

  // ユーザーの回答と自動計算した正解を比較する（変更なし）
  checkAnswer: function (userWaits, correctWaits) {
    const userStr = userWaits.slice().sort().join(",");
    const correctStr = correctWaits.slice().sort().join(",");
    return userStr === correctStr;
  },

  // ==========================================
  // ★自動計算アルゴリズム群★
  // ==========================================

  // 13枚の手牌から、待ち牌の配列を計算して返す関数
  calculateWaits: function (hand13) {
    const waits = [];

    // 1から9まで、順番に手牌に入れてアガリか判定する
    for (let i = 1; i <= 9; i++) {
      // 手牌に同じ牌がすでに4枚ある場合は待ちになり得ない（スキップ）
      const count = hand13.filter((n) => n === i).length;
      if (count >= 4) continue;

      // 1枚追加して14枚の手牌を作り、昇順に並べる
      const hand14 = [...hand13, i];
      hand14.sort((a, b) => a - b);

      // 14枚がアガリ形になっていれば、その牌は待ち牌
      if (this.isAgari(hand14)) {
        waits.push(i);
      }
    }
    return waits;
  },

  // 14枚の手牌がアガリの形かを判定する関数
  isAgari: function (hand14) {
    // 各数字（1〜9）が何枚あるかを数える配列（インデックス0は不使用）
    const counts = new Array(10).fill(0);
    for (const tile of hand14) {
      counts[tile]++;
    }

    // 【判定1】七対子（チートイツ）の確認
    let pairCount = 0;
    for (let i = 1; i <= 9; i++) {
      if (counts[i] === 2) pairCount++;
    }
    if (pairCount === 7) return true;

    // 【判定2】一般的なアガリ形（4面子1雀頭）の確認
    for (let i = 1; i <= 9; i++) {
      // 2枚以上ある牌を「雀頭（アタマ）」として仮定し、2枚抜く
      if (counts[i] >= 2) {
        counts[i] -= 2;

        // 残りの牌がすべて面子（順子か刻子）になるか判定
        if (this.checkMentsu([...counts])) {
          return true;
        }

        // ならなければ、雀頭の仮定をキャンセルして牌を戻す
        counts[i] += 2;
      }
    }
    return false;
  },

  // 残りの牌がすべて面子に分解できるかを判定する関数（再帰関数）
  checkMentsu: function (counts) {
    // 残り枚数を確認。0枚になっていれば、すべて面子に分解できた証拠（成功）
    const totalTiles = counts.reduce((sum, num) => sum + num, 0);
    if (totalTiles === 0) return true;

    // 一番数字が小さい牌を探す
    let i = 1;
    while (i <= 9 && counts[i] === 0) {
      i++;
    }

    // パターンA：刻子（同じ牌3枚）として処理できるか試す
    if (counts[i] >= 3) {
      counts[i] -= 3;
      // 抜いた状態でさらに面子分解できるか自分自身を呼び出す（再帰）
      if (this.checkMentsu(counts)) return true;
      counts[i] += 3; // 失敗したら元に戻す
    }

    // パターンB：順子（連番3枚）として処理できるか試す
    if (i <= 7 && counts[i] >= 1 && counts[i + 1] >= 1 && counts[i + 2] >= 1) {
      counts[i]--;
      counts[i + 1]--;
      counts[i + 2]--;
      // 抜いた状態でさらに面子分解できるか自分自身を呼び出す（再帰）
      if (this.checkMentsu(counts)) return true;
      counts[i]++;
      counts[i + 1]++;
      counts[i + 2]++; // 失敗したら元に戻す
    }

    // 刻子としても順子としても分解できなければ、この組み合わせは失敗
    return false;
  },
};
