import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('vibeFocusTasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
    const storedSelected = localStorage.getItem('vibeFocusSelectedTask');
    if (storedSelected) setSelectedTaskId(storedSelected);
  }, []);

  useEffect(() => {
    localStorage.setItem('vibeFocusTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (selectedTaskId) {
      localStorage.setItem('vibeFocusSelectedTask', selectedTaskId);
    } else {
      localStorage.removeItem('vibeFocusSelectedTask');
    }
  }, [selectedTaskId]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    if (!selectedTaskId) setSelectedTaskId(newTask.id);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter((task) => task.id !== id));
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  const selectTask = (id: string | null) => {
    setSelectedTaskId(id);
  };

  return { tasks, selectedTaskId, addTask, toggleTask, deleteTask, selectTask };
};
