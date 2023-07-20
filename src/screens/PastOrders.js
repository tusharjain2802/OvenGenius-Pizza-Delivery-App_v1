import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/AdminNavbar";
import {Link} from "react-router-dom"

export default function Admin() {
  const [orderData, setorderData] = useState([]);

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/auth/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response[0]);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  let userEmail = localStorage.getItem("userEmail");
  if(userEmail === 'admin@og.com'){
  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <div className="container">
      {Array(orderData).map((data)=>{
        return data.slice(0).reverse().map(item=>{
          return  item.order_data.slice(0).reverse().map((it)=>{
            return it.map((order)=>{
              return(
                <div>
                  {order.Order_date ? (
                    <div>
                    <div className="m-auto mt-5">
                      {item.email}
                    </div>
                    <div className="m-auto">
                      {(data = order.Order_date)}
                    </div>
                    </div>
                  ) : order.TotalPrice ? (
                    <div className="m-auto">
                      <b>Sum Total: </b>
                      {(data = order.TotalPrice)}
                      <hr />
                    </div>
                  ) : (
                    <div className="col-12 col-md-6 col-lg-3">
                      <div className="card mt-3"style={{width: "16rem",maxHeight: "360px",}}>
                        <img src={order.img} className="card-img-top"
                          alt="..."
                          style={{
                            height: "120px",
                            objectFit: "fill",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {order.name}
                          </h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">
                              {order.qty}
                            </span>
                            <span className="m-1">
                              {order.size}
                            </span>
                            <span className="m-1">{data}</span>
                            <div className=" d-inline ms-2 h-100 w-20 fs-5">
                              ₹{order.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          })
        })
          
      })}
        </div>

      <Footer />
    </div>
  );
    }
    else{
      return (
        <div>
          <div>
            <Navbar />
          </div>
          <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="card col-md-4 shadow-md p-5">
            <div className="mb-4 text-center">
            
            <img style={{height:"75px", width:"75px"}} src="https://cdn-icons-png.flaticon.com/512/190/190406.png" alt=""/>
            </div>
            <div className="text-center">
                <h1>Authentication Failed !</h1>
                <p>You need to be logged In ad <b>Admin </b>to view this page</p>
                <Link to="/login" className='btn btn-outline-success'>
              Login
            </Link>
            </div>
        </div>
        </div>        
            <div>
          <Footer />
        </div>
        </div>
      );
    }
}