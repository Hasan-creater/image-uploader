const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required:true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now

    }
});
    const Image = mongoose.model('Image', imageSchema);
    
    module.exports = Image;
      
