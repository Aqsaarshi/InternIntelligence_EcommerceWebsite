"use client";

import { useState } from "react";

type Comment = {
  id: number;
  text: string;
};

type Props = {
  className?: string;
};

export default function ProfessionalComments({ className = "" }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newComment: Comment = {
      id: Date.now(),
      text: input.trim(),
    };

    setComments([newComment, ...comments]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <section
      className={`w-full bg-gradient-to-r from-indigo-50 to-pink-100 py-16 ${className}`}
    >
      <div
        className="max-w-lg mx-auto p-8 rounded-2xl shadow-xl bg-pink-100 bg-opacity-90 border border-pink-300"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-3xl font-extrabold text-pink-800 mb-8 text-center tracking-wide">
          Your Feedback Matters
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            className="resize-none p-5 rounded-xl border border-pink-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none transition bg-white text-pink-900 font-medium placeholder-pink-400"
            required
          />
          <button
            type="submit"
            className="self-end bg-pink-600 text-white px-10 py-3 rounded-xl hover:bg-pink-700 active:bg-pink-800 transition shadow-md font-semibold"
          >
            Submit
          </button>
        </form>

        <div className="mt-10">
          {comments.length === 0 ? (
            <p className="text-center text-pink-400 italic tracking-wide">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <ul className="space-y-6">
              {comments.map(({ id, text }) => (
                <li
                  key={id}
                  className="relative bg-white bg-opacity-90 border border-pink-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <p className="text-pink-800 whitespace-pre-wrap text-lg font-medium">
                    {text}
                  </p>
                  <button
                    onClick={() => handleDelete(id)}
                    aria-label="Delete comment"
                    className="absolute top-4 right-4 text-pink-500 hover:text-pink-700 transition text-xl font-bold"
                    title="Delete Comment"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
