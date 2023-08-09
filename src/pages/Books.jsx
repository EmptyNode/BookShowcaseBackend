import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllBooks();
  }, [])

  const handleDelte = async (id)=>{
    try{
      await axios.delete("http://localhost:8800/books/"+id);
      window.location.reload();
    }catch{
      console.log(err);
    }
  }


  return (
    <div>
      <h1>Sumit Book Shop</h1>
      <div className="books">
        {books.map((book) =>
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt='' />}
            <p>{book.title}</p>
            <p>{book.desc}</p>
            <p>{book.price}</p>
            <button className="delete" onClick={()=>handleDelte(book.id)}>Delete</button>
            <button className="update"><Link to={`/update/${book.id}`} className='linkDecoration'>update</Link></button>
          </div>
        )}
      </div>
      <button className='addBook'>
        <Link to="/add" className='linkDecoration'>Add new book</Link>
      </button>
    </div>
  )
}

export default Books