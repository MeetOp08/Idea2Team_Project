import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import '../../styles/workspace.css';

const socket = io("http://localhost:1337");

const ChatBox = ({ workspaceId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/chat/${workspaceId}`);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchMessages();
      
      // Setup WebSockets
      socket.emit("join_workspace", String(workspaceId));
      
      const handleReceive = (msg) => {
          setMessages(prev => [...prev, msg]);
      };

      socket.on("receive_message", handleReceive);

      return () => {
          socket.off("receive_message", handleReceive);
      };
    }
  }, [workspaceId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post('http://localhost:1337/api/chat/send', {
        workspace_id: workspaceId,
        sender_id: userId,
        message: newMessage
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '24px' }}>Team Communications</h2>
      
      <div style={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.7)', 
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.5)', 
          borderRadius: 'var(--radius-xl)', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
          overflow: 'hidden'
      }}>
          <div style={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px' 
          }}>
            {messages.length === 0 ? (
                <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--gray-400)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💬</div>
                    <p>Start the conversation!</p>
                </div>
            ) : null}
            {messages.map((msg, idx) => {
                const isMe = String(msg.sender_id) === String(userId);
                return (
                <div key={idx} style={{ 
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: isMe ? 'row-reverse' : 'row',
                    gap: '12px',
                    alignItems: 'flex-end'
                }}>
                    {!isMe && (
                        <div style={{ 
                            width: '32px', height: '32px', borderRadius: '50%', 
                            background: 'white', color: 'var(--primary-600)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 700, 
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}>
                            {msg.sender_name ? msg.sender_name.substring(0,2).toUpperCase() : '??'}
                        </div>
                    )}
                    <div style={{ 
                        padding: '12px 18px', 
                        borderRadius: isMe ? '20px 20px 0 20px' : '20px 20px 20px 0', 
                        background: isMe ? 'var(--gradient-primary)' : 'white', 
                        color: isMe ? 'white' : 'var(--gray-800)', 
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        border: isMe ? 'none' : '1px solid var(--gray-100)'
                    }}>
                        {!isMe && <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px', color: 'var(--primary-600)' }}>{msg.sender_name}</div>}
                        <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{msg.message}</div>
                        <div style={{ fontSize: '0.65rem', marginTop: '6px', textAlign: 'right', opacity: 0.8 }}>
                            {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                    </div>
                </div>
                )
            })}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.8)' }}>
              <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    style={{
                        flex: 1,
                        padding: '14px 20px',
                        background: 'var(--gray-50)',
                        border: '1px solid var(--gray-200)',
                        borderRadius: 'var(--radius-full)',
                        outline: 'none',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-400)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
                  />
                  <button type="submit" style={{
                      width: '48px', height: '48px',
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      border: 'none',
                      color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
                      transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                  </button>
              </form>
          </div>
      </div>
    </div>
  );
};

export default ChatBox;
