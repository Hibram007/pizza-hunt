const router = require('express').Router();
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply
 } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

//PUT route to update comment module: by deleting "pulling"a reply from the comment or removing a comment all together
// /api/comments/<pizzaId>/<commentId>
router
.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

//DELETE route for removeReply
router
.route('/:pizzaID/:commentId/:replyId')
.delete(removeReply);

module.exports = router;
