const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all workouts for a specific user
const getAllWorkouts = async (user_id) => {
    return await Workout.find({ user_id }).sort({ createdAt: -1 });
};

// Get a single workout by ID
const getOneWorkout = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Not valid workout ID');
    }
    const workout = await Workout.findById(id);
    if (!workout) {
        throw new Error('Workout not found!');
    }
    return workout;
};

// Create a new workout
const createWorkout = async (title, load, reps, user_id) => {
    // Add document to db
    return await Workout.create({ title, load, reps, user_id });
};

// Delete a workout by ID
const deleteWorkout = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Not valid workout ID');
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
        throw new Error('Workout not found!');
    }

    return workout;
};

// Update a workout by ID
const updateWorkout = async (id, updatedFields) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Not valid workout ID');
    }

    const workout = await Workout.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!workout) {
        throw new Error('Workout not found!');
    }

    return workout;
};

// Export service functions
module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
