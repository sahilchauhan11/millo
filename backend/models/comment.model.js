import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },  
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
