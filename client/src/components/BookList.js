import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

export default function BookList(){
  const { loading, error, data } = useQuery(getBooksQuery);
  const [bookId, setBookId] = useState(null);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return null;
  }

  const handleOnClick = id => {
    setBookId(id);
  }

  return (
    <>
      <ul id="book-list">
        {data?.books?.map(book => <li onClick={() => handleOnClick(book.id)} key={book.id}>{book.name}</li>)}
      </ul>
      <BookDetails bookId={bookId} />
    </>
  );
}

