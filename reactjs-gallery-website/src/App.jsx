import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// 1. DATA: Historical event archive
const initialPhotos = [
  {
    id: 1, 
    title: "Apollo 11 Moon Landing", 
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&w=800&q=80",
    description: "Neil Armstrong and Buzz Aldrin become the first humans to land on the Moon, July 20, 1969.", 
    isFavorite: false,
  },
  {
    id: 2, 
    title: "Fall of the Berlin Wall", 
    category: "Politics",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/West_and_East_Germans_at_the_Brandenburg_Gate_in_1989.jpg",
    description: "The demolition of the barrier dividing East and West Berlin in November 1989.", 
    isFavorite: true,
  },
  {
    id: 3, 
    title: "Wright Brothers First Flight", 
    category: "Science",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkg4sZ4qyEcNcMsVIys3oZEUHNJes778okl9Rc92NyA&s=10",
    description: "Orville and Wilbur Wright achieve the first controlled, sustained powered aircraft flight in 1903.", 
    isFavorite: false,
  },
  {
    id: 4, 
    title: "Construction of the Great Pyramids", 
    category: "Culture",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0llZZ5I2kKwKYvqJUWjisou1YZeNX0hKwJY7uih6akQ&s=10",
    description: "Monumental stone masonry constructed as eternal resting places for Egyptian pharaohs.", 
    isFavorite: false,
  },
  {
    id: 5, 
    title: "Invention of the Printing Press", 
    category: "Culture",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Printer_in_1568-ce.png",
    description: "Johannes Gutenberg's movable-type press revolutionizes communication across Europe around 1440.", 
    isFavorite: false,
  },
  {
    id: 6, 
    title: "Signing of the Declaration of Independence", 
    category: "Politics",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    description: "Delegates approve the Declaration of Independence in Philadelphia on July 4, 1776.", 
    isFavorite: false,
  },
  {
    id: 7, 
    title: "Discovery of Penicillin", 
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80",
    description: "Alexander Fleming isolates the mold that led to modern antibiotic medicine in 1928.", 
    isFavorite: true,
  },
  {
    id: 8, 
    title: "First Modern Olympic Games", 
    category: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    description: "Athletes assemble in Athens, Greece, in 1896 for the revival of the ancient games.", 
    isFavorite: false,
  }
];

// 2. SEPARATE USER & ADMIN LOGIN COMPONENT
export const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
  const [userUsername, setUserUsername] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (!userUsername.trim()) return;
    
    // User login: regular permissions
    onLogin({
      username: userUsername.trim(),
      role: 'user'
    });
    navigate('/gallery');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-configured Admin credentials for school / assignment demo
    if (adminUsername.trim().toLowerCase() === 'admin' && adminPassword === 'admin123') {
      onLogin({
        username: adminUsername.trim(),
        role: 'admin'
      });
      navigate('/gallery');
    } else {
      setErrorMessage('Invalid admin credentials! Use demo credentials: admin / admin123');
    }
  };

  const fillDemoAdmin = () => {
    setAdminUsername('admin');
    setAdminPassword('admin123');
    setErrorMessage('');
  };

  const fillDemoUser = () => {
    setUserUsername('StudentUser');
    setErrorMessage('');
  };

  return (
    <div className="center-container">
      <div className="form-card">
        <h2>History Archive Login</h2>
        <p className="login-subtitle">Please select your account type to proceed</p>

        {/* Tab switchers to separate User and Admin */}
        <div className="tab-container">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => { setActiveTab('user'); setErrorMessage(''); }}
          >
            👤 User Login
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin'); setErrorMessage(''); }}
          >
            🛡️ Admin Login
          </button>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        {activeTab === 'user' ? (
          <form onSubmit={handleUserLogin} className="login-form">
            <div className="tab-description">
              <strong>User Access:</strong> Browse gallery, search historical events, download images, and mark favorites.
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <input
                type="text"
                placeholder="Enter Your Name / Username"
                value={userUsername}
                onChange={(e) => setUserUsername(e.target.value)}
                required
              />
              <button type="submit" className="primary-btn">
                Enter as User
              </button>
            </div>

            <div className="demo-credentials-box">
              <span>Quick test: Any username works for user access.</span><br />
              <button type="button" onClick={fillDemoUser} className="demo-fill-btn">
                Fill Demo User
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin} className="login-form">
            <div className="tab-description admin">
              <strong>Admin Access:</strong> Full administrative privileges including uploading new events and deleting entries.
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <input
                type="text"
                placeholder="Admin Username (admin)"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Admin Password (admin123)"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
              <button type="submit" className="primary-btn admin-btn">
                Enter as Administrator
              </button>
            </div>

            <div className="demo-credentials-box">
              <span><strong>Demo Admin Credentials:</strong></span><br />
              <span>Username: <code>admin</code> | Password: <code>admin123</code></span><br />
              <button type="button" onClick={fillDemoAdmin} className="demo-fill-btn">
                Auto-fill Admin Credentials
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// 3. PHOTO CARD COMPONENT
const PhotoCard = ({ photo, currentUser, toggleFavorite, deletePhoto }) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    window.open(photo.imageUrl, '_blank');
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="photo-card">
      <img src={photo.imageUrl} alt={photo.title} loading="lazy" />
      <div className="card-content">
        <h3>{photo.title}</h3>
        <span className="category-tag">{photo.category}</span>
        <p>{photo.description}</p>
        <div className="card-actions">
          <button
            onClick={() => toggleFavorite(photo.id)}
            className={`fav-btn ${photo.isFavorite ? 'favorited' : ''}`}
            title="Add to favorites"
          >
            {photo.isFavorite ? '★ Favorited' : '☆ Favorite'}
          </button>
          <button onClick={handleDownload} className="download-btn" title="Download image">
            ⬇ Download
          </button>
          {/* Only Admins can delete events */}
          {isAdmin && (
            <button
              onClick={() => deletePhoto(photo.id)}
              className="delete-btn"
              title="Admin only: Delete photo"
            >
              ✖ Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. GALLERY COMPONENT
export const Gallery = ({ photos, currentUser, toggleFavorite, deletePhoto }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory =
      filter === 'All'
        ? true
        : filter === 'Favorites'
        ? photo.isFavorite
        : photo.category === filter;

    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-padding">
      <div className="search-box-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search historical events by title or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filters">
        {['All', 'Science', 'Politics', 'Culture', 'Favorites'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="empty-message">No historical events found.</p>
      ) : (
        <div className="photo-grid">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              currentUser={currentUser}
              toggleFavorite={toggleFavorite}
              deletePhoto={deletePhoto}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 5. UPLOAD COMPONENT (Protected: Admin Only)
export const Upload = ({ currentUser, addPhoto }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Science',
    imageUrl: '',
    description: ''
  });
  const navigate = useNavigate();

  // If user is not admin, deny access
  if (currentUser?.role !== 'admin') {
    return (
      <div className="center-container">
        <div className="form-card access-denied-card">
          <h2>🔒 Access Restricted</h2>
          <p>You are currently logged in as a standard <strong>User</strong>. Only an <strong>Admin</strong> can upload new historical archives.</p>
          <button onClick={() => navigate('/gallery')} className="primary-btn">
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.imageUrl) {
      addPhoto(formData);
      navigate('/gallery');
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="form-card upload-card">
        <h2>Upload Historical Event</h2>
        <div className="tab-description admin">
          Logged in as <strong>Admin</strong>: You have permission to publish new historical records to the archive.
        </div>
        <input
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <select name="category" onChange={handleChange} value={formData.category}>
          <option value="Science">Science</option>
          <option value="Politics">Politics</option>
          <option value="Culture">Culture</option>
          <option value="War">War</option>
        </select>
        <input
          name="imageUrl"
          placeholder="Direct Image URL (e.g. https://...)"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description of the event..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        />
        <button type="submit" className="primary-btn admin-btn">
          Publish to Archive
        </button>
      </form>
    </div>
  );
};

// 6. MAIN APP COMPONENT
export default function App() {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('history_archive_photos');
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('history_archive_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('history_archive_photos', JSON.stringify(photos));
  }, [photos]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('history_archive_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('history_archive_user');
  };

  const addPhoto = (newPhoto) => {
    setPhotos([{ ...newPhoto, id: Date.now(), isFavorite: false }, ...photos]);
  };

  const toggleFavorite = (id) => {
    setPhotos(photos.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)));
  };

  const deletePhoto = (id) => {
    setPhotos(photos.filter((p) => p.id !== id));
  };

  return (
    <Router>
      <div className="app-layout">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>📜 History Archive</h2>
          </div>

          <div className="nav-links">
            {currentUser ? (
              <>
                <div className="nav-user-info">
                  {currentUser.role === 'admin' ? (
                    <span className="role-badge admin">🛡️ Admin: {currentUser.username}</span>
                  ) : (
                    <span className="role-badge user">👤 User: {currentUser.username}</span>
                  )}
                </div>

                <Link to="/gallery">Gallery</Link>

                {/* Only display Upload tab for Admin */}
                {currentUser.role === 'admin' && (
                  <Link to="/upload">Upload</Link>
                )}

                <button onClick={handleLogout} className="nav-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/">Login</Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/gallery" replace /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/gallery"
            element={
              <Gallery
                photos={photos}
                currentUser={currentUser}
                toggleFavorite={toggleFavorite}
                deletePhoto={deletePhoto}
              />
            }
          />
          <Route
            path="/upload"
            element={<Upload currentUser={currentUser} addPhoto={addPhoto} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

