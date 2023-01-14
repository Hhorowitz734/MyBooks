// Getting elements
const allStars = document.querySelectorAll('.star');
const nbSubmitBtn = document.querySelector('#submit-nb');
const nbDiv = document.querySelector('.bg-modal');
const nbModal = document.querySelector('.nb-modal-content');
const booksContainer = document.querySelector('.books-container');
const addBtn = document.querySelector('#add-btn');
const imgUpload = document.querySelector('#img-upload');
let books = [];
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
        currentImg = null;
    }).catch((error) => {
        currentImg = null;
        console.log('error');
    })

    //Creates new book element on main screen
    let newBook = document.createElement('div');
    newBook.className = 'book';
    let nbButton = document.createElement('button');
    nbButton.style.width = '100%';
    nbButton.style.height = '100%';
    nbButton.style.border = 'none';
    nbButton.style.backgroundColor = 'transparent';
    newBook.appendChild(nbButton);
    if (nbDict['Image'] == null){
        newBook.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        let nbText = document.createElement('h3');
        nbText.innerText = nbDict['Title'];
        nbButton.appendChild(nbText);
    }
    else {
        newBook.style.backgroundImage = `url(${nbDict['Image']})`;
        newBook.style.backgroundSize = 'cover';
    }
    booksContainer.appendChild(newBook);

    // Removes modal
    nbDiv.style.pointerEvents = 'none';
    nbDiv.style.display = 'none';

    //Resets all text boxes and star
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-language').value = '';
    document.getElementById('review').value = '';
    allStars.forEach((star) => {
        star.innerHTML = '&#9734;'
    });
    currentStar = null;
    currentImg = null;
    imgUpload.value = "";


    //Adds dict to list of all book divs
    bookDicts.push(nbDict);
    books.push(nbButton);
    createBookELS();
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

function displayBook(event){

    // Prevents reload
    event.preventDefault();

    //Sets proper values
    let currDict; //The dictionary of the book we are trying to access
    let bookIndex;
    for (let [i, bookDict] of bookDicts.entries()){
        if (bookDict['Title'] == event.path[0].innerText){
            currDict = bookDict;
            bookIndex = i;
        }
    }
    
    //Populates text boxes with previously entered data
    document.getElementById('book-title').value = currDict['Title'];
    document.getElementById('book-author').value = currDict['Author'];
    document.getElementById('book-language').value = currDict['Language'];
    document.getElementById('review').value = currDict['Review'];
    allStars.forEach((star, j) => {
        if (j < currDict['Stars']){
            star.innerHTML = '&#9733';
        }
        else {
            star.innerHTML = '&#9734;';
        }
    });

    
    //Changes 'add' button to fix button
    nbSubmitBtn.style.display = 'none';
    nbSubmitBtn.style.pointerEvents = 'none';
    let updateBtn = document.createElement('button');
    updateBtn.className = 'nb-adds';
    updateIcon = document.createElement('i');
    updateIcon.className = "fa-solid fa-check"
    updateBtn.appendChild(updateIcon);
    document.querySelector('.book-inputs').appendChild(updateBtn);
    
    //Opens book window
    nbDiv.style.pointerEvents = 'auto';
    nbDiv.style.display = 'flex';

    //Event listener waiting for form submission
    updateBtn.addEventListener('click', (event) => {
        event.preventDefault();
        //Updates dictionary
        currDict['Title'] = document.getElementById('book-title').value;
        currDict['Author'] = document.getElementById('book-author').value;
        currDict['Language'] = document.getElementById('book-language').value;
        currDict['Review'] = document.getElementById('review').value;

        bookDicts[bookIndex] = currDict;

        //Fill in stars + image here

        //Closes book window
        nbDiv.style.pointerEvents = 'none';
        nbDiv.style.display = 'none';
        updateBtn.remove();
        nbSubmitBtn.style.display = 'block';
        nbSubmitBtn.style.pointerEvents = 'auto';
        // OKAY SO MAYBE INSTEAD OF THAT APPROACH, CREATE THE UPDATEBTN IN THE HTML and then what do is make is appear and dissapear as needed
    });
}

//Creates book event listeners
function createBookELS(){
    books.forEach((bookDiv) => {
        console.log(bookDiv);
        bookDiv.addEventListener('click', displayBook);
    });    
}