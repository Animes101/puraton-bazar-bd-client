import { useEffect, useState } from "react";
import Card from "../Components/Card";
import useItem from "../hooks/useItem";
import { useLocation } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { HiMenu } from "react-icons/hi"; // 🔥 Drawer Icon
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

  useEffect(() => {
    if (categorie) {
      setSelectedCategory(categorie);
      setCurrentPage(0);
    }
  }, [categorie]);

  const totalProduct = data?.total_product || 0;
  const numberOfPage = Math.ceil(totalProduct / itemPerPage);

  const pages = Array.from({ length: numberOfPage }, (_, i) => i);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(0);
  };

  const handlePriceChange = (range) => {
    setSelectedPrice(range);
    setCurrentPage(0);
  };

  const categoriesList = ["ALL", "Laptop", "PC", "Mobile", "DSLR"];
  const handleSearch = (text) => setSearch(text);

  return (
    <div className="mt-[64px] container mx-auto">

      {/* 🔍 Sticky Search */}
      <div className="sticky top-16 z-20 bg-white">
        <SearchBar
          value={search}
          onChange={handleSearch}
          placeholder="Search product..."
        />
      </div>

      {/* ==================== 📱 Mobile Drawer ==================== */}
      <div className="drawer md:hidden z-20">
        <input id="drawer-filter" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-3">
          <label
            htmlFor="drawer-filter"
            className="text-3xl text-bg3 cursor-pointer"
          >
            <HiMenu /> {/* 🔥 React Icon */}
          </label>
        </div>

        <div className="drawer-side">
          <label htmlFor="drawer-filter" className="drawer-overlay"></label>

          <div className="w-80 bg-bg3 p-5 text-white menu   min-h-[calc(100vh-64px)] mt-[64px]">
            {/* Filter Content */}
            <h1 className="font-bold mb-10 text-red-500 text-xl ">Categories</h1>
            <ul className="pl-3">
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category_m"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={handleCategoryChange}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>

            <h1 className="font-bold mt-6 mb-10 text-red-500 text-xl ">Price Range</h1>
            <ul className="pl-3">
              {priceRanges.map((range) => (
                <li key={range.label}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price_m"
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
        </div>
      </div>

      {/* ==================== 💻 Desktop Sidebar ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3">

        <div className="hidden md:block bg-bg3 text-white p-5 rounded shadow h-screen sticky top-[105px]">
          <h1 className="font-bold mb-6 text-red-500 text-xl">Categories</h1>
          <ul className="pl-3">
            {categoriesList.map((cat) => (
              <li key={cat}>
                <label className="flex items-center gap-2 cursor-pointer">
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

          <h1 className="font-bold mt-6 mb-6 text-red-500 text-xl ">Price Range</h1>
          <ul className="pl-3">
            {priceRanges.map((range) => (
              <li key={range.label}>
                <label className="flex items-center gap-2 cursor-pointer">
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

        {/* ==================== 🚀 Product Content ==================== */}
        <div className="col-span-2">

          {isLoading && <Loading />}
          {data?.data?.length === 0 && <DataNotFound message="No Products Found" />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
            {data?.data?.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className={`flex justify-center items-center my-5 gap-3 ${totalProduct < 8 && "hidden"}`}>
            <button onClick={handlePrev} className="px-4 py-2 bg-bg3 text-white rounded">
              <GrFormPrevious />
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-5 py-1 rounded-full ${
                  currentPage === page ? "bg-bg3 text-white" : "bg-bg4"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button onClick={handleNext} className="px-4 py-2 bg-bg3 text-white rounded">
              <MdNavigateNext />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Category;
