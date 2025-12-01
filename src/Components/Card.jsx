import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {


  
  return (
    <div>
      <div className="card shadow-md bg-bg2">
        <figure className=" relative">
          <img className="h-[300px] w-full transition-transform duration-300 cursor-zoom-in hover:scale-110"
            src={data.images[0]}
            alt={data.brand}
          />
          <h2 className=" absolute top-0 left-0   text-bg2 p-4">{data.isBest && 'Best'}</h2>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{data.brand}</h2>
          <p className="font-bold">
            {data.description.slice(0, 30)}........
          </p>
          <div className="card-actions justify-end">
            <button className="font-bold text-xl">PRICE:-{data.price}<span className="font-bold text-3xl">৳</span></button>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/category/${data._id}`} state={`/category/${data.id}`} className="btn  bg-bg3 hover:bg-bg4/70 text-bg2">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
