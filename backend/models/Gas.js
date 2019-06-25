const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GasSchema = new Schema(
  {
    razonsocial: {
      type: String,
      required: true
    },
    regular: Number,
    premium: Number,
    dieasel: Number,
    location: {
      type: {
        type: String,
        default: "Point"
      },
      calle: {
        type: String
      },
      coordinates: {
        type: [Number]
      }
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    rating: Number
  },
  { timestamps: true }
);

GasSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Gas", GasSchema);
