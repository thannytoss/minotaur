import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// Auth User/Sets Token
// POST /api/users/auth
// Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if ( user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
    throw new Error('invalid email or password');   
     }
});

// Reg user/Sets Token
// POST /api/users/auth
// Public
const regUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ 
        name, 
        email, 
        password 
    });

    if ( user ) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
    throw new Error('invalid user data')    }

});

// Logout user
// POST /api/users/logout
// Public
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'User logged out' });
});

// user profile 
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        workouts: req.user.workouts,
        exercises: req.user.exercises
    }
    res.status(200).json({user});
});

// Update User Profile
// PUT /api/users/profile
// Public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.workouts = req.body.workouts || user.workouts;
        user.exercises = req.body.exercises || user.exercises;

        if (req.body.password) {
            user.password = req.body.password;
        }

       const updatedUser = await user.save();
       res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        workouts: updatedUser.workouts,
        exercises: updatedUser.exercises

       });
    } else {
        res.status(404);
        throw new Error ('User not found')
    }
    res.status(200).json({ message: 'Update User Profile'});
});

export {
    authUser,
    regUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};