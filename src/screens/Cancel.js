import React from 'react'
import {Link} from "react-router-dom"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Success = () => {

  return (
    <div>
    <div>
        <Navbar/>
    </div>
        <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="card col-md-4 shadow-md p-5">
            <div className="mb-4 text-center">
            
            <img style={{height:"75px", width:"75px"}} src="https://cdn-icons-png.flaticon.com/512/190/190406.png" alt=""/>
            </div>
            <div className="text-center">
                <h1>Oh no !</h1>
                <p>Your payment verification failed. Please check your account balance.</p>
                <Link to="/" className='btn btn-outline-success'>
              Back to Home
            </Link>
            </div>
        </div>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
  )
}

export default Success