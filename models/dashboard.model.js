const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["Business", "Tech", "Lifestyle", "Entertainment"],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
        default: 0, // Initialize as 0 likes
    },
    comments: [{
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    }],
});

const dashboardModel = mongoose.model('dashboard', dashboardSchema);

module.exports = {
    dashboardModel
}
