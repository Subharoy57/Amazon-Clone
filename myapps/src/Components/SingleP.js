import React from 'react'
import "./SingleP.css"

const SingleP = () => {
  return (
    <div className='main-single-product-container'> 
       <div className='single-product-container'> 
        <div className='single-image-product'> 
        <img src='https://www.bhphotovideo.com/images/images2500x2500/apple_mlld2ll_a_watch_smartwatch_38mm_stainless_1187207.jpg' alt='' /> 
        </div> 
        <div className='single-text-info-product'> 
        <p className='firstTitle'>This is my product</p> 
        <p className='secondTitle'>product title</p>  
        <p className='priceparagraph'>$75.00/<sup className='super-tag'>per prdouct</sup></p>    

        </div> 

        </div>  
    </div> 
  )
}

export default SingleP