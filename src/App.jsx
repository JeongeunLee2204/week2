import { useState } from "react";
import Button from "./button";
import Input from "./input";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "투두 만들어보기" },
    { id: 2, task: "희원 혜원 혜윤 건 찬민" },
  ]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100 + 2), task: text },
    ]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: newText } : item))
    );
    setEditingId(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={addTodo}>할 일 등록</Button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-container">
            {editingId !== todo.id && (
              <div className="todo-item">
                <p>{todo.id}</p>
                <p>{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div className="todo-item editing">
                <p>{todo.id}</p>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <div className="button-group">
              {editingId === todo.id ? (
                <Button onClick={() => updateTodo(todo.id, editText)}>
                  수정 완료
                </Button>
              ) : (
                <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
              )}
              <Button onClick={() => deleteTodo(todo.id)}>삭제</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
