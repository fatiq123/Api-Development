// const PORT = 8000;
// const body_parser = require('body-parser');
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const app = express(); // Initialize the Express application

// // Define a route
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// try {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// } catch (error) {
//     console.log(`Error: ${error}`);
// }







// app.use(express.json());

// // Sample data (in-memory database)
// let books = [
//   { id: 1, title: 'Book 1' },
//   { id: 2, title: 'Book 2' },
//   { id: 3, title: 'Book 3' },
// ];

// // GET all books
// app.get('/api/books', (req, res) => {
//   res.json(books);
// });

// // GET a single book by ID
// app.get('/api/books/:id', (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const book = books.find((b) => b.id === bookId);
//   if (!book) return res.status(404).json({ error: 'Book not found' });
//   res.json(book);
// });

// // POST (create) a new book
// app.post('/api/books', (req, res) => {
//   const newBook = req.body;
//   books.push(newBook);
//   res.status(201).json(newBook);
// });

// // PUT (update) a book by ID
// app.put('/api/books/:id', (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const updatedBook = req.body;
//   const index = books.findIndex((b) => b.id === bookId);

//   if (index === -1) return res.status(404).json({ error: 'Book not found' });

//   books[index] = updatedBook;
//   res.json(updatedBook);
// });

// // DELETE a book by ID
// app.delete('/api/books/:id', (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const index = books.findIndex((b) => b.id === bookId);

//   if (index === -1) return res.status(404).json({ error: 'Book not found' });

//   const deletedBook = books.splice(index, 1)[0];
//   res.json(deletedBook);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
require('./utils/db.js');


// Middleware
app.use(bodyParser.json());

// apis
app.use('/api', productRoutes);


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})