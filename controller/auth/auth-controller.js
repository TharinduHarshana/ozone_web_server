const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


//register controller
const registerUser = async(req, res) => {
    const {userName, email, password} = req.body;
    
    try{

        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success: false,
                message: 'Email already exists please try again with another email'
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password : hashPassword
        })
        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User created successfully'
        });


    }catch(e){
       console.log(e);
       res.status(500).json({
        success: false,
        message: 'Internal server error'
    }); 
    }
}




//login controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist! Please try again with the correct email"
            });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password doesn't match! Please try again with the correct password"
            });
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' });

        res.cookie('token', token, { httpOnly: true, secure: false })
           .json({
               success: true,
               message: 'User logged in successfully',
               user: {
                   id: checkUser._id,
                   email: checkUser.email,
                   role: checkUser.role,
                   userName: checkUser.userName
               }
           });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};



//logout controller

const logoutUser = async (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'User logged out successfully'
    });
};


//auth Middleware 
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized User'
        });
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware
}