const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workout
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
};

// get one workout
const getOneWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not valid workout ID"})
    }
    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found!'});
    }

    res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = []

    if(!title){

        emptyFields.push('title')
    } 
    if (!load) {

        emptyFields.push('load')
    } 
    if (!reps) {

        emptyFields.push('reps')
    }
    if(emptyFields.length > 0 ) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }


    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    // get id from params
    const { id } = req.params;

    // id validity check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not valid workout ID" })
    }

    // delete workout
    const workout = await Workout.findByIdAndDelete({ _id: id });

    // if not a workout return error
    if (!workout) {
        return res.status(404).json({ error: 'Workout not found!' });
    }

    // success when id is deleted
    res.status(200).json(workout);

}

// update a workout
const updateWorkout = async (req, res) => {
    // Get id from params
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not valid workout ID" });
    }

    // Update the document in the database
    try {
        const workout = await Workout.findByIdAndUpdate(
            id,  // corrected this part to just use id
            {
                ...req.body
            },
            { new: true }  // ensures the updated document is returned
        );

        // If no workout is found
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        // Send the updated workout as a response
        return res.status(200).json(workout);
    } catch (error) {
        // Handle errors
        return res.status(400).json({ error: error.message });
    }
};



// exports of the functions
module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};