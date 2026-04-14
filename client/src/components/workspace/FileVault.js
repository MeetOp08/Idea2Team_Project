import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/workspace.css';

const FileVault = ({ workspaceId, userId }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/workspace/files/${workspaceId}`);
      if (response.data.success) {
        setFiles(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching workspace files", error);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchFiles();
    }
  }, [workspaceId]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("workspace_id", workspaceId);
    formData.append("uploader_id", userId);

    try {
      await axios.post("http://localhost:1337/api/workspace/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchFiles();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload file. Ensure it's under 50MB and the server is running.");
    } finally {
      setIsUploading(false);
      e.target.value = null; // Reset input
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file? It will be removed for the entire team.")) return;
    try {
      await axios.delete(`http://localhost:1337/api/workspace/file/${fileId}`);
      setFiles(files.filter(f => f.id !== fileId));
    } catch (err) {
      console.error("Error deleting file", err);
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div className="file-vault-canvas" style={{ width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)' }}>Project Vault</h2>
            
            <div style={{ position: 'relative' }}>
                <input 
                    type="file" 
                    id="file-upload" 
                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    onChange={handleFileUpload}
                    disabled={isUploading}
                />
                <button style={{
                    background: 'var(--gradient-primary)',
                    color: 'white', border: 'none', padding: '12px 24px',
                    borderRadius: 'var(--radius-full)', fontWeight: 600,
                    boxShadow: 'var(--shadow-md)', pointerEvents: 'none'
                }}>
                    {isUploading ? 'Uploading...' : '☁️ Upload File'}
                </button>
            </div>
        </div>

        <div style={{ 
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.5)', 
            borderRadius: 'var(--radius-xl)', 
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}>
            
            {files.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--gray-400)' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>📁</div>
                    <h3 style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Vault is empty</h3>
                    <p style={{ fontSize: '0.9rem' }}>Upload documents, assets, or codebase zips here to share with your team.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {files.map(f => (
                        <div key={f.id} style={{
                            background: 'white',
                            padding: '16px',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--gray-200)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            position: 'relative'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ 
                                width: '45px', height: '45px', 
                                background: 'var(--info-50)', color: 'var(--info-600)',
                                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                📄
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <div style={{ fontWeight: 600, color: 'var(--gray-800)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '0.95rem', marginBottom: '4px' }} title={f.file_name}>
                                    {f.file_name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', gap: '10px' }}>
                                    <span>{formatBytes(f.file_size)}</span>
                                    <span>•</span>
                                    <span>by {f.uploader_name}</span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <a href={`http://localhost:1337${f.file_path}`} download target="_blank" rel="noreferrer" style={{ 
                                    width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-100)', color: 'var(--primary-600)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'
                                }} title="Download">
                                    ⬇️
                                </a>
                                {(String(f.uploader_id) === String(userId)) && (
                                    <button onClick={() => handleDelete(f.id)} style={{ 
                                        width: '32px', height: '32px', borderRadius: '50%', background: 'var(--danger-50)', color: 'var(--danger-600)',
                                        border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                    }} title="Delete">
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default FileVault;
