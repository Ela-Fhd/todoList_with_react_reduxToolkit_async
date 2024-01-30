import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./todoItem";
import { useEffect } from "react";
import { getAsyncTodos } from "../features/todos/todosSlice";

function TodoList() {
  const { todos, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);

  if (loading) return <p>loading...</p>;

  return (
    <div className="container px-4">
      <div className="my-10 space-y-3">
        {todos.map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
      </div>
    </div>
  );
}

export default TodoList;
