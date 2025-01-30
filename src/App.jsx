import { useState } from 'react'
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

const client = new ApolloClient({
  uri:'http://3.6.90.229:4000/graphql'
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>BitCot Project</h1>
      <h2>Frontend presentation with graphql api as a backend</h2>
      <ApolloProvider client={client}>
      <div id="main">
        <h3>Sample Graphql query output</h3>
        <h3>List of Books</h3>
        <BookList/>
      </div>
      </ApolloProvider>
    </>
  )
}

export default App



