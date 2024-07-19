import { AnimatePresence, motion } from "framer-motion";

function PageAnimation({children, keyValue, initial = {opacity : 0}, animate = {opacity : 1}, transition = {duration : 1}, className }) {
    // For the animation part we are goint to use the library called as Framer Motion.
    return (
        <motion.div 
            key = {keyValue}
            initial = {initial}
            animate = {animate}
            transition = {transition}
            className = {className}
        >
            {children}
        </motion.div>
    )
}

export default PageAnimation;