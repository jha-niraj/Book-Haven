const express = require("express");
const router = express.Router();

const { User, Book } = require("../database/userModal");
const userMiddleware = require("../middlewares/userMiddleware");

router.post("/addbook", userMiddleware, async (req, res) => {
    const { title, edition, publish_year } = req.body;

    try {
        const userId = req.user;

        const newBook = new Book({
            title,
            edition,
            publish_year,
            addedBy: userId
        })

        // Save the book:
        await newBook.save();

        // Add the book to the user's books array:
        await User.findByIdAndUpdate(userId, {
            $push: {
                books: newBook._id
            }
        })

        res.status(200).json({
            success: true,
            msg: "Book added to the shelf",
            book: newBook
        })
    } catch (err) {
        console.log("Error: " + err);
        return res.json({
            msg: "Error Occurred during addition of Books"
        })
    }
})
router.get("/getbooks", userMiddleware, async (req, res) => {
    const userId = req.user;

    try {
        const user = await User.findOne({
            _id: userId
        })

        if (!user) {
            return res.status(503).json({
                msg: "User not found"
            })
        } else {
            return res.status(200).json({
                books: user.books
            })
        }
    } catch (err) {
        console.log("Error: " + err);
        return res.status(501).json({
            msg: "Error Occurred while fetching books"
        })
    }
})

router.post("/getbookdetails", async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(503).json({
                msg: "Error While Fetching book detial"
            })
        } else {
            return res.status(200).json({
                book
            })
        }
    } catch (err) {
        console.log("Error Occurred in getting Book Detials" + err);
        return res.status(501).json({
            msg: "Error Occurred"
        })
    }
})

router.post("/deleteuserbooks", userMiddleware, async (req, res) => {
    const userId = req.user;
    const { bookId } = req.body;

    try {
        const user = await User.findById(userId);
        if(!user) {
            throw new Error("User not Found");
        } else {
            const bookIndex = user.books.indexOf(bookId);
            if(bookIndex === -1) {
                throw new Error("Book not found in user's books");
            }
            user.books.splice(bookIndex, 1);
            await user.save();
            return res.status(200).json({
                msg: "Book Deleted Successfully"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message });
    }
})

module.exports = router;