// Getting elements
const allStars = document.querySelectorAll('.star');
const nbSubmitBtn = document.querySelector('#submit-nb');
const nbDiv = document.querySelector('.bg-modal');
const nbModal = document.querySelector('.nb-modal-content');
const booksContainer = document.querySelector('.books-container');
const addBtn = document.querySelector('#add-btn');
const imgUpload = document.querySelector('#img-upload');
let bookDicts = []; //List for dict of all added books
let currentStar = null;
let currentImg = null;

// Event handlers
nbSubmitBtn.addEventListener('click', addBook)
addBtn.addEventListener('click', () => {
    nbDiv.style.pointerEvents = 'auto';
    nbDiv.style.display = 'flex';
});
imgUpload.addEventListener('change', function(){
    const reader = new FileReader();
    reader.readAsDataURL(imgUpload.files[0])
    reader.addEventListener('load', () => {
        currentImg = reader.result;
    });
})



//Controls star rating system
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
        currentStar = i + 1;
    }
});
//https://www.youtube.com/watch?v=lzK8vM_wdoY <-- USE THIS TO DISPLAY IMAGE LATER


// Functions
function addBook(event){
    // Prevents reload
    event.preventDefault();

    //Creates dict of form values to store for later
    let nbDict = {
        'Title': document.getElementById('book-title').value,
        'Author': document.getElementById('book-author').value,
        'Language': document.getElementById('book-language').value,
        'Review': document.getElementById('review').value,
        'Image': currentImg 
    };
    if (currentStar != null){
        nbDict['Stars'] = currentStar;
    }
    else {
        nbDict['Stars'] = 0;
    }
    scaleImg(currentImg, addBtn).then((scaledImg) => {
        nbDict['Image'] = scaledImg;
    }).catch((error) => {
        currentImg = null;
        console.log('error');
    })

    //Creates new book element on main screen
    let newBook = document.createElement('div');
    newBook.className = 'books';
    if (nbDict['Image'] == null){
        newBook.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        let nbText = document.createElement('h3');
        nbText.innerText = nbDict['Title'];
        nbText.style.padding = '1.7rem';
        newBook.appendChild(nbText);
    }
    else {
        newBook.style.backgroundImage = `url(${nbDict['Image']})`;
        newBook.style.backgroundSize = 'cover';
    }
    booksContainer.appendChild(newBook);

    // Removes modal
    nbDiv.style.pointerEvents = 'none';
    nbDiv.style.display = 'none';

    //Adds dict to list of all book divs
    bookDicts.push(nbDict);
    console.log(bookDicts);
}

function scaleImg(image, element) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.src = image;
        img.onload = () => {
            const elementRatio = element.clientWidth / element.clientHeight;
            const imgRatio = img.width / img.height;

            let width = element.clientWidth;
            let height = element.clientHeight;

            if (imgRatio < elementRatio) {
                width = height * imgRatio;
            } else {
                height = width / imgRatio;
            }

            canvas.width = width;
            canvas.height = height;
            console.log(canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const scaledImg = canvas.toDataURL();
            resolve(scaledImg);
        }
        img.onerror = (error) => {
            reject(error);
        }
    });
}


