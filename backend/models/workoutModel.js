import mongoose from "mongoose";
import Exercise from "./exerciseModel";

const workoutSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    // this is not the correct format, I think, I Will need to add in a function to set date for workout.
    type: Date,
    required: true,
  },
  exercises: {
    type: Array,
  },
  // Need to add in list of exercises
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
