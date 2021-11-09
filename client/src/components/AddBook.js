import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries';

export default function AddBook(){
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(addBookMutation);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const formRef = useRef();

  if (loading) {
    return <div>Loading authors...</div>;
  }

  if (loadingMutation) {
    return <div>Submitting...</div>;
  }

  if (error || errorMutation) {
    return null;
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    formRef.current.reset();
  }

  const handleOnChangeName = e => {
    setName(e.target.value);
  }

  const handleOnChangeGenre = e => {
    setGenre(e.target.value);
  }

  const handleOnChangeAuthorId = e => {
    setAuthorId(e.target.value);
  }

  return (
    <div>    
      <form id="add-book" onSubmit={handleOnSubmit} ref={formRef}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={handleOnChangeName} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={handleOnChangeGenre} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={handleOnChangeAuthorId}>
            <option>Select author</option>
            {data?.authors?.map(author => {
              return (
                <option
                  key={author.id}
                  value={author.id}
                >
                  {author.name}
                </option>
              )
            })}
          </select>
        </div>

        <button>+</button>
      </form>

      {dataMutation ? (
        <section>
          <h2>Book successfully added:</h2>
          <p>{dataMutation?.addBook?.name}</p>
        </section>
      ) : null}
    </div>
  );
}

