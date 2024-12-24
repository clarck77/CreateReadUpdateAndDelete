import 'dotenv/config';
import Hapi from '@hapi/hapi';
import environments from '../config/environments.js';
import { nanoid } from 'nanoid';

const books = [];

const init = async () => {
  try {
    const server = Hapi.server({
      host: environments.HOST,
      port: environments.PORT,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    server.route([
      {
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
          const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

          if (!name) {
            return h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }).code(400);
          }

          if (readPage > pageCount) {
            return h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
          }

          const id = nanoid();
          const finished = pageCount === readPage;
          const insertedAt = new Date().toISOString();
          const updatedAt = insertedAt;

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

          books.push(newBook);

          return h.response({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: id } }).code(201);
        },
      },
      {
        method: 'GET',
        path: '/books',
        handler: (request, h) => {
          const responseBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
          return h.response({ status: 'success', data: { books: responseBooks } }).code(200);
        },
      },
      {
        method: 'GET',
        path: '/books/{bookId}',
        handler: (request, h) => {
          const { bookId } = request.params;
          const book = books.find((b) => b.id === bookId);

          if (!book) {
            return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
          }

          return h.response({ status: 'success', data: { book } }).code(200);
        },
      },
      {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: (request, h) => {
          const { bookId } = request.params;
          const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

          if (!name) {
            return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' }).code(400);
          }

          if (readPage > pageCount) {
            return h.response({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
          }

          const index = books.findIndex((b) => b.id === bookId);

          if (index === -1) {
            return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' }).code(404);
          }

          const updatedAt = new Date().toISOString();
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
            finished: pageCount === readPage,
            updatedAt,
          };

          return h.response({ status: 'success', message: 'Buku berhasil diperbarui' }).code(200);
        },
      },
      {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: (request, h) => {
          const { bookId } = request.params;
          const index = books.findIndex((b) => b.id === bookId);

          if (index === -1) {
            return h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404);
          }

          books.splice(index, 1);
          return h.response({ status: 'success', message: 'Buku berhasil dihapus' }).code(200);
        },
      },
      {
        method: 'GET',
        path: '/author',
        handler: (request, h) => {
          return h.response({ status: 'success', author: 'azzaky' }).code(200);
        },
      },
      {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
          return h.response({ status: 'fail', message: 'Not Found' }).code(404);
        },
      },
    ]);

    await server.start();
    console.log(`[SERVER] running on ${server.info.uri}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise rejection:', err);
  process.exit(1);
});

init();