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
    imagePath: String,
    imageName: String
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
