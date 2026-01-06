import Image from "next/image";
import { Experience } from "../types/experience";
import Link from "next/link";

type Props = {
  item: Experience;
  
  view: "grid" | "list";
};

const ExperienceCard = ({ item, view }: Props) => {
  return (
    <div
    
      className={`bg-white border border-gray-300 rounded-2xl hover:shadow-lg cursor-pointer transition ${
        view === "list" ? "flex gap-5" : "flex flex-col"
      }`}
    >
       <Link 
       href={`/experience/${item.experienceId}`}
      className={view === "list" ? "flex flex-1": "grid"}
       target="_blank"
       >
      {/* Image */}
      <div className={view === "list" ? "shrink-0" : ""}>
        <Image
          src={item.images?.[0] || "/placeholder.jpg"}
          alt={item.title}
          width={400}
          height={250}
          className={`object-cover ${
            view === "list"
              ? "w-56 h-full rounded-l-2xl"
              : "w-full h-52 rounded-t-2xl"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between mt-2">
          <span className="text-xl font-semibold text-pink-500 p-2">
            {item.tourType}
          </span>

          <span className="flex items-center gap-1 text-xs font-semibold bg-yellow-50 text-yellow-700 px-2 py-1 m-2 rounded-xs">
            ⭐ {item.rating.score}
          </span>
        </div>

        <h2 className="mt-2 px-3 font-semibold text-lg line-clamp-2">
          {item.title}
        </h2>

        <div className="text-sm text-gray-500 mt-1 px-3">
          <p>{item.destination}</p>
          <p>{item.duration.total}</p>
          <p className="text-green-600">
            {item.cancellationPolicy.type}
          </p>
        </div>

        <hr className="border-dashed border-gray-300 mt-2 mx-3" />

        <p className="mt-4 text-xl font-bold text-blue-600 text-right m-2">
          {item.priceRange.currency} {item.priceRange.adult}
        </p>
      </div>
      </Link>
    </div>
  );
};

export default ExperienceCard;

