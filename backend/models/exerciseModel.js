import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
        },
    sets: {
        type: Number,
        required: true,
        
        },
    repetitions: {
        type: String,
        required: true
        },
    weight: {
        type: String,
        required: true,

    },
    equipment: {
        type: String,
        required: true
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;