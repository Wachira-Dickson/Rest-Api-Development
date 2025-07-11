const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API');
});

// Intro route to get info about books
app.get('/books', (req, res) => {
    res.json({
        message: "Welcome to our bookstore API",
    });
});

// Get all books
app.get('/get', (req, res) => {
    res.json(books);
});

// Get a single book by ID
app.get('/get/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
     res.status(200).json({ message: 'Book found' });
    }else{
     res.status(404).json({ message: 'Book not found. Try with a different BookId' });
    }
});

//add a new book
app.post('/add', (req, res) => {
    const newBook = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title || "Default Title",
        author: req.body.author || "Unknown Author"
    };
    books.push(newBook);
    res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// Update a book by ID
app.put('/update/:id', (req, res) => {
    const findCurrentBook = books.find(bookItem => bookItem.id === parseInt(req.params.id));

    if (findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title
        findCurrentBook.author = req.body.author || findCurrentBook.author
        res.status(200).json({ message: `Book with ID ${findCurrentBook.id} updated successfully`, book: findCurrentBook });    
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Delete a book by ID
app.delete('/delete/:id', (req, res) => {
    const findIndexOfCurrentBook = books.findIndex(bookItem => bookItem.id === parseInt(req.params.id));
    if (findIndexOfCurrentBook !== -1) {
        const deletedBook = books.splice(findIndexOfCurrentBook, 1);
        res.status(200).json({ message: `Book with ID ${deletedBook[0].id} deleted successfully` , data: deletedBook[0] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
