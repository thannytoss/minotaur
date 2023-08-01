import AsyncHandler from "express-async-handler";
import Exercise from "../models/exerciseModel";

const createExercise = AsyncHandler(async (req, res) => {
    const { name, repetitions, sets, weight, equipment } = req.body;

    const exerciseExists = await Exercise.findOne({ name });

    if (exerciseExists) {
        res.status(400);
        throw new Error('Exercise already exists');
    }

    const exercise = await Exercise.create({ 
        name, 
        repetitions, 
        sets, 
        weight, 
        equipment 
    });
});