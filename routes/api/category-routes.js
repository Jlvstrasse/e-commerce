const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!result) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

