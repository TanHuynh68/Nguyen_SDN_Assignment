const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perfumeSchema = new Schema(
  {
    perfumeName: { type: String, required: true },
    uri: { type: String, required: true },
    price: { type: Number, required: true },
    concentration: { type: String, required: true }, // Ex: Extrait, EDP, EDT, etc.
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    volume: { type: Number, required: true },
    targetAudience: { type: String, required: true }, // male, female, unisex
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    brand: { type: Schema.Types.ObjectId, ref: 'brand', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('perfume', perfumeSchema);
