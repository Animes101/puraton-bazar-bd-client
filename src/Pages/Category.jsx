import { useEffect, useState } from "react";
import Card from "../Components/Card";
import useItem from "../hooks/useItem";
import { useLocation } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Loading from "../Components/Loading";
import DataNotFound from "../Components/DataNotFound";

const priceRanges = [
  { min: 0, max: 0, label: "0 - 0" },
  { min: 10000, max: 20000, label: "10,000 - 20,000" },
  { min: 20000, max: 30000, label: "20,000 - 30,000" },
  { min: 30000, max: 100000, label: "30,000 - 1,00,000" },
];

const Category = () => {
  const [selectedPrice, setSelectedPrice] = useState({ min: null, max: null });
  // const [itemPerPage, setItemPerPage] = useState(80);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const itemPerPage = 8;

  const { data, isLoading } = useItem(
    currentPage,
    itemPerPage,
    selectedCategory,
    search,
    selectedPrice.min,
    selectedPrice.max
  );

  const location = useLocation();
  const { categorie } = location.state || {};

  // 🟢 Initial category set here
  useEffect(() => {
    if (categorie) {
      setSelectedCategory(categorie);
      setCurrentPage(0);
    }
  }, [categorie]);

  const totalProduct = data?.total_product;
  const numberOfPage = Math.ceil(totalProduct / itemPerPage);

  const pages = [];
  for (let i = 0; i < numberOfPage; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Radio button handler
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(0); // Reset page when category changes
  };

  const handlePriceChange = (range) => {
    setSelectedPrice(range);

    setCurrentPage(0);
  };

  const categoriesList = ["ALL", "Laptop", "PC", "Mobile", "DSLR"];

  // 🔥 Handler — reusable
  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <div className=" mt-[64px] container mx-auto">
      <div className=" sticky top-16 z-20 bg-white">
        <SearchBar
          value={search} // controlled value
          onChange={handleSearch} // reusable handler
          placeholder="Search product..."
        ></SearchBar>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className=" p-5 bg-bg3 rounded shadow max-h-screen text-white h-screen sticky top-[105px]">
          <h1 className="font-bold mb-4">Categories</h1>
          <ul className="pl-5">
            {categoriesList.map((cat) => (
              <li key={cat} className="mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={handleCategoryChange}
                  />
                  {cat}
                </label>
              </li>
            ))}
          </ul>

          {/* Price Range */}
          <h1 className="font-bold mb-4">Price Range</h1>
          <ul className="pl-5">
            {priceRanges.map((range) => (
              <li key={range.label} className="mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    checked={
                      selectedPrice.min === range.min &&
                      selectedPrice.max === range.max
                    }
                    onChange={() => handlePriceChange(range)}
                  />
                  ৳{range.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          {data?.data?.length === 0 && (
            <DataNotFound message={"No Products Found"} />
          )}
          {isLoading && (
            <p>
              <Loading />
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  p-5 ">
            {data?.data?.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>

          <div className={` flex justify-center items-center my-5 gap-3 ${totalProduct <8  && 'hidden'} `}>
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-bg3 rounded  text-white"
            >
              <GrFormPrevious />
            </button>

            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`px-5 py-1 rounded-full ${
                  currentPage === page ? " bg-bg3 text-white" : "bg-bg4"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-bg3 rounded  text-white"
            >
              <MdNavigateNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
