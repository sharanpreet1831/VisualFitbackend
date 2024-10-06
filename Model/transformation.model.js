const mongoose = require('mongoose');

const transformationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  images: [String],
}, { timestamps: true });

const Transformation = mongoose.model('Transformation', transformationSchema);
module.exports = Transformation;