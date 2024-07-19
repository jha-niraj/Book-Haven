const zod = require("zod");

const userSignUpSchema = zod.object({
    fullname: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})
const userSignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
const bookSchema = zod.object({
    title: zod.string(),
    edition: zod.number(),
    publish_year: zod.number()
})

module.exports = {
    userSignUpSchema,
    userSignInSchema,
    bookSchema
}