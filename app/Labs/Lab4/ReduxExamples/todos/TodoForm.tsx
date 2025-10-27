"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))} className="btn btn-success me-2" id="wd-add-todo-click">
        Add
      </Button>
      <Button onClick={() => dispatch(updateTodo(todo))} className="btn btn-primary me-2" id="wd-update-todo-click">
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        style={{ display: "inline-block", width: "auto" }}
      />
    </ListGroupItem>
  );
}