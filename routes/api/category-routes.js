const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const data = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const data = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!data) {
      res.status(404).json({ message: 'Category Not found' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
   try {
    const newCategory = req.body;
    const category = await Category.create(newCategory);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
   try {
    const data = await Category.update({
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
    })
    if(!data[0]) {
      res.status(404).json({message: 'ID not Found'})
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
   try{
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
