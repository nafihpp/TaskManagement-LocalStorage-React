import React from "react";
import "./TodoInput.css";

export const TodoInput = ({ handleInputValue, inputValue, handleEnter }) => {
    return (
        <div className="todo-input-container">
            <input
                placeholder="New Todo"
                name="todo"
                value={inputValue}
                onChange={handleInputValue}
                onKeyPress={handleEnter}
            />
        </div>
    );
};
