
import TaskForm from '@/components/TaskForm';
import React from 'react';
import TaskList from '../components/TaskList'; 

const Home = () => {
  return (
    <div className="container  mx-auto p-10">
      <h1 className="  text-4xl  font-bold text-center">Pearl thoughts Assignment</h1>
    <TaskForm/>
      <TaskList />
    </div>
  );
};

export default Home; 

