import React, { useState, useEffect } from 'react';

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ full_name: '', email: '' });
  const [error, setError] = useState('');

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/people');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setPeople(data);
    } catch (err) {
      setError('Could not connect to server. Ensure Docker containers are running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/people/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      setPeople(people.filter(p => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (person) => {
    setEditingId(person.id);
    setEditForm({ full_name: person.full_name, email: person.email });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ full_name: '', email: '' });
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/people/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Update failed');
      
      setPeople(people.map(p => p.id === id ? data : p));
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) return <div className="loader">Loading people...</div>;

  return (
    <div className="card list-container glass-effect">
      <h2>Registered People</h2>
      {error && <div className="alert alert-error">{error}</div>}
      
      {people.length === 0 && !error ? (
        <p className="empty-state">No people registered yet.</p>
      ) : (!error &&
        <div className="table-responsive">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => (
                <tr key={person.id}>
                  {editingId === person.id ? (
                    <>
                      <td>
                        <input 
                          type="text" 
                          value={editForm.full_name}
                          onChange={e => setEditForm({...editForm, full_name: e.target.value})}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input 
                          type="email" 
                          value={editForm.email}
                          onChange={e => setEditForm({...editForm, email: e.target.value})}
                          className="edit-input"
                        />
                      </td>
                      <td className="actions-cell">
                        <button onClick={() => saveEdit(person.id)} className="btn btn-success btn-sm">Save</button>
                        <button onClick={cancelEdit} className="btn btn-secondary btn-sm">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{person.full_name}</td>
                      <td>{person.email}</td>
                      <td className="actions-cell">
                        <button onClick={() => startEdit(person)} className="btn btn-primary btn-sm btn-icon" title="Edit">✏️</button>
                        <button onClick={() => handleDelete(person.id)} className="btn btn-danger btn-sm btn-icon" title="Delete">🗑️</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
