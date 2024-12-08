import React, { useState } from 'react';
import './GardenPlanner.css';

const GardenPlanner = () => {
  const [plantName, setPlantName] = useState('');
  const [gardenLayout, setGardenLayout] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [gardenSize, setGardenSize] = useState({ width: 10, height: 10 });

  const commonPlants = [
    { 
      name: 'Tomato',
      spacing: '24 inches',
      sunlight: 'Full sun',
      waterNeeds: 'Regular',
      season: 'Summer',
      companions: ['Basil', 'Marigolds', 'Carrots', 'Onions'],
      pests: ['Tomato hornworm', 'Aphids', 'Whiteflies'],
      description: 'Popular garden vegetable, great for salads and cooking.',
      harvestTime: '60-80 days'
    },
    {
      name: 'Strawberry',
      spacing: '12 inches',
      sunlight: 'Full sun',
      waterNeeds: 'Moderate',
      season: 'Spring/Summer',
      companions: ['Lettuce', 'Spinach', 'Thyme'],
      pests: ['Slugs', 'Birds', 'Spider mites'],
      description: 'Sweet perennial fruit, great for borders.',
      harvestTime: '30 days after flowering'
    },
    {
      name: 'Mint',
      spacing: '18 inches',
      sunlight: 'Partial shade',
      waterNeeds: 'Moderate',
      season: 'Spring/Summer',
      companions: ['Cabbage', 'Tomatoes'],
      pests: ['Spider mites', 'Root rot'],
      description: 'Aromatic herb, best grown in containers.',
      harvestTime: 'Continuous'
    },
    {
      name: 'Rosemary',
      spacing: '24 inches',
      sunlight: 'Full sun',
      waterNeeds: 'Low',
      season: 'Year-round',
      companions: ['Sage', 'Thyme', 'Cabbage'],
      pests: ['Spider mites', 'Aphids'],
      description: 'Evergreen herb, drought tolerant.',
      harvestTime: 'Continuous'
    },
    {
      name: 'Sage',
      spacing: '18 inches',
      sunlight: 'Full sun',
      waterNeeds: 'Low',
      season: 'Year-round',
      companions: ['Rosemary', 'Carrots', 'Cabbage'],
      pests: ['Slugs', 'Spider mites'],
      description: 'Aromatic herb with soft leaves.',
      harvestTime: 'Continuous'
    }
  ];

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    setPlantName(plant.name);
  };

  const handleAddToGarden = () => {
    if (selectedPlant) {
      setGardenLayout([...gardenLayout, {
        ...selectedPlant,
        id: Date.now(),
        plantedDate: new Date()
      }]);
      setPlantName('');
      setSelectedPlant(null);
    }
  };

  const handleRemoveFromGarden = (plantId) => {
    setGardenLayout(gardenLayout.filter(plant => plant.id !== plantId));
  };

  return (
    <div className="garden-planner">
      <div className="planner-section">
        <h2>Garden Planning Tool</h2>
        <div className="garden-size-controls">
          <label>
            Garden Width (ft):
            <input
              type="number"
              value={gardenSize.width}
              onChange={(e) => setGardenSize({ ...gardenSize, width: e.target.value })}
            />
          </label>
          <label>
            Garden Height (ft):
            <input
              type="number"
              value={gardenSize.height}
              onChange={(e) => setGardenSize({ ...gardenSize, height: e.target.value })}
            />
          </label>
        </div>
        
        <div className="plant-selector">
          <input
            type="text"
            placeholder="Search for plants..."
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            className="plant-search"
          />
          <div className="plant-suggestions">
            {commonPlants
              .filter(plant => 
                plant.name.toLowerCase().includes(plantName.toLowerCase())
              )
              .map(plant => (
                <div
                  key={plant.name}
                  className="plant-item"
                  onClick={() => handlePlantSelect(plant)}
                >
                  <span className="plant-name">{plant.name}</span>
                  <span className="plant-season">{plant.season}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {selectedPlant && (
        <div className="plant-details">
          <h3>{selectedPlant.name}</h3>
          <div className="plant-info-grid">
            <div className="info-item">
              <label>Spacing:</label>
              <span>{selectedPlant.spacing}</span>
            </div>
            <div className="info-item">
              <label>Sunlight:</label>
              <span>{selectedPlant.sunlight}</span>
            </div>
            <div className="info-item">
              <label>Water Needs:</label>
              <span>{selectedPlant.waterNeeds}</span>
            </div>
            <div className="info-item">
              <label>Season:</label>
              <span>{selectedPlant.season}</span>
            </div>
            <div className="info-item">
              <label>Harvest Time:</label>
              <span>{selectedPlant.harvestTime}</span>
            </div>
          </div>
          <div className="companion-plants">
            <h4>Companion Plants:</h4>
            <ul>
              {selectedPlant.companions.map(companion => (
                <li key={companion}>{companion}</li>
              ))}
            </ul>
          </div>
          <div className="plant-description">
            <h4>Description:</h4>
            <p>{selectedPlant.description}</p>
          </div>
          <div className="plant-pests">
            <h4>Common Pests:</h4>
            <ul>
              {selectedPlant.pests.map(pest => (
                <li key={pest}>{pest}</li>
              ))}
            </ul>
          </div>
          <button onClick={handleAddToGarden} className="add-button">
            Add to Garden
          </button>
        </div>
      )}

      <div className="garden-layout">
        <h3>Your Garden Plants</h3>
        <div className="plants-list">
          {gardenLayout.length === 0 ? (
            <div className="empty-garden">
              <p>Your garden is empty. Start by selecting plants above!</p>
            </div>
          ) : (
            gardenLayout.map((plant) => (
              <div key={plant.id} className="plant-card">
                <div className="plant-info">
                  <span className="plant-name">{plant.name}</span>
                  <span className="plant-details">
                    <span>Spacing: {plant.spacing}</span>
                    <span>Season: {plant.season}</span>
                    <span>Water Needs: {plant.waterNeeds}</span>
                    <span>Sunlight: {plant.sunlight}</span>
                  </span>
                  <span className="planted-date">
                    Added: {plant.plantedDate.toLocaleDateString()}
                  </span>
                </div>
                <button 
                  onClick={() => handleRemoveFromGarden(plant.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GardenPlanner; 