import React from "react";

type SpinnerProps = {
  isLoading: boolean;
};

const Spinner = ({ isLoading }: SpinnerProps) => {
  return (
    <>
      {isLoading && (
        <div className="bg-black fixed opacity-80 left-0 bottom-0 right-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center z-[1000]">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        </div>
      )}
    </>
  );
};

export default Spinner;
