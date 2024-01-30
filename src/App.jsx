import { Provider } from "react-redux";
import AddTodoForm from "./components/addTodoForm";
import TodoList from "./components/todoList";
import store from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <h2 className="text-center my-10 text-3xl font-bold text-gray-700">
        todo with RTK
      </h2>
      <AddTodoForm />
      <TodoList />
    </Provider>
  );
}

export default App;
