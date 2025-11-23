import { useEffect, useState } from 'react';
import Card from '../Components/Card';
import useItem from '../hooks/useItem';
import { useLocation } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

const Category = () => {
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // Single category
  const [search, setSearch] = useState("");

  const { data, isLoading } = useItem(currentPage, itemPerPage, selectedCategory); // Pass array to hook

  const location = useLocation();
  const { categorie } = location.state || {};

  console.log(categorie);

 // 🟢 Initial category set here
  useEffect(() => {
    if (categorie) {
      setSelectedCategory(categorie);
      setCurrentPage(0);
    }
  }, [categorie]);

  if (isLoading) {
    return <h1>Loading..................</h1>;
  }

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

  const categoriesList = ['ALL', 'Laptop', 'PC', 'Mobile', 'DSLR'];

   // 🔥 Handler — reusable
  const handleSearch = (text) => {
    setSearch(text);

    console.log(search)
    // এখানে তুমি চাইলে filter করতে পারো বা backend call করতে পারো
    // example: setCurrentPage(0)
    // example: refetch()
  };

  return (
    <div className="bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2 my-10 container mx-auto">
      <SearchBar value={search}       // controlled value
        onChange={handleSearch}  // reusable handler
        placeholder="Search product...">
        

      </SearchBar>
      <div className="flex">
        <div className="w-[20%] p-5 bg-white rounded shadow">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[80%] p-5">
          {data?.data?.map((item) => (
            <Card key={item.id} data={item} />
          ))}
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
              currentPage === page ? 'bg-green-600 text-white' : 'bg-green-300'
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
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Category;





