import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useRating } from "@/context/ratingContext";
import { cn } from "@/utils/helper";

interface StarRatingProps {
  movieId: number;
  size?: "sm" | "md";
  readOnly?: boolean;
}

const StarRating = ({ movieId, size = "md", readOnly = false }: StarRatingProps) => {
  const { getRating, setRating, removeRating } = useRating();
  const [hovered, setHovered] = useState<number | null>(null);
  const saved = getRating(movieId);

  if (readOnly && saved === undefined) return null;

  const active = hovered ?? saved ?? 0;
  const starSize = size === "sm" ? "text-[11px]" : "text-[22px]";

  const handleClick = (star: number) => {
    if (star === saved) {
      removeRating(movieId);
    } else {
      setRating(movieId, star);
    }
  };

  return (
    <div
      className={cn("flex flex-row gap-[2px] items-center", size === "md" && "my-1")}
      onMouseLeave={() => !readOnly && setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          disabled={readOnly}
          onClick={() => !readOnly && handleClick(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          className={cn(
            starSize,
            "transition-colors duration-150",
            readOnly ? "cursor-default" : "cursor-pointer",
            star <= active ? "text-yellow-400" : "text-gray-400 dark:text-gray-600"
          )}
        >
          {star <= active ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
