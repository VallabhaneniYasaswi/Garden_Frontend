import React from 'react';
import '../../styles/Profile.css';

const Profile = () => {
  // This would typically come from your auth context/state
  const userProfile = {
    username: "GardenLover",
    email: "gardener@example.com",
    joinDate: "March 2024",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    stats: {
      plants: 12,
      posts: 5,
      followers: 24,
      following: 30
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-section">
          <img src={userProfile.avatar} alt="Profile" className="profile-avatar" />
          <button className="edit-avatar-btn">
            <i className="fas fa-camera"></i>
          </button>
        </div>
        
        <div className="profile-info">
          <h1>{userProfile.username}</h1>
          <p className="join-date">Member since {userProfile.joinDate}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userProfile.stats.plants}</span>
              <span className="stat-label">Plants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userProfile.stats.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userProfile.stats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userProfile.stats.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>My Garden</h2>
          <div className="garden-grid">
            <div className="add-plant-card">
              <i className="fas fa-plus"></i>
              <span>Add New Plant</span>
            </div>
            {/* Plant cards would be mapped here */}
          </div>
        </div>

        <div className="profile-section">
          <h2>Account Settings</h2>
          <form className="settings-form">
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={userProfile.username} readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={userProfile.email} readOnly />
            </div>
            <button type="button" className="edit-profile-btn">
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 