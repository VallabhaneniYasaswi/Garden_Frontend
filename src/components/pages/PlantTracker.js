import React, { useState } from 'react';
import './PlantTracker.css';

function PlantTracker() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: '',
    plantedDate: '',
    height: '',
    notes: ''
  });

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (newPlant.name && newPlant.plantedDate) {
      setPlants([...plants, { ...newPlant, id: Date.now(), logs: [] }]);
      setNewPlant({ name: '', plantedDate: '', height: '', notes: '' });
    }
  };

  const handleAddLog = (plantId, log) => {
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        return {
          ...plant,
          logs: [...plant.logs, { ...log, date: new Date().toISOString(), id: Date.now() }]
        };
      }
      return plant;
    }));
  };

  return (
    <div className="plant-tracker">
      <h2>Plant Growth Tracker</h2>
      
      <div className="add-plant-form">
        <h3>Add New Plant</h3>
        <form onSubmit={handleAddPlant}>
          <div className="form-group">
            <label>Plant Name:</label>
            <input
              type="text"
              value={newPlant.name}
              onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
              placeholder="Enter plant name"
            />
          </div>
          <div className="form-group">
            <label>Planting Date:</label>
            <input
              type="date"
              value={newPlant.plantedDate}
              onChange={(e) => setNewPlant({ ...newPlant, plantedDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Initial Height (cm):</label>
            <input
              type="number"
              value={newPlant.height}
              onChange={(e) => setNewPlant({ ...newPlant, height: e.target.value })}
              placeholder="Enter height"
            />
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              value={newPlant.notes}
              onChange={(e) => setNewPlant({ ...newPlant, notes: e.target.value })}
              placeholder="Add any notes about your plant"
            />
          </div>
          <button type="submit" className="submit-button">Add Plant</button>
        </form>
      </div>

      <div className="plants-list">
        {plants.length === 0 ? (
          <div className="empty-message">
            <p>No plants added yet. Start by adding a plant above!</p>
          </div>
        ) : (
          plants.map(plant => (
            <div key={plant.id} className="plant-card">
              <div className="plant-header">
                <h4>{plant.name}</h4>
                <span className="planted-date">
                  Planted: {new Date(plant.plantedDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="plant-logs">
                <h5>Growth Logs</h5>
                {plant.logs.map(log => (
                  <div key={log.id} className="log-entry">
                    <span>{new Date(log.date).toLocaleDateString()}</span>
                    <span>Height: {log.height}cm</span>
                    <p>{log.notes}</p>
                  </div>
                ))}
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleAddLog(plant.id, {
                    height: formData.get('height'),
                    notes: formData.get('notes')
                  });
                  e.target.reset();
                }} className="add-log-form">
                  <input type="number" name="height" placeholder="Current height (cm)" required />
                  <input type="text" name="notes" placeholder="Observations" />
                  <button type="submit">Add Log</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlantTracker; 