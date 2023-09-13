const { ValidateSignature } = require('../../utils');
const { AuthorizeError } = require('../../utils/errors/app-errors');

module.exports = async (req,res,next) => {
    try {
        const isAuthorized = await ValidateSignature(req);
        if(isAuthorized){
            return next();
        }
        throw new AuthorizeError("Route Not Authorize")
    } catch (error) {
        next(error)
    }    
}