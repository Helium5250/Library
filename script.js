function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

const formPanel = document.querySelector('#new-form-panel');
const form = document.querySelector('#new-form');
const title = form.querySelector('#title');
const author = form.querySelector('#author');
const pageNum = form.querySelector('#page-number');
const isRead = form.querySelector('#read');

const cardGrid = document.querySelector('#card-grid');
const card = document.querySelector('.card');

class Book {
    constructor(title, author, pageNum, isRead) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.isRead = isRead;
    }

    updateRead(isRead) {
        this.isRead = isRead;
    }
}

function openForm() {
    formPanel.style.display = 'flex';
    title.value = '';
    author.value = '';
    pageNum.value = '';
    isRead.checked = false;
}

function createBook() {
    let newBook = new Book(title.value, author.value, pageNum.value, isRead.checked);
    library.push(newBook);
    localStorage.setItem('library', JSON.stringify(library));
    return newBook;
}

function createCard(book) {
    const newCard = card.cloneNode(true);
    cardGrid.append(newCard);

    const checkbox = newCard.querySelector('.read');
    checkbox.onclick = () => {
        book.updateRead(checkbox.checked);
        library[library.indexOf(book)] = book;
        localStorage.setItem('library', JSON.stringify(library));
    };


    const deleteBtn = newCard.querySelector('.delete');
    deleteBtn.onclick = () => {
        console.log("deleting");
        library.splice(library.indexOf(book), 1);
        localStorage.setItem('library', JSON.stringify(library));
        book = null;
        cardGrid.removeChild(newCard);
    };

    return newCard;
}

function updateCard(newBook, newCard) {
    formPanel.style.display = 'none';
    newCard.querySelector('.title').textContent = newBook.title;
    newCard.querySelector('.author').textContent = newBook.author;
    newCard.querySelector('.page-number').textContent = newBook.pageNum;
    newCard.querySelector('.read').checked = newBook.isRead;
}

let library = [];

if (storageAvailable('localStorage')) {
    let oldLibrary = JSON.parse(localStorage.getItem('library')) || [];
    library = oldLibrary;

    for (const book of oldLibrary) {
        const newCard = createCard(book);
        updateCard(book, newCard);
        cardGrid.append(newCard);
    }

} else {
    console.log("Local Storage unavailable");
}

const newBtn = document.querySelector('#new-btn');
newBtn.onclick = () => {
    openForm();
};

const submitBtn = document.querySelector('#submit-btn');
submitBtn.onclick = () => {
    const book = createBook();
    const card = createCard(book);
    updateCard(book, card);
};

const clearBtn = document.querySelector('#clear-btn');
clearBtn.onclick = () => {
    localStorage.clear();
    location.reload();
}