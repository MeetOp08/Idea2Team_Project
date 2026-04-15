import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/workspace.css';

const TaskBoard = ({ workspaceId, role, userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee_id: '', due_date: '' });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/tasks/${workspaceId}`);
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/workspace/members/${workspaceId}`);
      setMembers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchTasks();
      if (role === 'founder') {
        fetchMembers();
      }
    }
  }, [workspaceId, role]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put('http://localhost:1337/api/tasks/update-status', { task_id: taskId, status: newStatus });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1337/api/tasks/create', { ...newTask, workspace_id: workspaceId });
      setShowTaskForm(false);
      setNewTask({ title: '', description: '', assignee_id: '', due_date: '' });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  if (loading) return <div className="p-4" style={{ color: 'var(--gray-500)' }}>Syncing tasks...</div>;

  const statuses = ['todo', 'inProgress', 'done'];

  return (
    <div className="task-board-canvas" style={{ width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)' }}>Task Process</h2>
        {role === 'founder' && (
          <button 
            onClick={() => setShowTaskForm(!showTaskForm)}
            style={{
                background: showTaskForm ? 'var(--gray-800)' : 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
          >
            {showTaskForm ? 'Cancel' : '+ New Task'}
          </button>
        )}
      </div>

      {showTaskForm && role === 'founder' && (
        <form onSubmit={handleCreateTask} style={{
            background: 'white',
            padding: '24px',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '24px',
            border: '1px solid var(--gray-200)'
        }}>
          <h4 style={{ marginBottom: '20px', fontWeight: 700, color: 'var(--gray-800)' }}>Create New Task</h4>
          <div className="row">
              <div className="col-md-6 mb-3">
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '8px' }}>Task Title</label>
                <input type="text" className="form-control" style={{ borderRadius: '8px', border: '1px solid var(--gray-300)', padding: '10px' }} required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '8px' }}>Assign To</label>
                <select className="form-control" style={{ borderRadius: '8px', border: '1px solid var(--gray-300)', padding: '10px' }} required value={newTask.assignee_id} onChange={e => setNewTask({...newTask, assignee_id: e.target.value})}>
                  <option value="">Select Member...</option>
                  {members.map(m => (
                    <option key={m.user_id} value={m.user_id}>{m.full_name} ({m.role})</option>
                  ))}
                </select>
              </div>
          </div>
          <div className="mb-3">
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '8px' }}>Description</label>
            <textarea className="form-control" rows="3" style={{ borderRadius: '8px', border: '1px solid var(--gray-300)', padding: '10px' }} required value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
          </div>
          <div className="mb-4">
             <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '8px' }}>Deadline</label>
             <input type="date" className="form-control" style={{ maxWidth: '200px', borderRadius: '8px', border: '1px solid var(--gray-300)', padding: '10px' }} required value={newTask.due_date} onChange={e => setNewTask({...newTask, due_date: e.target.value})} />
          </div>
          <button type="submit" style={{
              background: 'var(--primary-600)',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 600,
              cursor: 'pointer'
          }}>Assign Task</button>
        </form>
      )}

      <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '20px' }}>
        {statuses.map(status => (
          <div key={status} style={{ 
              flex: '1', 
              minWidth: '300px',
              background: 'rgba(255, 255, 255, 0.6)', 
              backdropFilter: 'blur(10px)',
              padding: '20px', 
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
          }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: status === 'todo' ? '2px solid var(--info-500)' : status === 'inProgress' ? '2px solid var(--warning-500)' : '2px solid var(--success-500)'
            }}>
                <h3 style={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gray-800)', margin: 0 }}>
                    {status.replace('inProgress', 'In Progress').toUpperCase()}
                </h3>
                <span style={{ background: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', boxShadow: 'var(--shadow-sm)' }}>
                    {tasks.filter(t => t.status === status).length}
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: 'var(--radius-lg)', 
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--gray-100)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: status === 'done' ? 'var(--success-500)' : 'var(--primary-500)' }}></div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--gray-900)' }}>{task.title}</h4>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: '0 0 15px 0', lineHeight: 1.5 }}>{task.description}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed var(--gray-200)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }} title={task.assignee_name}>
                                {task.assignee_name ? task.assignee_name.substring(0,2).toUpperCase() : '??'}
                            </div>
                            <small style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 500 }}>{new Date(task.due_date).toLocaleDateString()}</small>
                        </div>

                        {(role === 'founder' || String(task.assignee_id) === String(userId)) ? (
                        <select 
                            style={{ 
                                padding: '4px 8px', 
                                fontSize: '0.75rem', 
                                border: '1px solid var(--gray-200)', 
                                borderRadius: '6px', 
                                background: 'var(--gray-50)',
                                outline: 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                color: 'var(--gray-700)'
                            }}
                            value={task.status} 
                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                            <option value="todo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        ) : (
                        <span style={{ 
                            fontSize: '0.7rem', 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            background: status === 'done' ? 'var(--success-50)' : 'var(--gray-100)', 
                            color: status === 'done' ? 'var(--success-600)' : 'var(--gray-600)',
                            fontWeight: 600
                        }}>{status.replace('inProgress', 'In Progress').toUpperCase()}</span>
                        )}
                    </div>
                </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
