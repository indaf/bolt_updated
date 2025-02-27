import React, { useState, memo } from "react";

interface PostMediaViewerProps {
  medias: any;
  comIsOpen?: boolean;
}

export const PostMediaViewer = memo(function PostMediaViewer({
  medias,
  comIsOpen,
}: PostMediaViewerProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    if (medias && currentMediaIndex < medias.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
    }
  };

  const previousMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-[90%] relative bg-black flex items-center justify-center">
      {medias &&
        medias[currentMediaIndex] &&
        (medias[currentMediaIndex].type == "video" ? (
          <video
            src={
              import.meta.env.VITE_SERVICE_API_URL +
              medias[currentMediaIndex].url
            }
            controls={true}
            className={`w-[calc(${!comIsOpen ? "80vh" : "60vh"} / 16)] h-[${
              !comIsOpen ? "80vh" : "60vh"
            }] lg:w-[calc(80vh / 16)] lg:h-[80vh] object-contain`}
          />
        ) : (
          <img
            src={
              import.meta.env.VITE_SERVICE_API_URL +
              medias[currentMediaIndex].url
            }
            alt=""
            className={`w-[calc(${!comIsOpen ? "80vh" : "60vh"} / 16)] h-[${
              !comIsOpen ? "80vh" : "60vh"
            }] lg:w-[calc(80vh / 16)] lg:h-[80vh] object-contain`}
          />
        ))}
      {medias && medias.length > 1 && (
        <>
          {currentMediaIndex > 0 && (
            <button
              onClick={previousMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
            >
              ‹
            </button>
          )}
          {currentMediaIndex < medias.length - 1 && (
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
            >
              ›
            </button>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {medias.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentMediaIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
