import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { saveRatings, getRatings } from "@/utils/helper";

interface RatingContextType {
  ratings: Record<number, number>;
  addRating: (id: number, stars: number) => void;
  removeRating: (id: number) => void;
  getRating: (id: number) => number | undefined;
}

const RatingContext = createContext<RatingContextType | null>(null);

export const RatingProvider = ({ children }: { children: ReactNode }) => {
  const [ratings, setRatings] = useState<Record<number, number>>(getRatings);

  const addRating = useCallback((id: number, stars: number) => {
    setRatings((prev) => {
      const next = { ...prev, [id]: stars };
      saveRatings(next);
      return next;
    });
  }, []);

  const removeRating = useCallback((id: number) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[id];
      saveRatings(next);
      return next;
    });
  }, []);

  const getRating = useCallback(
    (id: number) => ratings[id],
    [ratings]
  );

  return (
    <RatingContext.Provider value={{ ratings, addRating, removeRating, getRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const ctx = useContext(RatingContext);
  if (!ctx) throw new Error("useRating must be used within RatingProvider");
  return ctx;
};
