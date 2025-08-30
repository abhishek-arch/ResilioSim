const express = require('express');
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const user = require("..models/user.js");

app.use(express.json());

// Mock data
const emergencyData = {
  alerts: [
    { id: 1, type: 'flood', zone: 'Zone 3', status: 'active', message: 'Flood Warning - Zone 3', timestamp: '2025-08-30T09:52:57.144Z' }
  ],
  zones: [
    { id: 1, name: 'Zone 1', status: 'safe' },
    { id: 2, name: 'Zone 2', status: 'watch' },
    { id: 3, name: 'Zone 3', status: 'evacuate' }
  ],
  resources: {
    ambulances: { available: 12, total: 15 },
    fireTrucks: { available: 8, total: 12 },
    rescueTeams: { deployed: 15, total: 20 },
    shelters: { open: 6, total: 10 }
  },
  incidents: [
    { id: 1, type: 'flood', location: 'Main St & 5th Ave', status: 'active', timestamp: '2025-08-30T09:45:00Z' },
    { id: 2, type: 'medical', location: 'Community Center', status: 'resolved', timestamp: '2025-08-30T09:30:00Z' }
  ],
  updates: [
    { id: 1, message: 'Evacuation order issued for Zone 3 residents', timestamp: '2025-08-30T09:45:00Z' },
    { id: 2, message: 'Shelter opened at Community Center', timestamp: '2025-08-30T09:30:00Z' },
    { id: 3, message: 'Road closure: Highway 101 between exits 15-18', timestamp: '2025-08-30T09:15:00Z' }
  ]
};




const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(MONGO_URL);
};




// Home page data endpoint
app.get('/api/dashboard', (req, res) => {
  res.json({
    alerts: emergencyData.alerts.filter(a => a.status === 'active'),
    zones: emergencyData.zones,
    resources: emergencyData.resources,
    activeIncidents: emergencyData.incidents.filter(i => i.status === 'active').length,
    recentUpdates: emergencyData.updates.slice(0, 5)
  });
});

// Report emergency
app.post('/api/emergency', (req, res) => {
  const { type, location, description } = req.body;
  const newIncident = {
    id: emergencyData.incidents.length + 1,
    type,
    location,
    description,
    status: 'active',
    timestamp: new Date().toISOString()
  };
  emergencyData.incidents.push(newIncident);
  res.json({ success: true, incidentId: newIncident.id });
});

// Get zone status
app.get('/api/zones', (req, res) => {
  res.json(emergencyData.zones);
});

// Get resources
app.get('/api/resources', (req, res) => {
  res.json(emergencyData.resources);
});

// Get recent updates
app.get('/api/updates', (req, res) => {
  res.json(emergencyData.updates);
});

app.listen(3000, () => {
  console.log('Disaster Management API running on port 3000');
});

module.exports = app;