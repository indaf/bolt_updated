import React from "react";

type SpinnerProps = {
  isLoading: boolean;
  isMedia?: boolean;
};

const Spinner = ({ isLoading, isMedia }: SpinnerProps) => {
  return (
    <>
      {isLoading && (
        <div className="bg-black fixed opacity-80 left-0 bottom-0 right-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center z-[1000] flex flex-col gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          {isMedia == true && (
            <p className="text-white text-sm w-[90vw] text-center">
              La ou les médias sont en cours de téléchargement. Cela peut
              prendre quelques minutes, veuillez patienter.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Spinner;
