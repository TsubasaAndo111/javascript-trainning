console.log("整数の最大値：" + Number.MAX_VALUE);
console.log("整数の最小値：" + Number.MIN_VALUE);
console.log("最大値+1 == 最大値+2");
//最大値+1、最大値+2の計算結果の両方でオーバーフローが発生し、Infinityとなるため結果はtrueとなる
console.log(Number.MAX_VALUE + 1 === Number.MAX_VALUE + 2);
