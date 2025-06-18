'use client';

import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const TasksContent = () => {
  const { tasks, updateTask, deleteTask, addTask } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  // Filter tasks based on search term, status, and priority
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleTaskStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
    toast.success(`Task status updated to ${newStatus}`);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
      toast.success('Task deleted successfully');
    }
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    
    if (!newTask.title) {
      toast.error('Task title is required');
      return;
    }
    
    try {
      addTask(newTask);
      toast.success('Task added successfully!');
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0]
      });
      setShowNewTaskForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isTaskOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showNewTaskForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showNewTaskForm && (
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">New Task</h2>
          <form onSubmit={handleNewTaskSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleNewTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleNewTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`border rounded-md p-4 ${task.status === 'completed' ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        isTaskOverdue(task.dueDate) && task.status !== 'completed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                        {isTaskOverdue(task.dueDate) && task.status !== 'completed' && ' (Overdue)'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTaskStatusChange(
                      task.id, 
                      task.status === 'completed' ? 'pending' : 'completed'
                    )}
                    className={`px-3 py-1 rounded-md text-sm ${
                      task.status === 'completed'
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {task.status === 'completed' ? 'Mark Pending' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TasksPage = () => {
  return (
    <DashboardLayout>
      <TasksContent />
    </DashboardLayout>
  );
};

export default TasksPage;
