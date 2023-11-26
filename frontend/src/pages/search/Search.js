import React, { useState } from 'react';
import './Search.css'
import { useNavigate } from 'react-router-dom';


function Search() {
    const navigate = useNavigate();
    const [keyword , setKeyword] = useState('');
    const searchSubmitHandler = (e) =>{
        if(keyword.trim()){
            navigate(`/customer/products/${keyword}`) 
        }
        else{
            navigate("/customer/products")
        }
    }
  return (
   <>
   <form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type='text' placeholder='Search a Product.......' onChange={(e)=> setKeyword(e.target.value)}/>
    <input type='submit' value="search"/>
   </form>
   </>
  )
}

export default Search