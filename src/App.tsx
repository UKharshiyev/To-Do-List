import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface Task {
    description: string;
    deadline: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleAddTask = (task: Task) => {
        setTasks(prevTasks => [...prevTasks, task]);
    };

    const handleToggleComplete = (index: number) => {
        setTasks(prevTasks =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleTaskRemove = (index: number) => {
        setTasks(tasks => tasks.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1 className="text-center">To-Do List</h1>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                taskRemove={handleTaskRemove}
            />
        </div>
    );
};

export default App;
