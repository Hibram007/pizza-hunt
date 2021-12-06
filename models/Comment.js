const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment_id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true
    },
    writtenBy: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // use ReplySchema to validate data for a reply
  replies: [ReplySchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

// get total count of replies when single pizza funct is called
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);
module.exports = Comment;
