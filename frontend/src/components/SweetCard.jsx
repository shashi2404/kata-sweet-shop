const SweetCard = ({ sweet, onPurchase, onUpdate, onDelete, onRestock, isAdmin }) => {
  const handlePurchase = () => {
    if (sweet.quantity > 0) {
      onPurchase(sweet._id);
    }
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
        {sweet.name}
      </h3>

      <div style={{ marginBottom: '8px' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 8px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {sweet.category}
        </span>
      </div>

      <p style={{ margin: '8px 0', fontSize: '20px', fontWeight: '700', color: '#2c5f2d' }}>
        ${sweet.price}
      </p>

      <p style={{
        margin: '8px 0',
        fontSize: '14px',
        color: sweet.quantity === 0 ? '#dc3545' : '#28a745'
      }}>
        {sweet.quantity === 0 ? 'Out of Stock' : `In Stock: ${sweet.quantity}`}
      </p>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {!isAdmin && (
          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: sweet.quantity === 0 ? '#ccc' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: sweet.quantity === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              flex: 1
            }}
          >
            Purchase
          </button>
        )}

        {isAdmin && (
          <>
            <button
              onClick={() => onUpdate(sweet)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onRestock(sweet)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#17a2b8',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Restock
            </button>
            <button
              onClick={() => onDelete(sweet._id)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
