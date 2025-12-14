const Sweet = require('../models/sweet'); // 🔥 REQUIRED

exports.purchaseSweet = async (req, res) => {
  try {
    const { sweetId } = req.params;
    const { qty } = req.body; // ✅ MUST be qty

    if (!qty || qty <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < qty) {
      return res.status(409).json({ message: 'Insufficient stock' });
    }

    sweet.quantity -= qty;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    console.error(error); // 🔥 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};
