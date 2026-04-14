import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/workspace.css';

const TeamMembers = ({ workspaceId, role }) => {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberId, setNewMemberId] = useState("");
  const [availableFreelancers, setAvailableFreelancers] = useState([]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/workspace/members/${workspaceId}`);
      setMembers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };

  const fetchFreelancers = async () => {
      try {
          const res = await axios.get("http://localhost:1337/api/freelancers/list");
          setAvailableFreelancers(res.data.data || []);
      } catch (err) {
          console.error("Error fetching freelancers");
      }
  };

  useEffect(() => {
    if (workspaceId) fetchMembers();
  }, [workspaceId]);

  useEffect(() => {
      if (showAddForm) fetchFreelancers();
  }, [showAddForm]);

  const handleAddMember = async (e) => {
      e.preventDefault();
      if (!newMemberId) return alert("Please select a freelancer first");
      
      try {
          const res = await axios.post("http://localhost:1337/api/workspace/add-member", {
              workspace_id: workspaceId,
              user_id: newMemberId
          });
          if (res.data.success) {
              setNewMemberId("");
              setShowAddForm(false);
              fetchMembers();
          }
      } catch (err) {
          alert(err.response?.data?.message || "Error adding member.");
      }
  };

  return (
    <div className="team-members-canvas" style={{ width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)' }}>Team Directory</h2>
          
          {role === 'founder' && (
              <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  style={{
                      background: showAddForm ? 'var(--gray-800)' : 'var(--gradient-primary)',
                      color: 'white', border: 'none', padding: '10px 20px',
                      borderRadius: 'var(--radius-full)', fontWeight: 600,
                      boxShadow: 'var(--shadow-md)', cursor: 'pointer', transition: 'all 0.3s ease'
                  }}>
                  {showAddForm ? 'Cancel' : '✨ Add Member'}
              </button>
          )}
      </div>

      {showAddForm && role === 'founder' && (
          <form onSubmit={handleAddMember} style={{
              background: 'white', padding: '24px', borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)', marginBottom: '24px', border: '1px solid var(--gray-200)',
              display: 'flex', gap: '15px', alignItems: 'flex-end'
          }}>
              <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '8px', display: 'block' }}>Select Freelancer</label>
                  <select required value={newMemberId} onChange={(e) => setNewMemberId(e.target.value)} style={{
                      width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none', background: 'white', cursor: 'pointer'
                  }}>
                      <option value="">Select a member from the platform...</option>
                      {availableFreelancers.map(f => (
                          <option key={f.user_id} value={f.user_id}>{f.full_name} ({f.email})</option>
                      ))}
                  </select>
              </div>
              <button type="submit" style={{
                  background: 'var(--primary-600)', color: 'white', border: 'none',
                  padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', height: 'fit-content'
              }}>Add to Workspace</button>
          </form>
      )}

      <div style={{ 
          background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: 'var(--radius-xl)', 
          padding: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ margin: 0, width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
            <thead>
              <tr style={{ color: 'var(--gray-500)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ border: 'none', padding: '0 20px', fontWeight: 600 }}>Member Info</th>
                <th style={{ border: 'none', padding: '0 20px', fontWeight: 600 }}>Contact</th>
                <th style={{ border: 'none', padding: '0 20px', fontWeight: 600 }}>System Role</th>
                <th style={{ border: 'none', padding: '0 20px', fontWeight: 600 }}>Joined Workspace</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr><td colSpan="4" className="text-center" style={{ padding: '40px' }}>No members found</td></tr>
              ) : null}
              {members.map(member => (
                <tr key={member.id} style={{ 
                    background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', transition: 'transform 0.2s ease', cursor: 'default'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <td style={{ border: 'none', padding: '16px 20px', borderRadius: '12px 0 0 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{
                              width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                          }}>
                              {member.full_name ? member.full_name.substring(0,2).toUpperCase() : '??'}
                          </div>
                          <div>
                              <div style={{ fontWeight: 600, color: 'var(--gray-800)', fontSize: '1rem' }}>{member.full_name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--success-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-500)' }}></span> Online
                              </div>
                          </div>
                      </div>
                  </td>
                  <td style={{ border: 'none', padding: '16px 20px', verticalAlign: 'middle', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                      {member.email}
                  </td>
                  <td style={{ border: 'none', padding: '16px 20px', verticalAlign: 'middle' }}>
                    <span style={{ 
                        padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                        background: member.role === 'admin' ? 'var(--primary-50)' : 'var(--gray-100)',
                        color: member.role === 'admin' ? 'var(--primary-700)' : 'var(--gray-700)',
                        border: member.role === 'admin' ? '1px solid var(--primary-200)' : '1px solid var(--gray-200)'
                    }}>
                      {member.role === 'admin' ? 'Founder (Admin)' : 'Member'}
                    </span>
                  </td>
                  <td style={{ border: 'none', padding: '16px 20px', borderRadius: '0 12px 12px 0', verticalAlign: 'middle', color: 'var(--gray-500)', fontSize: '0.85rem' }}>
                      {new Date(member.joined_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
