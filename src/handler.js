const {nanoid} = require('nanoid');
const books = require('./books.js');

// TODO: Handler tambah Buku
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;

  // Cek apakah jumlah page dan read sama maka finished true
  if (pageCount === readPage) {
    finished = true;
  }

  // cek apakah name kosong atau tidak ada
  if (!name) {
    const response = h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);

    return response;
  }

  // Cek apakah jumlah readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    const response = h
        .response({
          status: 'fail',
          message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);

    return response;
  }

  // object buku baru
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // memasukan buku baru ke array
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // cek apakah terdapat buku
  if (isSuccess) {
    // berhasil menambahkan buku
    const response = h
        .response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        })
        .code(201);

    return response;
  }

  // gagal menambahkan buku
  const response = h
      .response({
        status: 'fail',
        message: 'Server error, buku gagal ditambahkan!!!',
      })
      .code(500);
  return response;
};

// TODO: Handler get all buku
const getAllBookHandler = (request, h) => {
  const name = request.query.name; // query name dikirim oleh user
  const isReading = request.query.reading; // query reading dikirim oleh user
  const isFinished = request.query.finished; // query finished dikirim oleh user

  // cek apakah terdapat query name
  if (name) {
    // lakukan iterasi filter dan mapping apakah terdapat buku dengan nama yg sama dengan query name
    const result = books
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));

    // jika tidak terdapat buku dengan name yg dicari
    if (result.length === 0) {
      const response = h
          .response({
            status: 'fail',
            message: `Buku dengan nama : ${name} tidak ada`,
          })
          .code(404);

      return response;
    } else {
      const response = h
          .response({
            status: 'success',
            data: {
              books: result,
            },
          })
          .code(200);

      return response;
    }
  }

  // cek apakah terdapat query Reading
  if (isReading) {
    // jika query reading bernilai 1 make true jika 0 make false
    const reading = isReading === '1' ? true : false;

    // lakukan iterasi filter dan mapping apakah terdapat buku yg sedang dibaca / tidak sedang dibaca
    const result = books
        .filter((book) => book.reading === reading)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));

    if (reading === false) {
      const response = h
          .response({
            status: 'success',
            data: {
              books: result,
            },
          })
          .code(200);

      return response;
    } else {
      const response = h
          .response({
            status: 'success',
            data: {
              books: result,
            },
          })
          .code(200);

      return response;
    }
  }

  // cek apakah terdapat query finished
  if (isFinished) {
    // jika query finished bernilai 1 make true jika 0 make false
    const finished = isFinished === '1' ? true : false;

    // lakukan iterasi filter dan mapping apakah terdapat buku yg sudah selesai dibaca / belum selesai dibaca
    const result = books
        .filter((book) => book.finished === finished)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));

    if (finished === false) {
      const response = h
          .response({
            status: 'success',
            data: {
              books: result,
            },
          })
          .code(200);

      return response;
    } else {
      const response = h
          .response({
            status: 'success',
            data: {
              books: result,
            },
          })
          .code(200);

      return response;
    }
  }

  // Jika tidak terdapat request query sama sekali code ini akan dijalan
  const result = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h
      .response({
        status: 'success',
        data: {
          books: result,
        },
      })
      .code(200);

  return response;
};

// TODO: Handler get buku by id
const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params; // id buku yg diambil melalui paramater

  // lakukan iterasi untuk mengecek apakah ada buku dengan id sesuai dengan paramater
  const book = books.filter((b) => b.id === bookId)[0];

  // jika ada make return isi buku sesuai dengan id params
  if (book !== undefined) {
    const response = h
        .response({
          status: 'success',
          data: {
            book,
          },
        })
        .code(200);

    return response;
  }

  // Buku dengan id params tidak ditemukan
  const response = h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);

  return response;
};

// TODO: Handler update buku by id
const updateBookByIdHandler = (request, h) => {
  const {bookId} = request.params; // id buku yg diambil melalui paramater
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload; // data baru yg akan di update oleh user

  const updatedAt = new Date().toISOString();

  // lakukan iterasi untuk mengecek apakah ada buku dengan id sesuai dengan paramater
  const index = books.findIndex((book) => book.id === bookId);

  // cek apakah name kosong atau tidak ada
  if (!name) {
    const response = h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);

    return response;
  }

  // Cek apakah jumlah readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    const response = h
        .response({
          status: 'fail',
          message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);

    return response;
  }

  // Jika terdapat buku dengan index yg dicari lakukan update menggunakan spread operator dan timpa hasil nya
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    // Buku berhasil diupdate
    const response = h
        .response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        })
        .code(200);
    return response;
  }

  // Buku gagal diupdate
  const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);

  return response;
};

// TODO: Handler delete buku by id
const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params; // id buku yg diambil melalui paramater

  // lakukan iterasi untuk mengecek apakah ada buku dengan id sesuai dengan paramater
  const index = books.findIndex((book) => book.id === bookId);

  // Cek apakah terdapat buku dengan index yg dicari
  if (index !== -1) {
    // Jika ya hapus item dengan index yg dicari
    books.splice(index, 1);
    const response = h
        .response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        })
        .code(200);

    return response;
  }

  // gagal menghapus buku
  const response = h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);

  return response;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
