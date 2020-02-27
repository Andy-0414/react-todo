import React from "react";
import { ITodoItem } from "../TodoList";
import "./TodoItem.css";

interface Todo extends ITodoItem {
	onRemove(): void;
}

const TodoItem: React.SFC<Todo> = ({ id, text, onRemove }) => (
	<li className="todos__list__item">
		<p>{text}</p>
		<button onClick={onRemove}>×</button>
	</li>
);

export default TodoItem;
