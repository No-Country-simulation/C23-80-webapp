import { useState } from "react";
import { Search } from "lucide-react";

const SearchI = () => {
  const [text, setText] = useState("");

  return(
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Frontend..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 pr-10 border-1 border-gray-300 rounded-md outline-none focus:ring-0 shadow-md"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
    </div>
  )
}

export default SearchI;