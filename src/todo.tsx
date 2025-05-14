import { useEffect, useState } from "react";
import "./todo.css";
import { Edit, Trash2 } from "lucide-react";
export default function Todo() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      description: "Learn TypeScript",
      status: "Pending",
      complexity: "High",
    },
    {
      id: 2,
      description: "Learn React",
      status: "Completed",
      complexity: "Medium",
    },
    {
      id: 3,
      description: "Learn Node.js",
      status: "Pending",
      complexity: "Low",
    },
  ]);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState("");
  const [editComplex, setEditComplex] = useState("");

  const filterList = (query?: string) => {
    const updatedList = todoList.filter((todo) => {
      if (status == "All") return true;
      else return status == todo.status;
    });

    if (query) {
      return updatedList.filter((todo) =>
        todo.description.toLowerCase().includes(search.toLowerCase())
      );
    } else return updatedList;
  };

  const saveTask = () => {
    const id = todoList.length + 1;
    const item = {
      id: id,
      description: description,
      status: "Pending",
      complexity: complexity,
    };
    setTodoList([...todoList, item]);
    setDescription("");
  };

  const setEdit = (todo: any) => {
    setEditId(todo.id);
    setEditDesc(todo.description);
    setEditComplex(todo.complexity);
  };

  const deleteTask = (id: any) => {
    const newList = todoList.filter((data) => data.id != id);
    setTodoList(newList);
  };

  const editTask = (id: any) => {
    const updated = { complexity: editComplex, description: editDesc };
    const updatedList = todoList.map((todo) => {
      if (todo.id == id) {
        return (todo = { ...todo, ...updated });
      } else return (todo = todo);
    });
    setTodoList(updatedList);
    setEditId(null);
    setEditComplex("");
    setEditDesc("");
  };

  const updateStatus = (event: any, id: number) => {
    setTodoList((prevList) => {
      return prevList.map((todo) =>
        todo.id == id
          ? {
              ...todo,
              status: event.target.checked ? "Completed" : "Pending",
            }
          : todo
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Simple Todo List</h1>
          <h4>Stay organised and productive</h4>
          <div className="form">
            <input
              type="text"
              value={description}
              placeholder="Add new task......"
              onChange={(e) => setDescription(e.target.value)}
            />
            <select onChange={(e) => setComplexity(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button className="savebtn" onClick={saveTask}>
              + Add task
            </button>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search......"
            />
          </div>
          <div className="btnTab">
            <button className="savebtn" onClick={() => setStatus("All")}>
              All Tasks
            </button>
            <button className="savebtn" onClick={() => setStatus("Pending")}>
              Active
            </button>
            <button className="savebtn" onClick={() => setStatus("Completed")}>
              Completed
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filterList(search).map((todo) => (
              <div
                className="items"
                style={{
                  borderLeft:
                    todo.complexity == "High"
                      ? "5px solid red"
                      : todo.complexity == "Medium"
                      ? "5px solid orange"
                      : "5px solid green",
                }}
              >
                {editId == todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                    <select
                      value={editComplex}
                      onChange={(e) => setEditComplex(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button
                      className="savebtn"
                      onClick={() => editTask(todo.id)}
                    >
                      Edit task
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      style={{ flex: 1 }}
                      checked={todo.status == "Pending" ? false : true}
                      onChange={(e) => updateStatus(e, todo.id)}
                    />
                    <div style={{ flex: 3 }}> {todo.description}</div>
                    <button className="iconsbtn" onClick={() => setEdit(todo)}>
                      <Edit />
                    </button>
                    <button
                      className="iconsbtn"
                      onClick={() => deleteTask(todo.id)}
                    >
                      <Trash2 />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
