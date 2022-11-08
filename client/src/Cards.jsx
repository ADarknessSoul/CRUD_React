import React from 'react';

export const Cards = React.memo(({val, handleDelete, onChangeReview, handleReview}) => {

  console.log("Me rendericé :(");

  return (
    <>
    
    <div className='card mt-3 bg-dark'>

        <div className='card-body text-light'>

            <h5 className="card-title">Nombre de la película: {val.movieName}</h5>
            <p className="card-text text-warning">Review: {val.movieReview}</p>
            <button onClick={() => {handleDelete(val.idmovie_reviews)}} className='btn btn-danger'>Delete</button>

            <input onChange={(e) => onChangeReview(e)} className='form-control mt-2 mb-2' type="text"/>
            <button onClick={() => handleReview(val.idmovie_reviews)} className='btn btn-info'>Update</button>

        </div>

    </div>

    </>
  )
})
