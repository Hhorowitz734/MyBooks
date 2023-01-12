// Controls stars
const allStars = document.querySelectorAll('.star');

allStars.forEach((star, i) => {
    star.onclick = function(event){
        event.preventDefault();
        allStars.forEach((star, j) => {
            if (i >= j){
                star.innerHTML = '&#9733';
            }
            else {
                star.innerHTML = '&#9734;';
            }
        });
    }
});

//https://www.youtube.com/watch?v=lzK8vM_wdoY <-- USE THIS TO DISPLAY IMAGE LATER
