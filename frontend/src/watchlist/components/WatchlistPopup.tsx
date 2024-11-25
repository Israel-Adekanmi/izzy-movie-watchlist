import React from "react";

interface WatchlistPopupProps {
  watchlists: { watchlistId: string; name: string }[];
  onSelect: (watchlistId: string) => void;
  onClose: () => void;
}

const WatchlistPopup: React.FC<WatchlistPopupProps> = ({
    watchlists,
    onSelect,
    onClose,
  }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Select a Watchlist</h2>
          <ul className="space-y-3">
            {watchlists.map((watchlist) => (
              <li key={watchlist.watchlistId}>
                <button
                  onClick={() => {
                    if (watchlist.watchlistId) {
                      onSelect(watchlist.watchlistId); // Pass valid watchlistId
                    } else {
                      console.error("Invalid watchlistId:", watchlist);
                    }
                  }}
                  className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded"
                >
                  {watchlist.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  

export default WatchlistPopup;
