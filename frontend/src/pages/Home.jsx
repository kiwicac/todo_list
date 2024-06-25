import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {
  const [todos, setTodos] = useState([]);
  const [mainInp, setMainInp] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error("error accured " + err);
      });
  };
  const switchC = (check, id) => {
    console.log(check);
    axios
      .patch("http://localhost:3000/", { checked: check, _id: id })
      .then(() => {
        console.log("Update successful");
        getData();
      })
      .catch((err) => {
        console.error("unexpected error " + err);
      });
    };
    const addNewTask = (input) => {
      axios
      .post("http://localhost:3000/", { checked: false, task: input })
      .then(() => {
        console.log("posted successfuly")
        getData();
      }).catch(err=>{
        console.error("error accured",err)
      })
  };
  const deleteTodo =(id)=>{
    axios.delete(`http://localhost:3000/details/${id}`)
    .then(()=>{
      console.log("deleted successfully")
      getData()
    }).catch((err)=>{
      console.error("unexpected error:",err)
    })
  }
  return (
    <div>
      <h1>Todo list</h1>
      <input
        type="text"
        placeholder="add task..."
        value={mainInp}
        onChange={(e) => {
          setMainInp(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addNewTask(mainInp);
          setMainInp("");
        }}
      >
        add
      </button>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              style={{
                padding: "10px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
              key={todo._id}
            >
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={(e) => {
                  console.log(e.target.checked);
                  switchC(e.target.checked, todo._id);
                }}
              />
              <Link to={`/details/${todo._id}`}>{todo.task}</Link>
              <button onClick={()=>{deleteTodo(todo._id)}}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
