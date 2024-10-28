// src/contexts/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://6z5p7y-4000.csb.app/api/tasks');
        //console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks(); 
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await axios.post('https://6z5p7y-4000.csb.app/api/tasks', newTask);
      console.log(response.data);
      setTasks(  [...tasks,response.data] );
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `https://6z5p7y-4000.csb.app/api/tasks/${id}`,
        updatedTask,
        {
          headers: {
            'Content-Type': 'application/json', // Ensures JSON format
          },
        }
      );
  
      // Update the task in the state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
    }
  };
  
  

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://6z5p7y-4000.csb.app/api/tasks/${id}`); 
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
