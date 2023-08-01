import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'

// protects user routes 

const protectRoutes = expressAsyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoder = jwt.verify(token, process.env.JWT_SECRET);
            // -password from returned user ID
            req.user = await User.findById(decoder.userId).select('-password');
            
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, Invalid Token');

        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, No Token');
    }
});

export { protectRoutes };