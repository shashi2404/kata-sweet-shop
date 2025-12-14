const Sweet = require('../models/sweet');


// CREATE SWEET (ADMIN)
exports.createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    // validation
    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity
    });

    res.status(201).json(sweet);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL SWEETS
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH SWEETS
exports.searchSweets = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (q) {
      filter.name = { $regex: q, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE SWEET (ADMIN)
exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.status(200).json(sweet);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SWEET (ADMIN)
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.status(200).json({ message: 'Sweet deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PURCHASE SWEET
exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ MUST be "id"
    const { qty } = req.body;

    if (!qty || qty <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(id); // ✅ MUST use id

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < qty) {
      return res.status(409).json({ message: 'Insufficient stock' });
    }

    sweet.quantity -= qty;
    await sweet.save();

    return res.status(200).json(sweet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// RESTOCK SWEET (ADMIN)
exports.restockSweet = async (req, res) => {
  try {
    const { qty } = req.body;

    if (!qty || qty <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += qty;
    await sweet.save();

    res.status(200).json({
      message: 'Restock successful',
      sweet
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
