import asyncHandler from "express-async-handler";
import Exercise from "../models/exerciseModel.js";

// create new exercise
//Post /api/user/profile/exercises
//private?
const createExercise = asyncHandler(async (req, res) => {
  const { name, repetitions, sets, weight, equipment } = req.body;

  const exerciseExists = await Exercise.findOne({ name });

  if (exerciseExists) {
    res.status(400);
    throw new Error("Exercise already exists");
  }

  const exercise = await Exercise.create({
    name,
    repetitions,
    sets,
    weight,
    equipment,
  });
});

// update exercise
// Put /api/user/profile/exercises
const updateUserExercises = asyncHandler(async (req, res) => {
  const exercise = await User.findById(req.user.exercise.name);

  if (exercise) {
    exercise.name = req.body.name || exercise.name;
    exercise.repetitions = req.body.repetitions || exercise.repetitions;
    exercise.sets = req.body.sets || exercise.sets;
    exercise.weight = req.body.weight || exercise.weight;
    exercise.equipment = req.body.equipment || exercise.equipment;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedExercise = await user.exercises.save();
    res.status(200).json({
      name: updatedExercise.name,
      repetitions: updatedExercise.repetitions,
      sets: updatedExercise.sets,
      weight: updatedExercise.weight,
      equipment: updatedExercise.equipment,
    });
  } else {
    res.status(404);
    throw new Error("Exercise not found");
  }
  res.status(200).json({ message: "Updated User Exercise" });
});

export { createExercise, updateUserExercises };
