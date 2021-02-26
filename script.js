const newBtn = document.querySelector('#new-btn');
const cardGrid = document.querySelector('#card-grid');
const card = document.querySelector('.card');
class Book {
    constructor(title, author, pageNum, isRead = false) {
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
    const newBook = new Book("Waiting for Godot", "Samuel Beckett", 119, false);
    const newCard = card.cloneNode(true);

    newCard.querySelector('.title').textContent = newBook.title;
    newCard.querySelector('.author').textContent = newBook.author;
    newCard.querySelector('.page-number').textContent = newBook.pageNum;

    const checkbox = newCard.querySelector('.read');
    newBook.isRead = checkbox.checked;

    checkbox.onclick = () => {
        newBook.updateRead(checkbox.checked);
        console.log(newBook.isRead);
    };

    cardGrid.append(newCard);

    // console.log(newBook);
    // console.log(newCard);
};