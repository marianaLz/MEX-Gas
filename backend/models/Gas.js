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
    ]
  },
  { timestamps: true }
);

GasSchema.statics.getTop = function() {
  return this.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "gas",
        as: "comments"
      }
    },
    { $match: { "comments.1": { $exists: true } } },
    { $addFields: { averageRating: { $avg: "$comments.rating" } } },
    { $sort: { averageRating: -1 } },
    { $limit: 3 }
  ]);
};

function autopopulate(next) {
  this.populate("comments");
  next();
}

GasSchema.pre("find", autopopulate);
GasSchema.pre("findOne", autopopulate);

GasSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Gas", GasSchema);
