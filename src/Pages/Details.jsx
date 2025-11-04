import { useParams } from "react-router-dom";
import useItem from "../hooks/useItem";

const Details = () => {
  const { product } = useItem();

  const { id } = useParams();

  console.log(id);

  const singleData = product?.find((item) => item.id === parseInt(id));

  console.log(singleData);

  return (
    <div className="container mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure>
          <img
            src={singleData?.images[0]}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{singleData?.name}</h2>
          <h2 className="card-title">{singleData?.brand}</h2>
          <h2 className="card-title">{singleData?.condition}</h2>
          <p>{singleData?.description}</p>
          <p>price: {singleData?.price}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-buttonBg text-textWhite p-2">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
