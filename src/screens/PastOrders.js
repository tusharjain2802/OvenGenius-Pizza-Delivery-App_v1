import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/AdminNavbar";

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
                    <div className="m-auto mt-5">
                      {(data = order.Order_date)}
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