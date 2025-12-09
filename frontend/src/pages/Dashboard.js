import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchHabits();
  }, [user, navigate]);

  const fetchHabits = async () => {
    try {
      const { data } = await API.get('/habits');
      setHabits(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching habits:', error);
      setLoading(false);
    }
  };

  const handleCreateHabit = async (habitData) => {
    try {
      const { data } = await API.post('/habits', habitData);
      setHabits([data, ...habits]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };

  const handleToggleCompletion = async (habitId, date) => {
    try {
      const { data } = await API.post(`/habits/${habitId}/toggle`, { date });
      setHabits(habits.map(h => h._id === habitId ? data : h));
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await API.delete(`/habits/${habitId}`);
        setHabits(habits.filter(h => h._id !== habitId));
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Habits</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : '+ New Habit'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <HabitForm
              onSubmit={handleCreateHabit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {habits.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">No habits yet!</p>
            <p className="text-gray-500">Click "New Habit" to create your first habit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map(habit => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onToggle={handleToggleCompletion}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;