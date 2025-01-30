const express = require('express');
const cors = require ('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'reactappdb.ctqcq0sisc3h.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admindb123',
  database: 'library'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});
const typeDefs = gql`
  type Book {
    id: ID!
    book_name: String!
    author: String!
    genre: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

const resolvers = {
    Query: {
      books: async () => {
        const [rows] = await connection.promise().query('select * from books;');
        return rows;
      },
      book: async (_, { id }) => {
        const [rows] = await connection.promise().query('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0]; // Return the first matching user
      }
    }
  };

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();