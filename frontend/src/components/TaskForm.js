import React, { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import DatePicker from './DatePicker';

function TaskForm({ taskToEdit, onSubmit, onCancel }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDueDate] = useState('');
  const [recurrenceOptions, setRecurrenceOptions] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.due_date.split('T')[0]); 
      setRecurrenceOptions(taskToEdit.recurrenceOptions);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, due_date, recurrenceOptions };

    if (taskToEdit) {
      await onSubmit(taskToEdit.id, taskData);
    } else {
      await addTask(taskData);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setRecurrenceOptions({});
    if (onCancel) { // Check if onCancel is defined before calling
      onCancel();
    }
  };

  const handleRecurrenceSelect = (options) => {
    setRecurrenceOptions(options);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300">
      <h2 className="text-lg font-bold mb-2">{taskToEdit ? 'Edit Task' : 'Add a Task'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 mb-2"
      />
      <input
        type="date"
        value={due_date}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 mb-2"
      />
      
      <DatePicker onSelectDates={handleRecurrenceSelect} />
      
      <button type="submit" className="w-full p-2 bg-blue-500 text-white">
        {taskToEdit ? 'Update' : 'Add Task'}
      </button>
      {taskToEdit && (
        <button type="button" onClick={onCancel} className="w-full p-2 bg-gray-400 text-white mt-2">
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
