const { Router } = require('express');
const Task = require('../models/Task');

const router = Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 }).lean({ virtuals: true });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, completed } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Field "title" must be a non-empty string' });
  }
  const created = await Task.create({ title: title.trim(), completed: Boolean(completed) });
  res.status(201).json(created.toJSON());
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body || {}, 'title')) {
    if (typeof req.body.title !== 'string' || !req.body.title.trim()) {
      return res.status(400).json({ message: 'Field "title" must be a non-empty string' });
    }
    updates.title = req.body.title.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body || {}, 'completed')) {
    updates.completed = Boolean(req.body.completed);
  }
  const updated = await Task.findByIdAndUpdate(id, updates, { new: true }).lean({ virtuals: true });
  if (!updated) return res.status(404).json({ message: 'Task not found' });
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removed = await Task.findByIdAndDelete(id).lean({ virtuals: true });
  if (!removed) return res.status(404).json({ message: 'Task not found' });
  return res.json(removed);
});

module.exports = router;


