
window.addEventListener('load', (event) => {
  let img = document.querySelector('img');
  let invisiblebutton = document.querySelector('.invisiblebutton');

  invisiblebutton.addEventListener("click", function(event) {
    let X = event.offsetX;
    let Y = event.offsetY;
    
    // Define the coordinates of the target area (in this example, a square in the middle of the page)
    let targetX = img.offsetWidth / 2; // Center X coordinate
    let targetY = img.offsetHeight / 2; // Center Y coordinate
    let targetSize = 5; // Half of the side length of the square (5 pixels in this example)

    // Check if the click is within the target area
    if (X >= targetX - targetSize && X <= targetX + targetSize &&
        Y >= targetY - targetSize && Y <= targetY + targetSize) {
        alert('You clicked the correct pixel!');
    }
  });
});