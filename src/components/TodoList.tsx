import React, { ChangeEvent } from "react";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

interface Props {}

export interface ITodoItem {
	id: number;
	text: string;
}

interface State {
	input: string;
	todoItems: ITodoItem[];
}

class TodoList extends React.Component<Props, State> {
	state: State = {
		input: "",
		todoItems: [{ id: 0, text: "Hello World!" }]
	};
	onRemove = (id: number) => {
		const { todoItems } = this.state;
		todoItems.splice(
			todoItems.findIndex(todo => todo.id === id),
			1
		);
		this.setState({
			todoItems
		});
	};
	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget as HTMLInputElement;
		this.setState({ input: target.value });
	};
	onKeyPress = (e: React.KeyboardEvent) => {
		const target = e.currentTarget as HTMLInputElement;
		const { input, todoItems } = this.state;
		if (e.key === "Enter") {
			let nextId = Math.max(...todoItems.map(todo => todo.id));
			todoItems.push({ id: (nextId | 0) + 1, text: input });
			target.value = "";
			this.setState({
				input: "",
				todoItems
			});
		}
	};
	render() {
		const { onRemove, onChange, onKeyPress } = this;
		const { todoItems } = this.state;

		return (
			<div className="todos elevation-4">
				<h1 className="todos__title">React Todo</h1>
				<input className="todos__input" type="text" onChange={onChange} onKeyPress={onKeyPress} />
				<ul className="todos__list">
					{todoItems.map(todo => (
						<TodoItem
							key={todo.id}
							id={todo.id}
							text={todo.text}
							onRemove={() => {
								onRemove(todo.id);
							}}
						></TodoItem>
					))}
				</ul>
			</div>
		);
	}
}

export default TodoList;
