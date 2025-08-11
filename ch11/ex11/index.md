# 実行内容
console.log(costOfLength(1));
console.log(costOfLength(10));
console.log(costOfLength(100));
console.log(costOfLength(1000));
console.log(costOfLength(10000));
console.log(costOfLength(100000));
console.log(costOfLength(1000000));
console.log(costOfLength(10000000));
console.log(costOfLength(100000000));
console.log(costOfLength(1000000000));
console.log(costOfLength(10000000000));
console.log(costOfLength(100000000000));

# 実行結果
0.0029000000000038995
0.00021999999999948726
0.0008180000000000831
0.000009199999999999875
0.000003350000000000364
0.000005215999999999994
-2.937999999999974e-7
2.2199999999998e-9
2.860000000000085e-9
-6.1431999999999785e-9
-1.456982999999991e-8
-1.262270000000004e-8

# 結果の考察
最適化コンパイラによって、ループ内で同じ結果を返すコードはループの外に移動されてしまうことがある(LCM)
また、ループ内の操作が完全に定数であれば、コンパイル時にその値に置き換えられてしまうこともある。
そのため、今回のようなHello.lengthはループの外に移動・定数として扱われたと考えられる。
また、performance.now()の精度はミリ秒単位であり、ナノ秒単位の高精度での測定はできない。
したがって、今回の「Hello.lengthのループ - 何もしないループ」はループのオーバーヘッドや測定誤差のみを比較したこととなり、負の値になったり、回数を重ねるごとに実行時間が変化したりしたと考えられる。