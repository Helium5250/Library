const newBtn = document.querySelector('#new');
const card = document.querySelector('.card');
const cardGrid = document.querySelector('#card-grid')
class Book {
    constructor(title, author, pageNum, isRead = false) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.isRead = isRead;
    }

    updateRead() {
        this.read = true;
    }
}

newBtn.onclick = () => {
    const newBook = new Book("Waiting for Godot", "Samuel Beckett", 119, false);
    const newCard = card.cloneNode(true);

    newCard.querySelector('.title').textContent = newBook.title;
    newCard.querySelector('.author').textContent = newBook.author;
    newCard.querySelector('.page-number').textContent = newBook.pageNum;
    newCard.querySelector('.read').checked = newBook.isRead;

    cardGrid.append(newCard);

    console.log(newBook);
    console.log(newCard);
};