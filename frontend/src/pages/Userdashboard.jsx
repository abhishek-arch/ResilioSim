import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Clock, 
  Plus, 
  LogOut, 
  User,
  Truck,
  Eye,
  CheckCircle,
  XCircle,
  Bell,
  Navigation,
  Heart,
  Home
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({});
  const [myIncidents, setMyIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [emergencyForm, setEmergencyForm] = useState({
    type: '',
    location: '',
    description: '',
    priority: 'medium'
  });

  // Mock user data - in real app, get from localStorage/context
  const currentUser = { name: 'John Doe', email: 'john@example.com', role: 'user' };

 const token = localStorage.getItem('token')
  const handlelogout = () => {
    
    axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      localStorage.removeItem('token')
     console.log('Logout successful:', response.data);
      navigate('/userlogin')
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
  }

  useEffect(() => {

    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'dashboard':
          setDashboardData({
            alerts: [
              { _id: '1', message: 'Flood Warning - Zone 3', type: 'flood', zone: 'Zone 3', status: 'active', timestamp: new Date() },
              { _id: '2', message: 'Weather Advisory - Strong Winds', type: 'weather', zone: 'Zone 1', status: 'active', timestamp: new Date(Date.now() - 300000) }
            ],
            zones: [
              { id: 1, name: 'Zone 1', status: 'watch' },
              { id: 2, name: 'Zone 2', status: 'safe' },
              { id: 3, name: 'Zone 3', status: 'evacuate' }
            ],
            resources: {
              ambulances: { available: 12, total: 15 },
              fireTrucks: { available: 8, total: 12 },
              rescueTeams: { available: 5, total: 8 },
              shelters: { available: 6, total: 10 }
            },
            activeIncidents: 7,
            recentUpdates: [
              { id: '1', message: 'Fire reported at Downtown Plaza', timestamp: new Date() },
              { id: '2', message: 'Medical emergency resolved at Central Park', timestamp: new Date(Date.now() - 600000) },
              { id: '3', message: 'Rescue team dispatched to Zone 3', timestamp: new Date(Date.now() - 900000) }
            ]
          });
          break;
        case 'incidents':
          setMyIncidents([
            { 
              _id: '1', 
              type: 'Medical Emergency', 
              location: 'Central Park', 
              description: 'Witnessed heart attack, called for help',
              status: 'resolved', 
              priority: 'high',
              timestamp: new Date(Date.now() - 3600000)
            },
            { 
              _id: '2', 
              type: 'Fire', 
              location: 'My Building - 5th Floor', 
              description: 'Smoke detected in hallway',
              status: 'active', 
              priority: 'medium',
              timestamp: new Date(Date.now() - 1800000)
            }
          ]);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleReportEmergency = async () => {
    try {
      // Simulate API call
      console.log('Reporting emergency:', emergencyForm);
      
      // Add to incidents list for demo
      const newIncident = {
        _id: Date.now().toString(),
        ...emergencyForm,
        status: 'active',
        timestamp: new Date()
      };
      setMyIncidents(prev => [newIncident, ...prev]);
      
      setShowEmergencyForm(false);
      setEmergencyForm({ type: '', location: '', description: '', priority: 'medium' });
      setActiveTab('incidents');
    } catch (error) {
      console.error('Error reporting emergency:', error);
    }
  };

  const getZoneStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'watch': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'evacuate': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ResourceCard = ({ title, available, total, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-bold text-gray-900">{available}/{total}</p>
        </div>
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${(available / total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Emergency Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowEmergencyForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
              >
                <Phone className="h-4 w-4 mr-2" />
                Report Emergency
              </button>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{currentUser.name}</span>
              </div>
              <button onClick={handlelogout} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'incidents', label: 'My Reports', icon: AlertTriangle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Emergency Alerts */}
                {dashboardData.alerts?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-red-600" />
                      Active Emergency Alerts
                    </h2>
                    <div className="space-y-3">
                      {dashboardData.alerts.map((alert) => (
                        <div key={alert._id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-red-900">{alert.message}</h3>
                              <div className="flex items-center mt-2 text-sm text-red-700">
                                <MapPin className="h-4 w-4 mr-1" />
                                {alert.zone}
                                <Clock className="h-4 w-4 ml-4 mr-1" />
                                {new Date(alert.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              {alert.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Zone Status */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Navigation className="h-5 w-5 mr-2" />
                    Zone Status
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dashboardData.zones?.map((zone) => (
                      <div key={zone.id} className={`border-2 rounded-lg p-4 ${getZoneStatusColor(zone.status)}`}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{zone.name}</h3>
                          {zone.status === 'safe' && <CheckCircle className="h-5 w-5" />}
                          {zone.status === 'watch' && <Eye className="h-5 w-5" />}
                          {zone.status === 'evacuate' && <XCircle className="h-5 w-5" />}
                        </div>
                        <p className="text-sm mt-1 capitalize font-medium">
                          {zone.status === 'safe' && 'All Clear'}
                          {zone.status === 'watch' && 'Under Watch'}
                          {zone.status === 'evacuate' && 'Evacuation Required'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Resources */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Available Emergency Resources
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ResourceCard
                      title="Ambulances"
                      available={dashboardData.resources?.ambulances?.available || 0}
                      total={dashboardData.resources?.ambulances?.total || 0}
                      icon={Heart}
                    />
                    <ResourceCard
                      title="Fire Trucks"
                      available={dashboardData.resources?.fireTrucks?.available || 0}
                      total={dashboardData.resources?.fireTrucks?.total || 0}
                      icon={Truck}
                    />
                    <ResourceCard
                      title="Rescue Teams"
                      available={dashboardData.resources?.rescueTeams?.available || 0}
                      total={dashboardData.resources?.rescueTeams?.total || 0}
                      icon={Shield}
                    />
                    <ResourceCard
                      title="Shelters"
                      available={dashboardData.resources?.shelters?.available || 0}
                      total={dashboardData.resources?.shelters?.total || 0}
                      icon={Home}
                    />
                  </div>
                </div>

                {/* Recent Updates */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Updates
                  </h2>
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4">
                      <div className="space-y-3">
                        {dashboardData.recentUpdates?.map((update) => (
                          <div key={update.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{update.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(update.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Numbers */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Emergency Contacts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { service: 'Fire Department', number: '101', color: 'bg-red-100 text-red-800' },
                      { service: 'Police', number: '100', color: 'bg-blue-100 text-blue-800' },
                      { service: 'Medical Emergency', number: '108', color: 'bg-green-100 text-green-800' },
                      { service: 'Disaster Control', number: '1077', color: 'bg-purple-100 text-purple-800' }
                    ].map((contact) => (
                      <div key={contact.service} className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-semibold text-gray-900 text-sm">{contact.service}</h3>
                        <div className={`inline-flex px-3 py-1 rounded-full text-lg font-bold mt-2 ${contact.color}`}>
                          {contact.number}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Incidents Tab */}
            {activeTab === 'incidents' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Emergency Reports</h2>
                  <button
                    onClick={() => setShowEmergencyForm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Report Emergency
                  </button>
                </div>
                
                {myIncidents.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents reported</h3>
                    <p className="text-gray-600">You haven't reported any emergencies yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myIncidents.map((incident) => (
                      <div key={incident._id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{incident.type}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {incident.location}
                              <Clock className="h-4 w-4 ml-4 mr-1" />
                              {new Date(incident.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                              {incident.status}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(incident.priority)}`}>
                              {incident.priority} priority
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{incident.description}</p>
                        {incident.status === 'resolved' && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">✓ This incident has been resolved</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Emergency Report Modal */}
        {showEmergencyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <h3 className="text-lg font-semibold mb-4 text-red-900">Report Emergency</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Type</label>
                  <select
                    value={emergencyForm.type}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select emergency type</option>
                    <option value="Fire">Fire</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Accident">Accident</option>
                    <option value="Natural Disaster">Natural Disaster</option>
                    <option value="Security Threat">Security Threat</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Enter exact location or address"
                    value={emergencyForm.location}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, location: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={emergencyForm.priority}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, priority: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Describe the emergency situation..."
                    value={emergencyForm.description}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowEmergencyForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReportEmergency}
                  disabled={!emergencyForm.type || !emergencyForm.location}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Report Emergency
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;