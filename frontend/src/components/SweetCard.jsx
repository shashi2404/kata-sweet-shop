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
// const SweetCard = ({ sweet, onPurchase, onUpdate, onDelete, onRestock, isAdmin }) => {
//   return (
//     <div className="relative bg-white rounded-2xl border border-gray-100 p-6 
//                     shadow-sm hover:shadow-xl transition-all duration-300 
//                     hover:-translate-y-1">

//       {/* CATEGORY BADGE */}
//       <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold 
//                        bg-indigo-50 text-indigo-600 rounded-full">
//         {sweet.category}
//       </span>

//       {/* TITLE */}
//       <h3 className="text-xl font-bold text-gray-800 tracking-wide">
//         {sweet.name}
//       </h3>

//       {/* DIVIDER */}
//       <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full my-3" />

//       {/* PRICE */}
//       <p className="text-3xl font-extrabold text-rose-600">
//         ${sweet.price}
//       </p>

//       {/* STOCK STATUS */}
//       <p
//         className={`mt-2 text-sm font-medium ${
//           sweet.quantity > 0 ? "text-green-600" : "text-red-500"
//         }`}
//       >
//         {sweet.quantity > 0 ? `In Stock: ${sweet.quantity}` : "Out of Stock"}
//       </p>

//       {/* USER ACTION */}
//       {!isAdmin && (
//         <button
//           onClick={() => onPurchase(sweet._id)}
//           disabled={sweet.quantity === 0}
//           className="mt-6 w-full py-2.5 rounded-xl font-semibold text-white
//                      bg-gradient-to-r from-orange-500 to-pink-500
//                      hover:opacity-90 disabled:from-gray-300 disabled:to-gray-300
//                      transition"
//         >
//           Purchase
//         </button>
//       )}

//       {/* ADMIN ACTIONS */}
//       {isAdmin && (
//         <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
//           <button
//             onClick={() => onUpdate(sweet)}
//             className="py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => onRestock(sweet)}
//             className="py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white"
//           >
//             Restock
//           </button>

//           <button
//             onClick={() => onDelete(sweet._id)}
//             className="py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SweetCard;

