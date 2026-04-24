import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { saveRatings, getRatings } from "@/utils/helper";

interface RatingContextType {
  ratings: Record<number, number>;
  setRating: (movieId: number, stars: number) => void;
  getRating: (movieId: number) => number | undefined;
  removeRating: (movieId: number) => void;
}

const RatingContext = createContext<RatingContextType | null>(null);

export const RatingProvider = ({ children }: { children: ReactNode }) => {
  const [ratings, setRatings] = useState<Record<number, number>>(getRatings);

  const setRating = useCallback((movieId: number, stars: number) => {
    setRatings((prev) => {
      const next = { ...prev, [movieId]: stars };
      saveRatings(next);
      return next;
    });
  }, []);

  const removeRating = useCallback((movieId: number) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[movieId];
      saveRatings(next);
      return next;
    });
  }, []);

  const getRating = useCallback(
    (movieId: number) => ratings[movieId],
    [ratings]
  );

  return (
    <RatingContext.Provider value={{ ratings, setRating, getRating, removeRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const ctx = useContext(RatingContext);
  if (!ctx) throw new Error("useRating must be used within RatingProvider");
  return ctx;
};
