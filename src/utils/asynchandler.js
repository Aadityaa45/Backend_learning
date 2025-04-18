// const AsyncHandler = () => {}
// const AsyncHandler = (func) => () => {}
// const AsyncHandler = (func) => async() => {}  //this entire code block is the example of ther higher order function of js


const AsyncHandler = (func) => async (req,res,next) => {
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message:err.message
        })
    }
}

export default AsyncHandler;