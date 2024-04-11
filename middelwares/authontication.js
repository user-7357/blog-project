const { validateToken } = require("../controllers/authentication");

function checkForAuthontationCookies(cookieName){
    return(req, res, next) => {
        const tokenCookiesValue = req.cookies[cookieName];  // get the cookie from request
        if(!tokenCookiesValue){
            return next();
        }

        try{
            const userPayload = validateToken(tokenCookiesValue);
            req.user = userPayload;
        }catch(error){}
        return next();
    }
} 

module.exports = checkForAuthontationCookies;