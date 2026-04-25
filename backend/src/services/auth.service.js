import { json } from "express"
import { prisma } from "../config/db.js"
import bcrypt from 'bcrypt'
import argon2 from 'argon2';
import { generateAccessToken } from "../utils/jwt.js";


export const registerUser = async( email , password , name ) => {
    const existingUser = await prisma.user.findUnique({ where : { email }});
    if(existingUser) 
        throw new Error("User already exists");

    const passwordHash = await argon2.hash(password);
    const user = await prisma.user.create({ data : { email , passwordHash , name }});

    return user;
}

export const loginUser = async( email , password ) => {
    const user = await prisma.user.findUnique({ where : { email }});
    if(!user) { 
        throw new Error("Invalid credentials.. ");
    }
    const isValid = await argon2.verify(user.passwordHash , password);
    if (!isValid) {
        throw new Error("Invalid Password");
    }
    const accessToken = generateAccessToken(user.id);

    return accessToken;
}