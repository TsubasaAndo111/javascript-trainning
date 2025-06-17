const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
const sumMath = data.reduce((x, y) => x + y.math, 0);

// クラスAのchemistryの平均点
let lenChemiClassA = 0;
let sumChemiClassA = 0;
data
  .filter((x) => x.class === "A")
  .forEach((x) => {
    sumChemiClassA += x.chemistry;
    lenChemiClassA++;
  });
const aveChemiClassA = sumChemiClassA / lenChemiClassA;

// 3科目合計点のクラスC内での平均点
let lenClassC = 0;
let sumClassC = 0;
data
  .filter((x) => x.class === "C")
  .forEach((x) => {
    sumClassC = sumClassC + x.math + x.chemistry + x.geography;
    lenClassC++;
  });
const aveClassC = sumClassC / lenClassC;

// 3科目合計点が最も高い人のname
let maxPersonName = "";
let maxSum = 0;
data.forEach((x) => {
  let sum = x.math + x.chemistry + x.geography;
  if (sum > maxSum) {
    maxSum = sum;
    maxPersonName = x.name;
  }
});

// 全体のgeographyの標準偏差
const aveGeography = data.reduce((x, y) => x + y.geography, 0)/data.length;
const sdGeography = Math.sqrt(data.reduce((x, y) => x + (y.geography-aveGeography)**2, 0)/data.length);

console.log(sumMath); // 530
console.log(aveChemiClassA); // 45
console.log(aveClassC); // 176.66666666666666
console.log(maxPersonName); // Frank
console.log(sdGeography) // 22.3330569358242

