
import React, { useState } from "react";
import type { BookDTO } from "./BookDTO";

interface Props {
  addItem: (item: BookDTO) => void;
  onClose: () => void;
}

const BookForm: React.FC<Props> = ({ addItem, onClose }) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [availability, setAvailability] = useState(true);
  const [touched, setTouched] = useState({ title: false, owner: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, owner: true });
    if (!title.trim() || !owner.trim()) return;
    // Call the addItem prop with the new book data
    // This is implement in the BooksPage component and
    // will handle the api call to save the new book
    addItem({
      title: title.trim(),
      owner: owner.trim(),
      availability,
    });
    setTitle("");
    setOwner("");
    setAvailability(true);
    setTouched({ title: false, owner: false });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
        placeholder="Book Title"
        className={`border p-2 rounded w-full ${touched.title && !title.trim() ? 'border-red-400' : ''}`}
      />
      {touched.title && !title.trim() && (
        <div className="text-red-500 text-xs ml-1">Title is required.</div>
      )}
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, owner: true }))}
        placeholder="Owner"
        className={`border p-2 rounded w-full ${touched.owner && !owner.trim() ? 'border-red-400' : ''}`}
      />
      {touched.owner && !owner.trim() && (
        <div className="text-red-500 text-xs ml-1">Owner is required.</div>
      )}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
        <span>Available</span>
      </label>
      <div className="flex gap-2 justify-end mt-4">
         <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>
    </form>
  )
};

export default BookForm;
