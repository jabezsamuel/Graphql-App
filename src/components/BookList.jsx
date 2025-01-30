import React,{Component} from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';


const getBooksQuery =  gql`
    {
        books{
            name
            id
        }
    }
`


class BookList extends Component {
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading books...</div> );
        } else if (data.error){
             return <p>Error: {error.message}</p>;
        } 
        else {
            return data.books.map(book => {
                return(
                    <li key={ book.id }>{ book.name }</li>
                );
            })
        }
    }
  render() {
    console.log(this.props);
    return (
        <ul id="book-list">
            {this.displayBooks()}
        </ul>
    )
  }
}

export default graphql(getBooksQuery)(BookList);