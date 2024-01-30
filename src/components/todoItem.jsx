import { useDispatch } from "react-redux";
import { deleteAsyncTodo, toggleAsyncTodo } from "../features/todos/todosSlice";

function TodoItem({ id, data, completed }) {
  const dispatch = useDispatch();

  return (
    <div className="border border-gray-200 px-4 py-2 rounded-sm flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleAsyncTodo({ id, completed }))}
        />
        <p className={`${completed && "line-through decoration-rose-600"}`}>
          {data}
        </p>
      </div>
      <button
        type="submit"
        className="bg-red-500 py-1 px-2 rounded-md text-white  border border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300"
        onClick={() => dispatch(deleteAsyncTodo({ id, data }))}
      >
        delete
      </button>
    </div>
  );
}

export default TodoItem;
