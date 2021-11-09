import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries';
export default function BookDetails({ bookId }){
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId }
  });

  if (loading) {
    return <p>Fetching book...</p>
  }

  if (error || !data?.book) {
    return null;
  }

  const displayOtherBooks = () => {
    if (data.book.author.books.length < 2 ) {
      return null;
    }

    return (
      <section>
        <p>Other books by same author</p>
        <ul>
          {data.book.author.books.map(b => {
            if (b.id === data.book.id) {
              return null;
            }
            return <li key={b.id}>{b.name}</li>
          })}
        </ul>
      </section>
    )
  }

  return (
    <section id="book-details">
      <h3>Book details here:</h3>
      <p>{data.book.genre}</p>
      <p>{data.book.name}</p>
      <p>{data.book.author.name}</p>
      {displayOtherBooks()}
    </section>
  );
}

