import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskForm from './TaskForm';

function TaskList() {
  const { tasks, deleteTask, updateTask } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Function to format recurrence details
  const formatRecurrence = ({ recurrenceType, specificDays, startDate, endDate }) => {
    if (!recurrenceType) return 'No recurrence set';

    let recurrenceText = `Recurs: ${recurrenceType}`;

    if (specificDays?.length) {
      recurrenceText += ` on ${specificDays.join(', ')}`;
    }

    if (startDate || endDate) {
      const start = startDate ? new Date(startDate).toLocaleDateString() : 'N/A';
      const end = endDate ? new Date(endDate).toLocaleDateString() : 'N/A';
      recurrenceText += ` (starts: ${start}, ends: ${end})`;
    }

    return recurrenceText;
  };


  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

 
  const handleUpdate = async (id, updatedTask) => {
    await updateTask(id, updatedTask);
    setTaskToEdit(null); 
  };

  
  const handleCancel = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} className="border border-gray-400 rounded-md p-4 mb-4 shadow-md">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">Due: {new Date(task.due_date).toLocaleDateString()}</p>
            {task.recurrenceoptions && (
              <p className="text-sm text-gray-600">{formatRecurrence(task.recurrenceoptions)}</p>
            )}
          </div>
          <div className="mt-2">
            <button
              onClick={() => handleEdit(task)}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2 hover:bg-blue-600 transition duration-150"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      
      
      {taskToEdit && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default TaskList;
