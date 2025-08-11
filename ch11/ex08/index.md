# 考察
最後に!がついていることでbackトラッキングが発生し、非常に長い処理時間となる。
まず、(a|aa)+を貪欲に探索することで、aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaまでマッチする。
しかし、最後に!がついていることで失敗する。
その後、可能な限り、(a|aa)+にマッチするような組み合わせを探索しようとするが、すべて失敗する。
また、その組み合わせは非常に多いため、処理時間が非常に長くなり、最悪の場合フリーズする。
参考：https://ja.javascript.info/regexp-catastrophic-backtracking