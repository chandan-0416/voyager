type Props = {
  price: string | null;
  ratings: number[];
  cancellationParams: string[];
  updateParam: (key: string, value: string) => void;
  clearParams: (keys: string[]) => void;
  toggleRating: (value: number) => void;
};

const FiltersSidebar = ({
  price,
  ratings,
  cancellationParams,
  updateParam,
  clearParams,
  toggleRating,
}: Props) => {
  return (
    <aside className="hidden md:block md:w-1/4 bg-white border border-gray-300 rounded-2xl p-6 shadow-sm h-fit sticky">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <button
          onClick={() =>
            clearParams(["price", "rating", "cancellation"])
          }
          className="text-xl text-red-400 underline font-semibold"
        >
          Clear filters
        </button>
      </div>

      <h3 className="font-semibold mt-4 mb-2">Price</h3>
      {["0-150", "151-300", "301-450", "451-650", "650+"].map((p) => (
        <button
          key={p}
          onClick={() => updateParam("price", p)}
          className={`block w-full text-left px-3 py-2 rounded-lg border ${
            price === p
              ? "bg-pink-500 text-white border-pink-500"
              : "border-gray-300"
          }`}
        >
          {p}
        </button>
      ))}

      <h3 className="font-semibold mt-6 mb-2">Cancellation Policy</h3>
      {[
        "Free Cancellation 48 Hours Prior",
        "Non Refundable",
        "Free Cancellation 24 Hours Prior",
      ].map((policy) => (
        <label key={policy} className="flex gap-2">
          <input
            type="checkbox"
            checked={cancellationParams.includes(policy)}
            onChange={() => {
              const updated = cancellationParams.includes(policy)
                ? cancellationParams.filter((p) => p !== policy)
                : [...cancellationParams, policy];

              updateParam("cancellation", updated.join(","));
            }}
          />
          {policy}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">Rating</h3>
      {[5, 4, 3, 2, 1].map((r) => (
        <label key={r} className="flex gap-2">
          <input
            type="checkbox"
            checked={ratings.includes(r)}
            onChange={() => toggleRating(r)}
          />
          {"⭐".repeat(r)}
        </label>
      ))}
    </aside>
  );
};

export default FiltersSidebar;
