export function fizzbuzz(){let results = "";for(let i = 1; i <= 100; i++){if(i%15==0){results+="FizzBuzz\n";}else if(i%3==0){results+="Fizz\n";}else if(i%5==0){results+="Buzz\n";}else{results+=i+"\n"}}return results;}

fizzbuzz() // 関数を呼び出している、テスト用