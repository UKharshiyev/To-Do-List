import React, { useState } from "react";

interface Task {
    description: string;
    deadline: string;
    completed: boolean;
}

interface TaskFormProps {
    onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask({ description, deadline, completed: false });
        setDescription("");
        setDeadline("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-sm-flex p-3">
                <input
                    type="text"
                    className="d-block"
                    placeholder="Task Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    className="d-block my-2 my-sm-0 mx-sm-3"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                />
            <button className="btn btn-outline-primary" type="submit">Add Task</button>
            </div>
        </form>
    );
};

export default TaskForm;
