import PriceRangeSlider from "./PriceRangeSlider";

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
          Reset All
        </button>
      </div>

<hr className="border-dashed border-gray-300 mt-6 w-full" />

      <h3 className="font-semibold mt-4 mb-2">Price</h3>
      <PriceRangeSlider
        min={65}
        max={800}
        step={1}
        value={price}
        onChange={(val) => updateParam("price", val)}
      />

<hr className="border-dashed border-gray-300 mt-6 w-full" />

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

<hr className="border-dashed border-gray-300 mt-6 w-full" />

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
