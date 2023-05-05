import React, { useEffect, useRef, useState } from "react";
import "./TodoList.css";
import editButton from "../../assets/image-7.png";
import deleteButton from "../../assets/image-9.png";

export const TodoList = ({
    todo,
    deleteTodo,
    editTodo,
    editInput,
    setEditInput,
    selectedId,
    setSelectedId,
    editAndSave,
    editInputRef,
    completeTodo,
}) => {
    return (
        <div className="completed-todo-container">
            {todo !== null &&
                todo?.map((tod) => (
                    <div className="completed-todo-box" key={tod.id}>
                        {selectedId !== tod.id ? (
                            <div className="box">
                                <div
                                    className="todo-title"
                                    onClick={() => completeTodo(tod.id)}
                                >
                                    <p>{tod?.task}</p>
                                </div>
                                <div className="icons-container">
                                    <div
                                        className="todo-editIcon-container"
                                        onClick={() => {
                                            editTodo(tod?.id);
                                        }}
                                    >
                                        <img src={editButton} alt="edit-icon" />
                                    </div>
                                    <div
                                        className="todo-deleteIcon-container"
                                        onClick={() => deleteTodo(tod?.id)}
                                    >
                                        <img
                                            src={deleteButton}
                                            alt="delete-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            tod?.id === selectedId && (
                                <div className="edit-todo-container">
                                    <div className="edit-box">
                                        <input
                                            ref={editInputRef}
                                            value={editInput}
                                            onChange={(e) =>
                                                setEditInput(e.target.value)
                                            }
                                            className="edit-input"
                                        />
                                        <button
                                            className="save-button"
                                            onClick={() => editAndSave(tod?.id)}
                                        >
                                            SAVE
                                        </button>
                                        <button
                                            className="cancel-button"
                                            onClick={() => setSelectedId()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
        </div>
    );
};
