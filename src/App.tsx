import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface Task {
  description: string;
  deadline: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis officiis quam omnis sequi sapiente quidem et voluptate nulla deserunt, perferendis possimus, eaque dolore? Quam, eum magni error ratione perferendis magnam!", deadline:"2026-05-16", completed:false},
    {description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis officiis quam omnis sequi", deadline:"2023-01-12", completed:false},
    {description:"Lorem ipsum dolor sit amet, consectetur adipisicin", deadline:"2025-03-13", completed:false},
  ]);
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleToggleComplete = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
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
      <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} taskRemove={handleTaskRemove} />
    </div>
  );
};

export default App;
