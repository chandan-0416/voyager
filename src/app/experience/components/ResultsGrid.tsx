import { Experience } from "../types/experience";
import ExperienceCard from "./ExperienceCard";

type Props = {
  results: Experience[];
  view: "grid" | "list";
};

const ResultsGrid = ({ results, view }: Props) => {
  return (
    <div
      className={`pt-6 ${
        view === "list"
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      }`}
    >
      {results.map((item) => (
        <ExperienceCard
          key={item.experienceId}
          item={item}
          view={view}
        />
      ))}
    </div>
  );
};

export default ResultsGrid;

