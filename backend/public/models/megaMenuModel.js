import mongoose from 'mongoose';

const megaMenuSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        uppercase: true // e.g. "ENGAGEMENT RINGS"
    },
    slug: { 
        type: String, 
        required: true 
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    columns: [
        {
            groups: [
                {
                    title: { type: String },
                    type: { 
                        type: String, 
                        enum: ['list', 'icon-list', 'grid-icons', 'colors'],
                        default: 'list'
                    },
                    topLinks: [String],
                    items: [
                        {
                            label: String,
                            icon: String,
                            href: String,
                            color: String // optional for 'colors' type
                        }
                    ],
                    bottomLink: String
                }
            ]
        }
    ],
    promo: {
        title: String,
        text: String,
        code: String,
        linkText: String,
        link: String,
        image: String
    }
}, { timestamps: true });

const MegaMenu = mongoose.model('MegaMenu', megaMenuSchema);
export default MegaMenu;
