import { MdBookmarkBorder } from "react-icons/md";
import MovieCard from "@/common/MovieCard";
import { useWatchlist } from "@/context/watchlistContext";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <section className="max-w-screen-xl mx-auto px-4 pt-28 lg:pt-36 min-h-screen">
      <div className="relative mb-8">
        <h2 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 font-semibold sm:font-bold">
          My Watchlist
        </h2>
        <div className="line" />
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 dark:text-gray-400 text-gray-500">
          <MdBookmarkBorder className="text-[64px]" />
          <p className="sm:text-base text-[14.75px] font-medium">
            Your watchlist is empty. Start adding movies!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
            >
              <MovieCard movie={movie} category="movie" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;
