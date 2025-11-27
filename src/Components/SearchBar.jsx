import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="w-full flex items-center border rounded-lg px-3 py-2 border-bg1 shadow-sm">

      <IoSearch size={22} className="text-gray-500" />

      <input
        type="text"
        className="flex-1 ml-2 outline-none bg-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} // 👈 Handler call
      />

      {value && (
        <button onClick={() => onChange("")}> 
          <MdClose size={22} className="text-gray-500 hover:text-red-500" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
