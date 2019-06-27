const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: {
      type: String,
      require: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    images: {
      type: [String]
    },
    rating: Number,

    expiration_date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
