import React from "react";

interface PaginationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        onClick={onNext}
        disabled={disableNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
