import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    await fetch("https://ovengenius.onrender.com/api/auth/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
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
      <h2 className="mt-4 text-decoration-underline">Pending Orders</h2>
        <div className="row">
          {orderData !== {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.pending_order
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                </div>
                              ) : arrayData.TotalPrice ? (
                                <div className="m-auto">
                                  <b>Sum Total : </b>
                                  {(data = arrayData.TotalPrice)}
                                </div>
                              )  : (
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div className="card mt-3"style={{width: "16rem",maxHeight: "360px",}}>
                                    <img src={arrayData.img} className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <span className="m-1">{data}</span>
                                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>
      <hr style={{border: "5px solid white", margin:"5rem"}} />
      <div className="container">
      <h2 className="mt-4 text-decoration-underline">Past Orders</h2>
        <div className="row">
          {orderData !== {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                </div>  
                              ) : arrayData.TotalPrice ? (
                                <div className="m-auto">
                                  <b>Sum Total: </b>
                                  {(data = arrayData.TotalPrice)}
                                  <hr />
                                </div>
                              )  : arrayData.status ? (
                                <div className="m-auto">
                                  <b>Sum Total: </b>
                                  {(data = arrayData.status)}
                                  <hr />
                                </div>
                              ): (
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div className="card mt-3"style={{width: "16rem",maxHeight: "360px",}}>
                                    <img src={arrayData.img} className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <span className="m-1">{data}</span>
                                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>

      <Footer />
    </div>
  );
}
