import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo } from "../features/todos/todosSlice";

function AddTodoForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    dispatch(addAsyncTodo({ title: value }));
    setValue("");
  };

  return (
    <>
      <div
        className={`container px-4 ${loading ? "opacity-50" : "opacity-100"}`}
      >
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="write todo..."
            autoComplete="false"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 p-2 focus:outline-none rounded-sm w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 px-3 py-2 rounded-md text-white mt-5 font-bold border border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 cursor-pointer"
          >
            {`${loading ? "adding..." : "add todo"}`}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTodoForm;
