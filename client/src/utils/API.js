// route to get logged in user's info (needs the token)



// save book data for a logged in user

// remove saved book data for a logged in user


// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

