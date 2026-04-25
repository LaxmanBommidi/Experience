
import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId) => {
    const token = jwt.sign( { userId } , process.env.JWT_SECRET , {
        expiresIn : "60m"
    });

    return token ;
}

