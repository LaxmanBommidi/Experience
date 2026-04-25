import { prisma } from "../config/db.js"


export const getAllPosts = async() => {
    const posts = await prisma.post.findMany({
        orderBy : { createdAt : "desc" },
        include : {
            author : {
                select : {
                    id : true, 
                    email : true,
                    name : true
                }
            }
        }
    });

    return posts;
}

export const createPost = async( title , content , userId ) => {
    const createPost = await prisma.post.create({
        data : {
            title : title,
            content : content,
            authorId : userId
        }
    });

    return createPost;
}

export const getPostById = async( postId ) => {
    const post = await prisma.post.findUnique({
        where : { id : postId },
        include : {
            author : {
                select : {
                    id : true , 
                    email : true,
                    name : true
                }
            }
        }
    });

    return post;
}

export const updatePostById = async( userId, postId , data ) => {
    const post = await prisma.post.findUnique({
        where : { id : postId },
        include : {
            author : true
        }
    });
    console.log("post : ", post);
    if(!post) throw new Error("Blog not found");
    console.log("User id : ", userId) ;
    console.log("Author Id ", post.author.id);
    if(post.author.id !== userId) throw new Error("Unauthorized");

    return prisma.post.update({
        where : { id : postId },
        data : {
            title : data.title , 
            content : data.content
        }
    });
}

export const deletePostById = async( postId , userId ) => {
    const post = await prisma.post.findUnique({
        where : { id : postId },
        include : {
            author : true
        }
    });
    console.log("Post : ",post);
    if(!post) throw new Error("Blog not found ");
    if(post.author.id !== userId) throw new Error("Unauthorized");

    return await prisma.post.delete({
        where : { id : postId }
    });
}