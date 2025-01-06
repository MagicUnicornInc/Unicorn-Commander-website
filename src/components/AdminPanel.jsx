import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const AdminPanel = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchWaitlist = async () => {
    try {
      const response = await fetch('/api/admin/waitlist', {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:' + password)
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setWaitlist(data);
        setIsAuthenticated(true);
      } else {
        toast.error('Authentication failed');
      }
    } catch (error) {
      toast.error('Error fetching waitlist');
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch('/api/admin/waitlist.csv', {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:' + password)
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'waitlist.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        toast.error('Error downloading CSV');
      }
    } catch (error) {
      toast.error('Error downloading CSV');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="bg-gray-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <button
            onClick={fetchWaitlist}
            className="w-full btn btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Waitlist</h1>
        <button
          onClick={handleDownloadCSV}
          className="btn btn-primary"
        >
          Download CSV
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-purple-500/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">Beta Tester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">Signed Up</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {waitlist.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{entry.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{entry.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {entry.betaTester ? '✅' : '❌'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(entry.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
