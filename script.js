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

const formPanel = document.querySelector('#new-form-panel');
const form = document.querySelector('#new-form');
const title = form.querySelector('#title');
const author = form.querySelector('#author');
const pageNum = form.querySelector('#page-number');
const isRead = form.querySelector('#read');

function openForm() {
    formPanel.style.display = 'flex';
    title.value = '';
    author.value = '';
    pageNum.value = '';
    isRead.checked = false;
}

function closeForm(newBook, newCard) {
    formPanel.style.display = 'none';
    newCard.querySelector('.title').textContent = newBook.title;
    newCard.querySelector('.author').textContent = newBook.author;
    newCard.querySelector('.page-number').textContent = newBook.pageNum;
    newCard.querySelector('.read').checked = newBook.isRead;
}

const newBtn = document.querySelector('#new-btn');

newBtn.onclick = () => {
    openForm();
};

const cardGrid = document.querySelector('#card-grid');
const card = document.querySelector('.card');

const submitBtn = document.querySelector('#submit-btn');
submitBtn.onclick = () => {
    let newBook = new Book(title.value, author.value, pageNum.value, isRead.checked);
    const newCard = card.cloneNode(true);
    closeForm(newBook, newCard);
    cardGrid.append(newCard);

    const checkbox = newCard.querySelector('.read');
    checkbox.onclick = () => {
        newBook.updateRead(checkbox.checked);
    };

    const editBtn = newCard.querySelector('.edit');
    editBtn.onclick = () => {
        openForm();
    };

    submitBtn.onclick = () => {
        newBook = new Book(title.value, author.value, pageNum.value, isRead.checked);
        closeForm(newBook, newCard);
    };

    const deleteBtn = newCard.querySelector('.delete');
    deleteBtn.onclick = () => {
        newBook = null;
        cardGrid.removeChild(newCard);
    };
};