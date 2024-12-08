import React from 'react';
import '../styles/Community.css';

const defaultPosts = [
  {
    id: 1,
    title: "My Urban Garden Journey",
    description: "Started with just a few herbs on my windowsill, now I have a thriving balcony garden! Here's what I learned along the way...",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    author: "Sarah Chen",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2 days ago",
    likes: 124,
    comments: 18,
    tags: ["Urban Gardening", "Beginners"]
  },
  {
    id: 2,
    title: "Sustainable Composting Tips",
    description: "Transform your kitchen waste into black gold for your garden. Here's my complete guide to composting in small spaces.",
    image: "https://images.unsplash.com/photo-1621693247912-ca46c9ab0aba",
    author: "Mike Peterson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "1 week ago",
    likes: 89,
    comments: 24,
    tags: ["Composting", "Sustainability"]
  },
  {
    id: 3,
    title: "Growing Tomatoes: A Complete Guide",
    description: "Everything you need to know about growing the perfect tomatoes, from seed selection to harvest.",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
    author: "Emma Watson",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    date: "3 days ago",
    likes: 156,
    comments: 32,
    tags: ["Vegetables", "Growing Guide"]
  },
  {
    id: 4,
    title: "Creating a Butterfly Garden",
    description: "Attract beautiful pollinators to your garden with these butterfly-friendly plants and design tips.",
    image: "https://images.unsplash.com/photo-1534710961216-75c88202f43e",
    author: "David Martinez",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    date: "5 days ago",
    likes: 203,
    comments: 45,
    tags: ["Pollinators", "Garden Design"]
  },
  {
    id: 5,
    title: "Winter Garden Preparation",
    description: "Get your garden ready for the cold months with these essential winter preparation tips.",
    image: "https://images.unsplash.com/photo-1511048794887-3d3a54246bb0",
    author: "Lisa Johnson",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    date: "1 day ago",
    likes: 167,
    comments: 29,
    tags: ["Seasonal", "Maintenance"]
  }
];

const Community = () => {
  return (
    <div className="community-container">
      <div className="community-header">
        <h1>Garden Community</h1>
        <p>Share experiences, ask questions, and connect with fellow gardeners</p>
      </div>
      
      <div className="posts-grid">
        {defaultPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p className="post-description">{post.description}</p>
              <div className="post-meta">
                <div className="post-author">
                  <img src={post.avatar} alt={post.author} className="author-avatar" />
                  <span>{post.author}</span>
                </div>
                <div className="post-stats">
                  <span className="stat-item">
                    <i className="far fa-heart"></i> {post.likes}
                  </span>
                  <span className="stat-item">
                    <i className="far fa-comment"></i> {post.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community; 