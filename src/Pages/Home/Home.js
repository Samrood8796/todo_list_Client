import axios from "../../utils/axios";
import "./Home.css";
import { addTask, getTasks, deleteTask, changeStatus } from "../../utils/constants";
import React, { useState, useEffect } from "react";

function Home() {
  const initailState = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initailState);
  const [todo, setTodo] = useState("");
  const [desc, setDesc] = useState("");
  const [showdesc, setShowDesc] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  // const [deleted, setDelete] = useState([]);
  // const [currentTodo, setCurrentTodo] = useState({});
  // const [isActive, setIsActive] = useState(false);
  const [isAc, setIsAc] = useState(false);


  const getTodoos = async () => {
    try {
      const response = await axios.get(getTasks)
      setTodos(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  const handelDelete = (id) => {
    console.log(id);
    axios.delete(`${deleteTask}/${id}`).then(() => {
      getTodoos()
    })
  }

  const add = (e) => {
    e.preventDefault()
    if (!todo.replace(/\s/g, '').length) {
      return;
    }
    console.log(todos);
    const task = { todo, desc }
    axios.post(addTask, task).then((response) => {
      console.log(response.data);
      setTodos([...todos, response.data])
      setTodo("")
      setDesc("")
    })
  }
  const handleStatus = (status,id) => {
    axios.post(changeStatus,{status,id}).then((response)=>{
      console.log(response);
      getTodoos()
    })
  }
  useEffect(() => {
    getTodoos()
  }, []);
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's  {new Date().toLocaleString("en-US", { month: "long" })} 🌝 ☕ </h2>
      </div>
      <div className="bg-[#3ab4cc] p-2">
        <div className="input ">
          <input
            name="title"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="🖊 Add Title..."
          />
        </div>
        <div className="mt-2 w-full my-2">
          <textarea
            className=" w-full focus:outline-none"
            name="desc"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="🖊 Add desc..."
          />
        </div>
        <div onClick={add} className="bg-black  text-center rounded-md ">
          <i className="text-white w-20 h-20 text-3xl cursor-pointer" >+</i>
        </div>
      </div>
      {/* delte */}
      {todos.map((element, i) => {
        return (
          <div className="todos" key={i}>
            <div className="todo" key={element._id} >
              <div className="left ">
                <input className="px-2 w-4" type="checkbox" onClick={(e) => { handleStatus(e.target.checked,element._id) }} checked={element.status} />
                <p onClick={() => setShowDesc(i)}>{element.title}</p>
                 {/* <p onClick={() => setShowDesc(false)}>{element.desc}</p> */}
              </div>
              <div className="flex gap-3">
                {/* <i className="fa-solid fa-pen-to-square" ></i> */}
                <i className="fas fa-times cursor-pointer" onClick={() => { handelDelete(element._id); }}
                ></i>
              </div>
              {showdesc === i &&
              <div onClick={()=>setShowDesc(false)}  className="fixed w-full left-10 flex items-center justify-center z-50">
                <div className="bg-white w-48  p-2  rounded shadow-lg">
                <h3 class="text-xl text-center underline font-bold mb-2">{element.title}</h3>
                  <p className=" mb-4">{element.desc}</p>
                  {/* <div class="flex justify-end">
                    <button onClick={()=>setShowDesc(false)} class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
                  </div> */}
                </div>
              </div>
              }
            </div>
          </div>
        );
      })}
      <React.Fragment>
        <div className="accordion">
          <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsAc(!isAc)}>
              <div>Completed</div>
              <div>{isAc ? "-" : "+"}</div>
            </div>
            {todos.map((elem) => {
              if (elem.status) {
                return isAc && <div className="accordion-content">{elem.title}</div>
              }
              return null;
            })}
          </div>
        </div>
      </React.Fragment>
      <div className="remove">
      </div>
    </div>
  );
}
export default Home;