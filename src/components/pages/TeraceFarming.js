import React, { useState } from 'react';
import './TeraceFarming.css';

const TeraceFarming = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [calculatorInputs, setCalculatorInputs] = useState({
    slopeAngle: '',
    fieldLength: '',
    terraceWidth: '',
    soilType: 'medium',
    rainfall: 'moderate'
  });
  const [calculatorResults, setCalculatorResults] = useState(null);

  const terraceTypes = [
    {
      name: "Bench Terraces",
      description: "Flat strips of land created by cutting and filling along contours, suitable for moderate to steep slopes.",
      bestFor: "Row crops, vegetables, and small grains"
    },
    {
      name: "Contour Terraces",
      description: "Earthen ridges and channels constructed across the slope, ideal for gentle slopes.",
      bestFor: "Large-scale farming and erosion control"
    },
    {
      name: "Valley Terraces",
      description: "Built in natural depressions or valleys to capture and utilize runoff water.",
      bestFor: "Water conservation and rice cultivation"
    }
  ];

  const historicalExamples = [
    {
      name: "Machu Picchu",
      location: "Peru",
      description: "Ancient Incan agricultural terraces that sustained their civilization",
      image: '/images/terrace1.jpg'
    },
    {
      name: "Banaue Rice Terraces",
      location: "Philippines",
      description: "UNESCO World Heritage site, known as the 'Eighth Wonder of the World'",
      image: '/images/terrace2.jpg'
    }
  ];

  const soilTypes = {
    sandy: { erosionFactor: 1.2, stabilityFactor: 0.8 },
    medium: { erosionFactor: 1.0, stabilityFactor: 1.0 },
    clay: { erosionFactor: 0.8, stabilityFactor: 1.2 }
  };

  const rainfallIntensity = {
    light: { factor: 0.8, annual: "500-750mm" },
    moderate: { factor: 1.0, annual: "750-1500mm" },
    heavy: { factor: 1.2, annual: ">1500mm" }
  };

  const handleCalculatorInput = (e) => {
    const { name, value } = e.target;
    setCalculatorInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTerraceRequirements = () => {
    const { slopeAngle, fieldLength, terraceWidth, soilType, rainfall } = calculatorInputs;
    
    // Validate inputs
    if (!slopeAngle || !fieldLength || !terraceWidth) {
      alert('Please fill in all required fields');
      return;
    }

    // Convert inputs to numbers
    const slope = parseFloat(slopeAngle);
    const length = parseFloat(fieldLength);
    const width = parseFloat(terraceWidth);

    // Basic calculations
    const verticalInterval = width * Math.tan((slope * Math.PI) / 180);
    const numberOfTerraces = Math.floor(length / width);
    const totalVerticalHeight = verticalInterval * numberOfTerraces;

    // Adjust for soil type and rainfall
    const soilFactor = soilTypes[soilType].erosionFactor;
    const rainfallFactor = rainfallIntensity[rainfall].factor;
    
    // Calculate wall requirements
    const wallHeight = verticalInterval * soilFactor;
    const wallThickness = wallHeight * 0.5 * rainfallFactor;
    
    // Calculate soil movement
    const soilVolume = (length * width * wallHeight) / 2;
    
    // Calculate drainage requirements
    const drainageSpacing = 20 * (1 / rainfallFactor);

    setCalculatorResults({
      numberOfTerraces,
      verticalInterval: verticalInterval.toFixed(2),
      totalVerticalHeight: totalVerticalHeight.toFixed(2),
      wallHeight: wallHeight.toFixed(2),
      wallThickness: wallThickness.toFixed(2),
      soilVolume: soilVolume.toFixed(2),
      drainageSpacing: drainageSpacing.toFixed(2),
      recommendations: {
        wallMaterial: slope > 30 ? "Stone/Concrete" : "Earth with vegetation",
        drainageType: rainfallFactor > 1 ? "Concrete channels" : "Natural swales",
        maintenance: soilFactor > 1 ? "High" : "Moderate"
      }
    });
  };

  return (
    <div className="terrace-farming-container">
      <div className="hero-section" style={{ backgroundImage: `url('/images/terrace3.jpg')` }}>
        <div className="hero-overlay">
          <h1>Terrace Farming Guide</h1>
          <p className="hero-subtitle">Transform slopes into productive agricultural land</p>
        </div>
      </div>

      <div className="navigation-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'types' ? 'active' : ''}`}
          onClick={() => setActiveTab('types')}
        >
          Types
        </button>
        <button 
          className={`tab-button ${activeTab === 'implementation' ? 'active' : ''}`}
          onClick={() => setActiveTab('implementation')}
        >
          Implementation
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <section className="intro-section">
            <h2>What is Terrace Farming?</h2>
            <div className="intro-content">
              <div className="intro-text">
                <p>
                  Terrace farming is an ancient agricultural practice of cutting step-like horizontal surfaces 
                  into hillsides to maximize arable land and prevent soil erosion. This technique has been 
                  used for thousands of years, from the rice terraces of Asia to the Inca terraces of Peru.
                </p>
              </div>
              <div className="intro-image">
                <div className="image-placeholder">
                  <span>🏔️</span>
                  <p>Terrace Farming Illustration</p>
                </div>
              </div>
            </div>
          </section>

          <section className="benefits-section">
            <h2>Benefits of Terrace Farming</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <span className="benefit-icon">🌊</span>
                <h3>Erosion Control</h3>
                <p>Prevents soil erosion on slopes</p>
              </div>
              <div className="benefit-card">
                <span className="benefit-icon">🌱</span>
                <h3>Land Optimization</h3>
                <p>Maximizes land use in hilly areas</p>
              </div>
              <div className="benefit-card">
                <span className="benefit-icon">💧</span>
                <h3>Water Management</h3>
                <p>Improves water retention</p>
              </div>
              <div className="benefit-card">
                <span className="benefit-icon">🌡️</span>
                <h3>Microclimate</h3>
                <p>Creates favorable growing conditions</p>
              </div>
            </div>
          </section>

          <section className="historical-examples">
            <h2>Historical Examples</h2>
            <div className="examples-grid">
              {historicalExamples.map((example, index) => (
                <div key={index} className="example-card">
                  <div className="example-image">
                    <img src={example.image} alt={example.name} />
                  </div>
                  <div className="example-content">
                    <h3>{example.name}</h3>
                    <p className="location">{example.location}</p>
                    <p>{example.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'types' && (
        <section className="terrace-types-section">
          <h2>Types of Terrace Farming</h2>
          <div className="terrace-types-grid">
            {terraceTypes.map((type, index) => (
              <div key={index} className="terrace-type-card">
                <h3>{type.name}</h3>
                <p>{type.description}</p>
                <div className="best-for">
                  <h4>Best For:</h4>
                  <p>{type.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'implementation' && (
        <>
          <section className="construction-showcase">
            <div className="showcase-content">
              <h2>Construction Process</h2>
              <img src="/images/terrace4.jpg" alt="Terrace Construction" className="construction-image" />
              <div className="construction-steps">
                <div className="step-detail">
                  <h3>Step 1: Surveying and Planning</h3>
                  <ul>
                    <li>Topographic survey</li>
                    <li>Soil analysis</li>
                    <li>Water flow assessment</li>
                  </ul>
                </div>
                <div className="step-detail">
                  <h3>Step 2: Layout and Marking</h3>
                  <ul>
                    <li>Contour line marking</li>
                    <li>Terrace width calculation</li>
                    <li>Slope gradient assessment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="implementation-section">
            <h2>How to Implement Terrace Farming</h2>
            <div className="implementation-timeline">
              <div className="timeline-item">
                <div className="timeline-marker">1</div>
                <div className="timeline-content">
                  <h3>Site Assessment</h3>
                  <p>Evaluate slope gradient, soil type, and drainage patterns</p>
                  <ul className="checklist">
                    <li>Measure slope angle</li>
                    <li>Analyze soil composition</li>
                    <li>Study water flow patterns</li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">2</div>
                <div className="timeline-content">
                  <h3>Design Planning</h3>
                  <p>Calculate terrace dimensions and layout</p>
                  <ul className="checklist">
                    <li>Determine terrace width</li>
                    <li>Plan riser heights</li>
                    <li>Design drainage system</li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">3</div>
                <div className="timeline-content">
                  <h3>Construction</h3>
                  <p>Build terraces according to plan</p>
                  <ul className="checklist">
                    <li>Mark contour lines</li>
                    <li>Excavate and level</li>
                    <li>Build retaining walls</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="maintenance-tips">
            <h2>Maintenance Tips</h2>
            <div className="tips-container">
              <div className="tip-card">
                <h3>Regular Inspection</h3>
                <p>Check for erosion signs and wall stability</p>
              </div>
              <div className="tip-card">
                <h3>Drainage Management</h3>
                <p>Keep water channels clear and functional</p>
              </div>
              <div className="tip-card">
                <h3>Soil Care</h3>
                <p>Maintain soil fertility and structure</p>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="terrace-calculator">
        <h2>Terrace Planning Calculator</h2>
        <div className="calculator-container">
          <div className="calculator-inputs">
            <div className="input-group">
              <h3>Basic Measurements</h3>
              <div className="calculator-grid">
                <div className="calculator-input">
                  <label>Slope Angle (degrees)</label>
                  <input 
                    type="number" 
                    name="slopeAngle"
                    value={calculatorInputs.slopeAngle}
                    onChange={handleCalculatorInput}
                    placeholder="Enter slope angle (1-45)"
                    min="1"
                    max="45"
                  />
                </div>
                <div className="calculator-input">
                  <label>Field Length (meters)</label>
                  <input 
                    type="number"
                    name="fieldLength"
                    value={calculatorInputs.fieldLength}
                    onChange={handleCalculatorInput}
                    placeholder="Enter field length"
                    min="1"
                  />
                </div>
                <div className="calculator-input">
                  <label>Desired Terrace Width (meters)</label>
                  <input 
                    type="number"
                    name="terraceWidth"
                    value={calculatorInputs.terraceWidth}
                    onChange={handleCalculatorInput}
                    placeholder="Enter terrace width"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <h3>Site Conditions</h3>
              <div className="calculator-grid">
                <div className="calculator-input">
                  <label>Soil Type</label>
                  <select 
                    name="soilType"
                    value={calculatorInputs.soilType}
                    onChange={handleCalculatorInput}
                  >
                    <option value="sandy">Sandy Soil</option>
                    <option value="medium">Medium Soil</option>
                    <option value="clay">Clay Soil</option>
                  </select>
                </div>
                <div className="calculator-input">
                  <label>Rainfall Intensity</label>
                  <select 
                    name="rainfall"
                    value={calculatorInputs.rainfall}
                    onChange={handleCalculatorInput}
                  >
                    <option value="light">Light ({rainfallIntensity.light.annual})</option>
                    <option value="moderate">Moderate ({rainfallIntensity.moderate.annual})</option>
                    <option value="heavy">Heavy ({rainfallIntensity.heavy.annual})</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              className="calculate-button"
              onClick={calculateTerraceRequirements}
            >
              Calculate Requirements
            </button>
          </div>

          {calculatorResults && (
            <div className="calculator-results">
              <h3>Calculation Results</h3>
              <div className="results-grid">
                <div className="result-card">
                  <h4>Terrace Layout</h4>
                  <ul>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Number of Terraces:</span>
                        <span className="result-value">{calculatorResults.numberOfTerraces}</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Vertical Interval:</span>
                        <span className="result-value">{calculatorResults.verticalInterval} m</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Total Height:</span>
                        <span className="result-value">{calculatorResults.totalVerticalHeight} m</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="result-card">
                  <h4>Construction Requirements</h4>
                  <ul>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Wall Height:</span>
                        <span className="result-value">{calculatorResults.wallHeight} m</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Wall Thickness:</span>
                        <span className="result-value">{calculatorResults.wallThickness} m</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Soil Volume:</span>
                        <span className="result-value">{calculatorResults.soilVolume} m³</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="result-card">
                  <h4>Recommendations</h4>
                  <ul>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Wall Material:</span>
                        <span className="result-value">{calculatorResults.recommendations.wallMaterial}</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Drainage Type:</span>
                        <span className="result-value">{calculatorResults.recommendations.drainageType}</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Maintenance Level:</span>
                        <span className="result-value">{calculatorResults.recommendations.maintenance}</span>
                      </div>
                    </li>
                    <li>
                      <div className="result-item">
                        <span className="result-label">Drainage Spacing:</span>
                        <span className="result-value">{calculatorResults.drainageSpacing} m</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeraceFarming; 