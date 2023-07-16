import { gql } from '@apollo/client';

export const GET_ME = gql`
    me {
         {
      _id
      username
      email
      savedBooks{
        bookId
        authors
        image
        description
        title
        link
      }
      bookCount
    } 
  }
`;

// const SEARCH_GOOGLE_BOOKS = gql`
//   query SearchGoogleBooks($query: String!) {
//     searchGoogleBooks(query: $query) {
//       items {
//         bookId
//         authors
//         image
//         description
//         title
//         link
//       }
//     }
//   }
// `;