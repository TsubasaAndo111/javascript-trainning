function g1() {
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

function g2() {
  return wait(1000)
    .then(() => console.log("A"))
    .then(() => wait(2000))
    .then(() => console.log("B"))
    .then(() => wait(3000))
    .then(() => console.log("C"));
}

function g3() {
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }
  // .thenの中でfetchUserFriends(user).thenを返すことでuserのスコープ内となり、user.nameで表記できる
  return fetchUser().then((user) => {
    return fetchUserFriends(user).then((friends) => {
      console.log(`${user.name} has ${friends.length} friends!`);
    });
  });
}

function g4() {
  function someFunction() {
    return 42;
  }
  // Promise.resolve() で包むことで、new Promise を使わずに Promise を返せる
  return Promise.resolve(someFunction());
}
