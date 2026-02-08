import { AiOutlineLike } from "react-icons/ai";

function Comment({ comment }) {
  return (
    <div className="flex gap-3 py-3">
      <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-medium">
        {comment.user[0]}
      </div>

      <div>
        <p className="text-sm font-medium">{comment.user}</p>
        <p className="text-xs text-gray-500">{comment.time}</p>
        <p className="mt-1 text-sm">{comment.text}</p>

        <button className="flex items-center gap-1 text-xs text-gray-500 mt-1 hover:text-black">
          <AiOutlineLike /> Like
        </button>
      </div>
    </div>
  );
}

export default Comment;
