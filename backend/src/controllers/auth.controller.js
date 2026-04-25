import { prisma } from "../config/db.js";
import { loginUser, registerUser } from "../services/auth.service.js";


export const register = async (req , res ) => {
    try {
        const { email , password , name } = req.body;
        const user = await registerUser( email.trim() , password.trim() , name );

        res.status(200).json({
            user : user , 
            message : "user registered.."
        });
    }
    catch ( err )
    {
        res.status(400).json({ error : err.message});
    }
}

export const login = async(req,res) => {
    try {
        console.log("req.body -> " , req.body);
        const { email , password } = req.body;
        const accessToken = await loginUser( email.trim() , password.trim());
        console.log(accessToken);
        res.status(200).json({
            accessToken : accessToken , 
            message : "user logged successfully.. "
        });
    }
    catch( err ){
        res.status(400).json( { error : err.message});
    }
}


export const getUsers = async(req,res) => {
    const users = await prisma.user.findMany({
        select : {
            id : true,
            email : true,
            name : true
        }
    });
    if(!users) {
        throw new Error("No registered users...");
    }

    res.status(200).json(users);
}

export const getUserProfileWithPosts = async( req, res ) => {
    console.log("User Id : " , req.userId);
    const getUserWithPosts = await prisma.user.findUnique({ 
        where : { 
            id : req.userId 
        },
        select : {
            id : true, 
            email : true,
            name : true,
            posts : true
        }
    });

    res.status(200).json(getUserWithPosts);
}


