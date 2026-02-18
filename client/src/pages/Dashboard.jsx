import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // In a real app, only admins would see this
                // For this demo, let's try to fetch if we can
                const res = await api.get('/contact');
                if (res.data.success) {
                    setContacts(res.data.data);
                }
            } catch (err) {
                console.log('Error fetching contacts or not authorized');
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back, {user?.name}!</p>
                    </div>
                    <button onClick={logout} className="btn btn-outline btn-sm">Logout</button>
                </div>

                <div className="dashboard-content">
                    <div className="dashboard-card">
                        <h3>Profile Information</h3>
                        <div className="profile-details">
                            <p><strong>Name:</strong> {user?.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Contact Submissions (Admin View)</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : contacts.length > 0 ? (
                            <div className="table-responsive">
                                <table className="contact-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map(contact => (
                                            <tr key={contact._id}>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                                <td>{contact.message.substring(0, 30)}...</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="no-data">No contact submissions found or you don't have permission to view them.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
