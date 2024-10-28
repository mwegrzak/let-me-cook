import mongoose from "mongoose";

const receipeSchema = mongoose.Schema(
    {
        name: {
            type: String, required: true,
        },
        author: {
            type: String, required: false,
        },
        ingredients: {
            type: String, required: false,
        },
        description: {
            type: String, required: false,
        },
        directions: {
            type: String, required: false,
        },
        difficulty: {
            type: String, required: false,
        },
        time: {
            type: String, required: false,
        },
        servings: {
            type: String, required: false,
        },
        tags: {
            type: String, required: false,
        },
        image: {
            data: Buffer, ContentType: String
            
        },
        score: {
            type: Number, required: false
        },
        visibility: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

export const Receipe = mongoose.model('Receipe', receipeSchema);