import { useState, useEffect } from 'react';
import API from '../api/axios';

function UserManager({ onChange }) {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('fafi_users')) || [];
  });

  const [newUser, setNewUser] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    localStorage.setItem('fafi_users', JSON.stringify(users));
    onChange?.(users);
  }, [users]);

  const addUser = async () => {
    if (!newUser.trim()) return;

    try {
      const formData = new FormData();
      formData.append('name', newUser);
      if (newAvatar) {
        formData.append('avatar', newAvatar);
      }

      const res = await API.post('/users/avatar-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newUserObj = res.data.user;
      setUsers(prev => [...prev, newUserObj]);
      setNewUser('');
      setNewAvatar(null);
    } catch (err) {
      console.error('❌ Upload failed:', err.message);
    }
  };

  const removeUser = (idOrName) => {
    if (confirm(`Delete user "${idOrName}"?`)) {
      setUsers(users.filter(u => u._id !== idOrName && u.name !== idOrName));
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>👥 Manage Users</h3>

      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="New user name"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewAvatar(e.target.files[0])}
      />

      <button onClick={addUser}>➕ Add</button>

      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
        {users.map((u) => {
          const isFileAvatar = typeof u.avatar === 'string' && u.avatar.startsWith('uploads/');
          const avatarUrl = isFileAvatar
            ? `http://localhost:5000/${u.avatar.replace(/\\/g, '/')}`
            : null;

          return (
            <li
              key={u._id || u.name}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={u.name}
                  width={32}
                  height={32}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : u.avatar ? (
                <span style={{ fontSize: '1.5rem' }}>{u.avatar}</span>
              ) : (
                <span>👤</span>
              )}
              <span>{u.name}</span>
              <button onClick={() => removeUser(u._id || u.name)}>🗑️</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserManager;
