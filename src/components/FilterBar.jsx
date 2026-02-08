function FilterBar({ selectedCategory, onCategoryChange }) {
  const categories = [
    "All",
    "Coding",
    "Education",
    "Gaming",
    "Music",
    "News",
    "Movies",
  ];

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3 border-b bg-white sticky top-16 z-40">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-1 rounded-full text-sm whitespace-nowrap
            ${selectedCategory === category
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
