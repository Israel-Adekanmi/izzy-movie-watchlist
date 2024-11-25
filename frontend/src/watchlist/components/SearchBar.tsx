import React, { useState } from "react";
import { SearchBarProps } from "../type";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, buttonText, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center gap-4 w-full mt-4 mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="p-2 rounded border bg-gray-800 w-full text-white"
      />
      <button
        onClick={handleSearch}
        className="p-2 rounded bg-red-500 text-white hover:bg-red-700"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SearchBar;
