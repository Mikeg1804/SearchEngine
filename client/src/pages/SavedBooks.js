import React from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';


import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  const { loading, error, data } = useQuery(GET_ME);


console.log(data);

    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }


        if (loading) {
          console.log("loading");
        }

        if (error) {
          throw new Error('something went wrong!');
        }

     
      } catch (err) {
        console.error(err);
      }
    };



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      

    const response = await removeBookMutation({
      variables: { bookId },
    });

    if (!response || !response.data) {
      throw new Error('something went wrong with the mutation!');
    }

    const updatedUser = response.data.removeBook; // Assuming the GraphQL mutation returns the updated user data
    // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.savedBooks.length
            ? `Viewing ${data.savedBooks.length} saved ${data.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;









// work in progress code


// import React, { useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { Navigate, useParams } from 'react-router-dom';


// import { REMOVE_BOOK } from '../utils/mutations';
// import { GET_ME} from '../utils/queries.js';

// import {
//   Container,
//   Card,
//   Button,
//   Row,
//   Col
// } from 'react-bootstrap';

// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';

// const SavedBooks = () => {
//   const { username: userParam } = useParams();
//   const { me, data } = useQuery( GET_ME
//   );
 
//   const [userData, setUserData] = useState({});

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const newBook = async (bookData, token) => {
//       return fetch('/api/users', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(bookData),
//       });
//     };
  
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;
  
//         if (!token) {
//           return false;
//         }
  
//         const response = await newBook(token);
  
//         if (!response.ok) {
//           throw new Error('Something went wrong!');
//         }
  
//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };
  
//     getUserData();
//   },[userDataLength]);

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeleteBook = async (bookId) => {
//     const { book: bookParam } = useParams();
//     const [deleteBook, data] = useMutation(bookParam?REMOVE_BOOK:
//       {variables: {book: bookParam}}
//       );
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
    

//     if (!token) {
//       return false;
//     }

//     try {
//       // need to fix this. This is to be based on DELETE_BOOK.
//       const response = await deleteBook(bookId, data.token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       // upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div fluid className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing saved books!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
//             : 'You have no saved books!'}
//         </h2>
//         <Row>
//           {userData.savedBooks.map((book) => {
//             return (
//               <Col md="4">
//                 <Card key={book.bookId} border='dark'>
//                   {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className='small'>Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
//                       Delete this Book!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;
