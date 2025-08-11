# CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい
1. AMD（Asynchronous Module Definition）
非同期にモジュールを読み込む方式。
require関数は同期的に読み込むことが期待されているが、ブラウザ上の通信は非同期で行うことが普通。
このモジュール方式の代表的なライブラリはRequreJS


2. UMD（Universal Module Definition）
以下の３つの利用形式に対応するために考案されたモジュール方式
ユーザの実行環境を判断して、最適な方法でライブラリを読み込むようにしてくれる。
- グローバル変数(モジュール方式がなかった古い時代の環境のため)
- Common JS(Node.jsの環境のため)
- AMD(ブラウザ環境のため)


3. IIFE（Immediately Invoked Function Expression）
即時関数でモジュール化のようなスコープ分離を実現する方法。
モジュールシステムがなかった時代に主流だった。