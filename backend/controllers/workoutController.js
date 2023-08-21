import AsyncHandler from "express-async-handler";
import Workout from "../models/workoutModel";

const createWorkout = AsyncHandler(async (req, res) => {
    const { name, date, time } = req.body;

    const workoutExists = await Workout.findOne({ name, time });

    if (workoutExists) {
        res.status(400);
        throw new Error(' A workout already exists at this day and time');
    }

    const exercise = await Workout.create({ 
        name, 
        date,
        time,
    });
});

export {
    createWorkout
};