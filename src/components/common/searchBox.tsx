// components/SearchBox.tsx
import { FC, useState } from "react";
import { Search } from "lucide-react"; // Icon from lucide-react library
import { Input } from "../ui/input";

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full px-4 py-4">
      {/* Icon */}
      <span className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-500" />
      </span>

      {/* Input */}
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="pl-14" // Adds space for the icon
      />
    </div>
  );
};

export default SearchBox;
