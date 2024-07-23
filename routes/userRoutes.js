const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middlewares/userMiddleware.js");
const { User, Book } = require("../database/userModal.js");

// Importing the zod schema from zod:
const {  userSignUpSchema, userSignInSchema, bookSchema } = require("../zod.js");

router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const parsedValue = userSignUpSchema.safeParse({ fullname, email, password });
        if(!parsedValue.success) {
            res.status(511).json({
                msg: "Error while parsing the data!!!"
            })
            return;
        } else {
            // Checking if user already exists in database:
            const existingUser = await User.findOne({ email });
            if(existingUser) {
                res.status(511).json({
                    msg: "User already exists in database"
                })
                return;
            } else {
                // Hashing the password for security reason before sending it to the database:
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await User.create({ 
                    fullname, 
                    email, 
                    password: hashedPassword
                });
                if(!newUser) {
                    res.status(511).json({
                        msg: "User Creation Failed!!"
                    })
                    return;
                } else {
                    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
                    res.cookie("auth_token", token, {
                        maxAge: 24 * 60 * 60 * 100
                    })
                    res.status(200).json({
                        msg: 'User Authentication Successfull',
                        id: newUser._id,
                        fullname: newUser.fullname,
                        email: newUser.email,
                    })
                }
            }
        }
    } catch(err) {
        console.log("Error Occured: " + err);
        res.status(511).json({
            msg: err
        })
    }
})
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const parsedValue = userSignInSchema.safeParse({ email, password });
        if(!parsedValue.success) {
            res.status(511).json({
                msg: "Error while parsing value!!!"
            })
            return;
        } else {
            const user = await User.findOne({ email });
            if(!user) {
                res.status(511).json({
                    msg: "Email not Found!!!"
                })
                return;
            } else {
                const matchedPassword = await bcrypt.compare(password, user.password);
                if(!matchedPassword) {
                    res.status(511).json({
                        msg: "Password is incorrect"
                    })
                    return;
                } else {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    res.cookie("auth_token", token, {
                        maxAge: 24 * 60 * 60 * 1000,  // 24 hours
                        domain: 'book-haven-1-i6ra.onrender.com',
                        path: '/',
                        secure: true,  // Use true if you're using HTTPS
                        sameSite: 'None'
                    })
                    res.status(200).json({
                        msg: 'User Authentication Successfull',
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email
                    })
                }
            }
        }
    } catch(err) {
        console.log("Error: " + err);
        res.status(501).json({
            msg: "Error while signin!!!"
        })
        return;
    }
})
router.get("/searchusers", userMiddleware, async(req, res) => {
    const filter = req.query.search;
    console.log(filter);
    console.log(req.user);

    try {
        const users = await User.find({
            $or: [{
                fullname: {
                    "$regex": filter
                }
            }, {
                email: {
                    "$regex": filter
                }
            }]
        }).find({
            _id: {
                $ne: req.user
            }
        })
        console.log(users);
        res.status(200).json({
            users
        })
    } catch(err) {
        console.log("Error: " + err);
    }
})

router.post("/logout", userMiddleware, (req, res) => {
    res.clearCookie("auth_token");
    res.cookie('auth_token', 'logged_out', {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    return res.status(200).json({
        msg: "Logged out"
    })
})

router.put("/updatepassword", userMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(501).josn({
                msg: "User not found"
            })
        } else {
            const matchedPassword = await bcrypt.compare(oldPassword, user.password);
            if(!matchedPassword) {
                return res.status(501).json({
                    msg: "Old password incorrect!!!"
                })
            } else {
                const updatedPassword = await bcrypt.hash(newPassword, 10);
                if(!updatedPassword) {
                    return res.status(501).json({
                        msg: "Cannot update the password"
                    })
                } else {
                    user.password = updatedPassword;
                    await user.save();

                    return res.status(200).json({
                        msg: "Password updated successfully"
                    })
                }
            }
        }
    } catch(err) {
        console.log("Error: " + err);
        throw new Error("Password updation failed");
    }
})

module.exports = router;