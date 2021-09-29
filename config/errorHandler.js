'use strict';
module.exports = function(app) {
    
    app.use(async (req, res, next) => { // api routes not found in the routes file.
        const error = new Error(`API route doesn't exist.`);
        error.status = 404;
        next(error);
    });

    app.use((err, req, res, next) => { // handle errors globally with next - middleware
        res.status(err.status || 500);
        res.send({
            error: {
                status: err.status || 500,
                message: err.message
            }
        })
    });
}