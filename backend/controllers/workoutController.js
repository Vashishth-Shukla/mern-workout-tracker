const workoutService = require('../services/workoutServies');

// Get all workouts
const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id;

    try {
        const workouts = await workoutService.getAllWorkouts(user_id);
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get one workout
const getOneWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await workoutService.getOneWorkout(id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const user_id = req.user._id;
        const workout = await workoutService.createWorkout(title, load, reps, user_id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await workoutService.deleteWorkout(id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await workoutService.updateWorkout(id, { ...req.body });
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Export controller functions
module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
