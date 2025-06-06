import React, { useEffect, useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [skill, setSkill] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc, skill }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle(''); setDesc(''); setSkill('');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">TaskVerse</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" required />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" className="border p-2 w-full" required />
        <input value={skill} onChange={e => setSkill(e.target.value)} placeholder="Skill Required" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="border p-3 mb-3 rounded shadow-sm">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <small className="italic">Skill: {task.skill}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
