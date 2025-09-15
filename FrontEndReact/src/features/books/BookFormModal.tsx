import React from "react";
import BookForm from "./BookForm";
import type { BookDTO } from "./BookDTO";

interface BookFormModalProps {
  open: boolean;
  addItem: (item: BookDTO) => void;
  onClose: () => void;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ addItem, open, onClose }) => {
  if (!open) return null;
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-30">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
        <div>
            <BookForm addItem={addItem} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default BookFormModal;
