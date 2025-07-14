# 当初のプログラムの問題点（メモ）
以下の部分が問題。

    pushAll(...items) {
      super.pushAll(...items);
      this.#pushCount += items.length;
    }

super.pushAll(...items);の処理は以下のようになっている。
つまり、thisのpushを呼び出しているわけだから、InstrumentedLinkedListからsuperで呼び出した場合、thisはInstrumentedLinkedListとなり、サブクラスのpushが呼び出されてしまう。

そのため、pushAll内と、push内で2重にカウントしてしまい、テストケースをパスできなかった。

    pushAll(...items) {
      items.forEach((item) => this.push(item));
    }

pushAllをオーバーライドしなければ、2重にカウントすることがなく、テストケースもパスできる。

