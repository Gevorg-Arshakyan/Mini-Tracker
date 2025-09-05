const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.virtual('id').get(function () { return this._id.toHexString(); });
taskSchema.set('toJSON', { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; } });

module.exports = mongoose.model('Task', taskSchema);


