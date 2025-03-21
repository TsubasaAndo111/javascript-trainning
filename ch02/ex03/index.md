## 濁音や半濁音を含むファイル名のファイルを作ったとき、Windows と macOS では NFC と NFD どちらの形式で保存されるかを調べて記述しなさい<br>

・WindowsはNFC(Linuxなど基本的にはNFC方式を採用していることが多いらしい)<br>
・MacはNFD<br>

方式が異なることで、Windowsで作成したファイル名をMacで探そうとしたときに同じ名前と認識されず、うまく計算されないことがあるらしい（見た目はほぼ同じだけど、データが異なるため）

https://zenn.dev/hacobell_dev/articles/68ccc92bffd6cc
