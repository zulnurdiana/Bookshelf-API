const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler.js');

const Routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler, // Route untuk POST single book
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler, // Route untuk GET all book
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler, // Route untuk GET single book by id
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookByIdHandler, // Route untuk PUT single book by id
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler, // Route untuk DELETE single book by id
  },
];

module.exports = Routes;
