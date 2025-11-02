import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="card shadow-sm bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2 border border-textColor">
        <figure>
          <img
            src={data.images[0]}
            alt={data.brand}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.brand}</h2>
          <p>
            {data.description}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">{data.price}</button>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/category/${data.id}`} className="btn btn-primary">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
