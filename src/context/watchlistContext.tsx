import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { IMovie } from "@/types";
import { saveWatchlist, getWatchlist } from "@/utils/helper";

interface WatchlistContextType {
  watchlist: IMovie[];
  addToWatchlist: (movie: IMovie) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<IMovie[]>(getWatchlist);

  const addToWatchlist = useCallback((movie: IMovie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const next = [...prev, movie];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = prev.filter((m) => m.id !== id);
      saveWatchlist(next);
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: string) => watchlist.some((m) => m.id === id),
    [watchlist]
  );

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
};
