const users = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
  ];
  
  function getUserNames(users) {
    debugger; // ここで配列の中身を確認
    return users.map(user => user.name);
  }
  
  function calculateAverageAge(users) {
    debugger; // 合計やカウントの確認に便利
    let total = 0;
    for (let i = 0; i < users.length; i++) {
      total += users[i].age;
    }
    return total / users.length;
  }
  
  function main() {
    const names = getUserNames(users);
    console.log('User names:', names);
  
    const avgAge = calculateAverageAge(users);
    console.log('Average age:', avgAge);
  }
  
  main();
  