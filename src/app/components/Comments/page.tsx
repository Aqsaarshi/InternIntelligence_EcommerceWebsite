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
      className={`w-full bg-gradient-to-r from-black via-blue-950 to-purple-950 py-16 px-4 ${className}`}
    >
      <div className="max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-purple-700">
        <h2 className="text-3xl font-extrabold text-purple-300 mb-8 text-center tracking-wide">
          Share Your Thoughts 💬
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write something insightful..."
            rows={4}
            className="resize-none p-5 rounded-xl border border-blue-800 bg-black text-white shadow-sm focus:ring-2 focus:ring-purple-600 outline-none transition placeholder-purple-400"
            required
          />
          <button
            type="submit"
            className="self-end bg-purple-700 text-white px-10 py-3 rounded-xl hover:bg-purple-600 active:bg-purple-800 transition shadow-lg font-semibold"
          >
            Submit
          </button>
        </form>

        <div className="mt-10">
          {comments.length === 0 ? (
            <p className="text-center text-purple-400 italic tracking-wide">
              No comments yet. Be the first to share your voice!
            </p>
          ) : (
            <ul className="space-y-6">
              {comments.map(({ id, text }) => (
                <li
                  key={id}
                  className="relative bg-black border border-purple-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <p className="text-purple-200 whitespace-pre-wrap text-lg font-medium">
                    {text}
                  </p>
                  <button
                    onClick={() => handleDelete(id)}
                    aria-label="Delete comment"
                    className="absolute top-4 right-4 text-purple-400 hover:text-purple-600 transition text-xl font-bold"
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
