function showMessage() {
  document.getElementById('message').innerText = 'Oikein!';
}

let X = 300;
let Y = 400;


window.addEventListener('load', (event) => {
  let img = document.querySelector('img');
  let invisiblebutton = document.getElementById('invisiblebutton');
  
  invisiblebutton.style.left = minimiX + 'px';
  invisiblebutton.style.top = minimiY + 'px';
  invisiblebutton.style.width = (maksimiX - minimiX) + 'px';
  invisiblebutton.style.height = (maksimiY - minimiY) + 'px';


  img.addEventListener("click", function(event) {
    alert(`(${event.offsetX},${event.offsetY})`);
  });
});

if (X > minimiX && X < maksimiX && Y > minimiY && Y < maksimiY) {
  // Do something
}
