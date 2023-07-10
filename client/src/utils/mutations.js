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
  mutation saveBook($bookdata: BookInput!) {
    saveBook(bookdata: $bookdata) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;


export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token 
    user{
      _id
      email
      password
    }
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      bookId
    }
  }
`;
