import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="w-full flex items-center  rounded-lg px-3 py-2 shadow-sm">

      <IoSearch size={28} className="text-btnBg font-bold" />

      <input
        type="text"
        className="flex-1 ml-2  border-b border-b-btnBg bg-transparent  focus:outline-none"
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
