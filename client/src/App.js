import { useEffect, useState, React, useCallback } from 'react';
import './App.css';
import Axios from 'axios';
import { Cards } from './Cards';

const App = () => {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [triggerRender, setTriggerRender] = useState(false);
  const [id, setId] = useState(0);

  const rerender = useCallback(
    (e) => {
      
      setMovieName(e.target.value)

    },
    [],
  )

  const rerender2 = useCallback(
    (e) => {
      
      setReview(e.target.value)

    },
    [],
  )
  

  useEffect(() => {

    Axios.get('http://localhost:3001/api/get').then((response) => {

      setReviewList(response.data);
      setId(response.data[response.data.length - 1].idmovie_reviews);
      // console.log(response);

    });

  }, []);
  

  const submitReview = () => {

    Axios.post('http://localhost:3001/api/insert', {
      movieName, 
      review
    });

    setReviewList([

      ...reviewList,
      { idmovie_reviews: id + 1 , movieName, movieReview: review},

    ]);

  }

  const deleteReview = (id) => {

    Axios.delete('http://localhost:3001/api/delete' + id);

  }

  const updateReview = (id) => {

    Axios.put('http://localhost:3001/api/update', {

      idmovie_reviews: id, 
      movieReview: newReview

    });

    setNewReview("");

  }

  const changeReview = ({target}) => {

    setNewReview(target.value);

  }

  return (
    <>
    
    <div className="App">

      <h1>CRUD</h1>
      
      <div className='container'>

        <label>Nombre de la película</label>
        <input 
          type="text" 
          value={movieName}
          name="movieName" 
          className='form-control mb-3' 
          onChange={rerender}
        ></input>
        <label>Review de la película</label>
        <input 
          type="text" 
          value={review}
          name="review" 
          className='form-control mb-3'
          onChange={rerender2}
        ></input>

        <button 
          type='button' 
          className='btn btn-outline-primary'
          onClick={submitReview}
        >Enviar</button>

          {

            reviewList.map((val) => {

              return (

                <Cards key={val.idmovie_reviews} val={val} handleDelete={deleteReview} onChangeReview={(e) => changeReview(e)} handleReview={updateReview}/>

              );

            })

          }

      </div>



    </div>
    
    </>    

  );
}

export default App;
