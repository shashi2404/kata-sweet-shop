import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sweetsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import SweetCard from '../components/SweetCard';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetsAPI.getAll();
      setSweets(response.data);
    } catch (error) {
      setMessage('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.q = searchQuery;
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await sweetsAPI.search(params);
      setSweets(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await sweetsAPI.purchase(id, 1);
      setMessage('Purchase successful!');
      fetchSweets();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Purchase failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchSweets();
  }, []);
  const inputStyle = {
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  fontSize: '14px',
  outline: 'none',
};

const primaryBtn = {
  padding: '12px 28px',
  backgroundColor: '#ec4899',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const secondaryBtn = {
  padding: '12px 28px',
  backgroundColor: '#f3f4f6',
  color: '#374151',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};


  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <nav style={{
        backgroundColor: '#fff',
        padding: '16px 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Sweet Shop</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Admin Panel
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </nav>
{/* HERO SECTION */}
<div
  style={{
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '70px 20px',
    textAlign: 'center',
  }}
>
  <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1f2937' }}>
    Discover Delicious Sweets
  </h1>

  <p style={{ fontSize: '17px', color: '#4b5563', maxWidth: '680px', margin: '0 auto' }}>
    Browse our collection of handcrafted sweets and treats
  </p>
</div>





      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {message && (
          <div style={{
            padding: '12px',
            backgroundColor: message.includes('failed') || message.includes('Failed') ? '#f8d7da' : '#d4edda',
            color: message.includes('failed') || message.includes('Failed') ? '#721c24' : '#155724',
            borderRadius: '4px',
            marginBottom: '16px'
          }}>
            {message}
          </div>
        )}

        {/* SEARCH & FILTER */}
<div
  style={{
    backgroundColor: '#ffffff',
    padding: '26px',
    borderRadius: '16px',
    marginBottom: '32px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
  }}
>
  <h2
    style={{
      marginBottom: '20px',
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937',
    }}
  >
    🔍 Search & Filter Sweets
  </h2>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '14px',
      marginBottom: '18px',
    }}
  >
    <input
      type="text"
      placeholder="Search sweets..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={inputStyle}
    />

    <input
      type="text"
      placeholder="Category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      style={inputStyle}
    />

    <input
      type="number"
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      style={inputStyle}
    />

    <input
      type="number"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      style={inputStyle}
    />
  </div>

  <div style={{ display: 'flex', gap: '12px' }}>
    <button style={primaryBtn} onClick={handleSearch}>
      Search
    </button>

    <button
      style={secondaryBtn}
      onClick={() => {
        setSearchQuery('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        fetchSweets();
      }}
    >
      Clear
    </button>
  </div>
</div>


        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading sweets...
          </div>
        ) : sweets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No sweets found
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
