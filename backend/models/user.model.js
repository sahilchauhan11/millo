import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    profilePicture: {
        type: String,
        default: '',
        
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }], 
    bio: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other',
    },
    bookmarks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
    
    
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
