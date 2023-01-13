// Getting elements
const allStars = document.querySelectorAll('.star');
const nbSubmitBtn = document.querySelector('#submit-nb');
const nbDiv = document.querySelector('.bg-modal');
const nbModal = document.querySelector('.nb-modal-content');
const booksContainer = document.querySelector('.books-container');
const addBtn = document.querySelector('#add-btn');
let bookDicts = []; //List for dict of all added books
let currentStar = null;

// Event handlers
nbSubmitBtn.addEventListener('click', addBook)
addBtn.addEventListener('click', () => {
    nbDiv.style.pointerEvents = 'auto';
    nbDiv.style.display = 'flex';
});




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
        'Image': null //Put picture here later 
    };
    if (currentStar != null){
        nbDict['Stars'] = currentStar;
    }
    else {
        nbDict['Stars'] = 0;
    }

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
        console.log('here'); //ADD IMAGE TO BACKGROUND HERE
    }
    booksContainer.appendChild(newBook);

    // Removes modal
    nbDiv.style.pointerEvents = 'none';
    nbDiv.style.display = 'none';

    //Adds dict to list of all book divs
    bookDicts.push(nbDict);
    console.log(bookDicts);
}