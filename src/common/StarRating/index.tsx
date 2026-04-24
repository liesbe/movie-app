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
  const { getRating, addRating, removeRating } = useRating();
  const [hovered, setHovered] = useState<number | null>(null);
  const saved = getRating(movieId);
  const displayed = hovered ?? saved ?? 0;

  if (readOnly && saved === undefined) return null;

  const starSize = size === "sm" ? "text-[12px]" : "text-[22px]";

  const handleClick = (star: number) => {
    if (readOnly) return;
    if (saved === star) {
      removeRating(movieId);
    } else {
      addRating(movieId, star);
    }
  };

  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(null)}
          className={cn(
            "text-yellow-400 transition-transform duration-100",
            !readOnly && "hover:scale-125 cursor-pointer",
            readOnly && "cursor-default",
            starSize
          )}
        >
          {star <= displayed ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
