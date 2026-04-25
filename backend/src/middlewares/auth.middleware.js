import jwt from 'jsonwebtoken';

export const authMiddleware = async(req,res,next) => {
    const token = req.headers.authorization ; 
    console.log("Token : ", token);
    if(!token) {
        res.status(401).json({
            error : "Unauthourised access"
        });
    }

    try{
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        console.log("Token verification " , decode);
        next();
    }
    catch( err ) {
        res.status(401).json({ error: "Invalid token" });
    }
}