import React, { useState } from "react";
import TaskModalUI from "../ui/TaskModalUI";
import { TaskModalProps } from "../../types/components/modal";
const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onAdd }) => {
	const [name, setName] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !start || !end) return;
		onAdd({ name, start, end });
		setName("");
		setStart("");
		setEnd("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<TaskModalUI
			name={name}
			start={start}
			end={end}
			onNameChange={setName}
			onStartChange={setStart}
			onEndChange={setEnd}
			onSubmit={handleSubmit}
			onClose={onClose}
		/>
	);
};

export default TaskModal;
