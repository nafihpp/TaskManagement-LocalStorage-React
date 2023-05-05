import "./Todo.css";
import { TodoList } from "./TodoList";
import { useEffect, useRef, useState } from "react";
import { TodoInput } from "./TodoInput";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const Todo = () => {
    const [selectedId, setSelectedId] = useState();
    const [editInput, setEditInput] = useState("");
    const [todo, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState("");

    //OnMount gets all the todos from local storage and set to todo
    useEffect(() => {
        let dataLocalStorage = localStorage.getItem("todos");
        if (dataLocalStorage) {
            console.log(JSON.parse(dataLocalStorage));
            setTodo(JSON.parse(dataLocalStorage));
        }
    }, []);

    //handleChange the Input todo
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };
    //add todo and update state
    const addTodo = () => {
        if (inputValue !== "") {
            let currentTodo = {
                id: uuidv4(),
                task: inputValue,
                completed: false,
            };
            setTodo((prev) => [...prev, currentTodo]);
            setInputValue("");
        } else {
            alert("enter the todo, can't be empty");
        }
    };
    //when adding todo update the localstorage
    useEffect(() => {
        if (todo.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todo));
        }
    }, [todo]);

    const handleEnter = (event) => {
        const { key } = event;
        if (key == "Enter") {
            addTodo();
        }
    };
    //edit Button
    const editTodo = (id) => {
        setSelectedId(id);
        let localData = localStorage.getItem("todos");
        let parsedData = JSON.parse(localData);
        let editingTodo = parsedData.filter((tod) => tod.id == id);
        editingTodo.forEach((EditingElement) => {
            setEditInput(EditingElement.task);
        });
    };
    //editAndSave
    const editAndSave = (id) => {
        if (id) {
            let localData = localStorage.getItem("todos");
            let parsedData = JSON.parse(localData);
            let uneditTodos = parsedData.filter((tod) => tod.id !== id);
            let editedTodo = parsedData.filter((tod) => tod.id == id);
        }
    };

    //delete todoo and then update localstorage and state
    const deleteTodo = (id) => {
        let localData = localStorage.getItem("todos");
        let parsedData = JSON.parse(localData);
        let undeleted = parsedData.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(undeleted));
        setTodo(undeleted);
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="todo-input-container">
                <TodoInput
                    handleInputValue={handleInputValue}
                    inputValue={inputValue}
                    handleEnter={handleEnter}
                />
                <button onClick={() => addTodo()}>ADD TODO</button>
            </div>
            <div className="todo-list-container">
                <TodoList
                    todo={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    editInput={editInput}
                    setEditInput={setEditInput}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    editAndSave={editAndSave}
                />
            </div>
        </div>
    );
};
