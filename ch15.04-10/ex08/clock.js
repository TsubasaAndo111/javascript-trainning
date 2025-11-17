(function updateClock() {
  let now = new Date();
  let sec = now.getSeconds();
  let min = now.getMinutes() + sec / 60;
  let hour = (now.getHours() % 12) + min / 60;

  let secangle = sec * 6;
  let minangle = min * 6;
  let hourangle = hour * 30;

  let sechand = document.querySelector("#clock .secondhand");
  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");

  if (!sechand) {
    let hands = clock.querySelector(".hands");
    sechand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sechand.setAttribute("class", "secondhand");
    sechand.setAttribute("x1", "50");
    sechand.setAttribute("y1", "50");
    sechand.setAttribute("x2", "50");
    sechand.setAttribute("y2", "15");
    sechand.setAttribute("stroke", "red"); //見やすいように線を赤くしておく
    sechand.setAttribute("stroke-width", "1"); //見やすいように線を細くしておく
    hands.appendChild(sechand);
  }

  sechand.setAttribute("transform", `rotate(${secangle},50,50)`);
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);

  setTimeout(updateClock, 1000);
})();
