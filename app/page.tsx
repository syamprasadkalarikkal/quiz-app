
import React from 'react'
import {FaArrowRight} from 'react-icons/fa';
import Link from 'next/link';

export default function Home(){
  return(
    <div className='btn-container'>
     <Link href='/user'> 
     <button type='submit' className='btn'>Start Quiz</button></Link><FaArrowRight/>
     
    </div>
  );
}


