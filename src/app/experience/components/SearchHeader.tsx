type Props = {
  query: string;
  view: "grid" | "list";
  updateParam: (key: string, value: string) => void;
};


const SearchHeader = ({ query, view, updateParam }: Props) => {
  return (
    <div className="flex items-center border border-gray-300 justify-between gap-4 p-4 rounded-2xl">
      <input
        type="text"
        placeholder="Search by tour name"
        value={query}
        onChange={(e) =>
          updateParam("destination", e.target.value)
        }
        className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2"
      />

      <div className="hidden md:flex gap-2">
        {["grid", "list"].map((v) => (
          <button
            key={v}
            onClick={() => updateParam("view", v)}
            className={`px-4 py-2 rounded-full border ${
              view === v
                ? "bg-pink-500 text-white border-pink-500"
                : "border-gray-300"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHeader;
