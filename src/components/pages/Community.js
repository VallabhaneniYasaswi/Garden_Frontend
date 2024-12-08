import React, { useState } from 'react';
import './Community.css';

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'GreenThumb',
      title: 'Tips for Growing Tomatoes',
      content: 'Here are my best practices for growing tomatoes in containers...',
      category: 'Growing Tips',
      likes: 15,
      comments: [
        { id: 1, author: 'PlantLover', content: 'Great tips! I also recommend pruning regularly.' },
        { id: 2, author: 'GardenGuru', content: 'What soil mix do you use?' }
      ],
      date: '2024-03-15'
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    'All',
    'Growing Tips',
    'Pest Control',
    'Seasonal',
    'Harvesting',
    'Plant Care',
    'Garden Design',
    'Tool Reviews',
    'Success Stories'
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      author: 'CurrentUser',
      ...newPost,
      likes: 0,
      comments: [],
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'General' });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: 'CurrentUser',
            content: comment
          }]
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'popular') return b.likes - a.likes;
      return 0;
    });

  return (
    <div className="community-forum">
      <div className="forum-header">
        <h2>Gardening Community</h2>
        <p>Connect with fellow gardeners and share your experiences</p>
      </div>

      <div className="forum-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="sort-controls">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="create-post">
        <h3>Create New Post</h3>
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <select
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          >
            {categories.filter(cat => cat !== 'All').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <textarea
            placeholder="Share your gardening experience..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="posts-list">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              <span className="post-category">{post.category}</span>
            </div>
            <div className="post-meta">
              <span className="post-author">By {post.author}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)} className="like-button">
                👍 {post.likes}
              </button>
              <button className="comment-button">
                💬 {post.comments.length}
              </button>
            </div>
            <div className="comments-section">
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <span className="comment-author">{comment.author}</span>
                  <p>{comment.content}</p>
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value;
                  if (comment.trim()) {
                    handleComment(post.id, comment);
                    e.target.reset();
                  }
                }}
                className="comment-form"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community; 