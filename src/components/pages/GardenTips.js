import React, { useState, useEffect } from 'react';
import './GardenTips.css';
import { gardenTipService } from '../../services/gardenTipService';

const GardenTips = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAddTipModal, setShowAddTipModal] = useState(false);
  const [newTip, setNewTip] = useState({
    title: '',
    description: '',
    category: 'basics',
    icon: '🌱',
    details: ['']
  });
  const [userTips, setUserTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      setIsLoading(true);
      const fetchedTips = await gardenTipService.getAllTips();
      setUserTips(fetchedTips);
    } catch (err) {
      setError('Failed to fetch tips');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const tips = {
    basics: [
      {
        title: "Soil Preparation",
        description: "Always test and amend your soil before planting. Good soil is the foundation of a healthy garden.",
        icon: "🌱",
        details: [
          "Test soil pH levels",
          "Add organic matter",
          "Ensure proper drainage"
        ]
      },
      {
        title: "Watering Wisdom",
        description: "Water deeply but less frequently to encourage deep root growth.",
        icon: "💧",
        details: [
          "Water early morning",
          "Use mulch to retain moisture",
          "Avoid overwatering"
        ]
      }
    ],
    seasonal: [
      {
        title: "Spring Planning",
        description: "Prepare your garden for the growing season ahead.",
        icon: "🌸",
        details: [
          "Clean up winter debris",
          "Start seeds indoors",
          "Plan crop rotation"
        ]
      },
      {
        title: "Summer Care",
        description: "Protect your plants during hot weather.",
        icon: "☀️",
        details: [
          "Mulch to retain moisture",
          "Provide shade if needed",
          "Monitor for pests"
        ]
      }
    ],
    pests: [
      {
        title: "Natural Pest Control",
        description: "Use companion planting and natural remedies for pest management.",
        icon: "🐛",
        details: [
          "Plant marigolds to deter pests",
          "Use neem oil spray",
          "Encourage beneficial insects"
        ]
      },
      {
        title: "Disease Prevention",
        description: "Prevent common plant diseases through good practices.",
        icon: "🍃",
        details: [
          "Ensure good air circulation",
          "Clean tools regularly",
          "Remove infected plants"
        ]
      }
    ],
    composting: [
      {
        title: "Composting Basics",
        description: "Turn kitchen waste into garden gold.",
        icon: "♻️",
        details: [
          "Layer green and brown materials",
          "Keep compost moist",
          "Turn pile regularly"
        ]
      },
      {
        title: "Vermicomposting",
        description: "Use worms to create rich compost.",
        icon: "🪱",
        details: [
          "Choose right worm species",
          "Maintain proper moisture",
          "Feed appropriate scraps"
        ]
      }
    ],
    tools: [
      {
        title: "Essential Tools",
        description: "Must-have tools for successful gardening.",
        icon: "🛠️",
        details: [
          "Quality pruning shears",
          "Durable garden fork",
          "Comfortable gloves"
        ]
      },
      {
        title: "Tool Maintenance",
        description: "Keep your tools in top condition.",
        icon: "🧰",
        details: [
          "Clean after each use",
          "Sharpen regularly",
          "Store properly"
        ]
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Tips', icon: '📚' },
    { id: 'basics', name: 'Basics', icon: '🌱' },
    { id: 'seasonal', name: 'Seasonal', icon: '🌞' },
    { id: 'pests', name: 'Pest Control', icon: '🐛' },
    { id: 'composting', name: 'Composting', icon: '♻️' },
    { id: 'tools', name: 'Tools', icon: '🛠️' }
  ];

  const handleAddDetail = () => {
    setNewTip(prev => ({
      ...prev,
      details: [...prev.details, '']
    }));
  };

  const handleRemoveDetail = (index) => {
    setNewTip(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const handleDetailChange = (index, value) => {
    setNewTip(prev => ({
      ...prev,
      details: prev.details.map((detail, i) => i === index ? value : detail)
    }));
  };

  const handleSubmitTip = async (e) => {
    e.preventDefault();
    try {
      const tip = {
        ...newTip,
        details: newTip.details.filter(detail => detail.trim() !== '')
      };
      
      const savedTip = await gardenTipService.addTip(tip);
      setUserTips(prev => [...prev, savedTip]);
      
      setNewTip({
        title: '',
        description: '',
        category: 'basics',
        icon: '🌱',
        details: ['']
      });
      setShowAddTipModal(false);
    } catch (err) {
      console.error('Failed to add tip:', err);
      alert('Failed to add tip. Please try again.');
    }
  };

  const handleDeleteTip = async (tipId) => {
    if (!window.confirm('Are you sure you want to delete this tip?')) {
      return;
    }

    try {
      await gardenTipService.deleteTip(tipId);
      setUserTips(prev => prev.filter(tip => tip._id !== tipId));
      setSuccessMessage('Tip deleted successfully');
    } catch (err) {
      console.error('Failed to delete tip:', err);
      setError('Failed to delete tip. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const getFilteredTips = () => {
    const allTips = [
      ...Object.entries(tips).flatMap(([category, categoryTips]) => 
        categoryTips.map(tip => ({ ...tip, category }))
      ),
      ...userTips
    ];

    if (activeCategory === 'all') {
      return allTips;
    }
    return allTips.filter(tip => tip.category === activeCategory);
  };

  return (
    <div className="garden-tips-container">
      <div className="tips-header">
        <h1>Garden Tips & Best Practices</h1>
        <p className="tips-subtitle">Expert advice for your gardening success</p>
      </div>

      <div className="tips-actions">
        <div className="categories-nav">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
        <button 
          className="add-tip-button"
          onClick={() => setShowAddTipModal(true)}
        >
          <span>➕</span> Add Tip
        </button>
      </div>

      {isLoading && <div className="loading">Loading tips...</div>}
      {error && <div className="error">{error}</div>}

      <div className="tips-grid">
        {getFilteredTips().map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">{tip.icon}</span>
              <h3>{tip.title}</h3>
              {tip._id && (
                <button 
                  className="delete-tip-button"
                  onClick={() => handleDeleteTip(tip._id)}
                  title="Delete tip"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="tip-description">{tip.description}</p>
            <ul className="tip-details">
              {tip.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showAddTipModal && (
        <div className="modal-overlay">
          <div className="add-tip-modal">
            <h2>Add New Gardening Tip</h2>
            <form onSubmit={handleSubmitTip}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newTip.title}
                  onChange={(e) => setNewTip(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTip.description}
                  onChange={(e) => setNewTip(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTip.category}
                  onChange={(e) => setNewTip(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Details</label>
                {newTip.details.map((detail, index) => (
                  <div key={index} className="detail-input">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleDetailChange(index, e.target.value)}
                      placeholder={`Detail ${index + 1}`}
                    />
                    {newTip.details.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveDetail(index)}
                        className="remove-detail"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={handleAddDetail}
                  className="add-detail"
                >
                  + Add Detail
                </button>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddTipModal(false)}>
                  Cancel
                </button>
                <button type="submit">Add Tip</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default GardenTips; 