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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
