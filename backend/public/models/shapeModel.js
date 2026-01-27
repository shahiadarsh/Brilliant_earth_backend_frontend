import mongoose from 'mongoose';

const shapeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String, // URL to shape icon/image
        trim: true
    },
    // Which product types this shape applies to
    applicableTo: {
        type: [String],
        enum: ['ring', 'diamond', 'gemstone', 'jewelry'],
        default: ['ring', 'diamond', 'gemstone', 'jewelry']
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Shape = mongoose.model('Shape', shapeSchema);
export default Shape;
