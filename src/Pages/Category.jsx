import { useEffect, useState } from "react";
import Card from "../Components/Card";
import useItem from "../hooks/useItem";
import { useLocation } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

const priceRanges = [
  { min: 0, max: 10000, label: "0 - 10,000" },
  { min: 10000, max: 20000, label: "10,000 - 20,000" },
  { min: 20000, max: 30000, label: "20,000 - 30,000" },
  { min: 30000, max: 100000, label: "30,000 - 1,00,000" },
];

const Category = () => {
  const [selectedPrice, setSelectedPrice] = useState({ min: 0, max: 0 });
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useItem(
    currentPage,
    itemPerPage,
    selectedCategory,
    search,
    selectedPrice.min,
    selectedPrice.max
  ); // Pass array to hook

  console.log(data?.data?.length)

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

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setItemPerPage(value);
    setCurrentPage(0);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage );
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
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
    <div className=" mt-[64px] py-10 container mx-auto ">
      <SearchBar
        value={search} // controlled value
        onChange={handleSearch} // reusable handler
        placeholder="Search product..."
      ></SearchBar>
      <div className="flex flex-col md:flex-row border-2 border-red-300  ">
        <div className="w-[40%] p-5 bg-bg4 rounded shadow max-h-screen">
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
        <div className="border-2 border-green-300">
          {data?.data?.length === 0 && <h1>No Data Found</h1>}
          {isLoading && <p>Loading .........?</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  p-5 ">
            {data?.data?.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5 gap-3">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Prev
        </button>

        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`px-5 py-1 rounded-full ${
              currentPage === page ? "bg-green-600 text-white" : "bg-green-300"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>

        <select
          onChange={handleChange}
          value={itemPerPage}
          className="ml-3 border rounded px-2 py-1"
        >
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="16">16</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Category;
