// const AsyncHandler = () => {}
// const AsyncHandler = (func) => () => {}
// const AsyncHandler = (func) => async() => {}  //this entire code block is the example of ther higher order function of js


const AsyncHandler = (func) => async (req,res,next) => {   //this is an higher order function higher order functions are those ffunctions that takes and return function as an argument 
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
}

export default AsyncHandler;