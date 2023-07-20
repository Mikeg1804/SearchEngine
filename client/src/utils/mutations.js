import {gql} from '@apollo/client';

// I need to add the token.

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user{
        _id
      username
      email
      password
      }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      password
      saveBook{
        bookId
        title
        authors
        description
        image
        link
    }
  }
  }
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token 
    user{
      _id
      email
    }
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      saveBook{
        bookId
        title
        authors
        description
        image
        link
    }
  }
}
`;
