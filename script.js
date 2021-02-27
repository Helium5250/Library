const newBtn = document.querySelector('#new-btn');
const submitBtn = document.querySelector('#submit-btn');
const formPanel = document.querySelector('#new-form-panel')
const form = document.querySelector('#new-form');
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

newBtn.onclick = () => {
    formPanel.style.display = 'flex';
};

submitBtn.onclick = () => {
    const newBook = new Book(
        form.querySelector('#title').value,
        form.querySelector('#author').value,
        form.querySelector('#page-number').value,
        form.querySelector('#read').checked
    );
    formPanel.style.display = 'none';

    const newCard = card.cloneNode(true);
    newCard.querySelector('.title').textContent = newBook.title;
    newCard.querySelector('.author').textContent = newBook.author;
    newCard.querySelector('.page-number').textContent = newBook.pageNum;

    const checkbox = newCard.querySelector('.read');
    checkbox.checked = newBook.isRead;

    checkbox.onclick = () => {
        newBook.updateRead(checkbox.checked);
        console.log(newBook.isRead);
    };

    cardGrid.append(newCard);

    // console.log(newBook);
    // console.log(newCard);
};