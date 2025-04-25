export default (req, res, next) => {
    try {
        console.log(new Date(Date.now()).toISOString());
        next();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
} 
