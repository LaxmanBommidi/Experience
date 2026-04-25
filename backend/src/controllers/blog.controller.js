import { createPost, deletePostById, getAllPosts, getPostById, updatePostById } from "../services/blog.service.js";


export const getAll = async(req,res) => {
   const posts = await getAllPosts();
   res.status(200).json(posts);
}

export const getOne = async(req,res) => {
    const blogId = req.params.blogId;
    const post = await getPostById(blogId);

    res.status(200).json(post);
}

export const create = async(req,res) => {
    try{
        const { title , content , userId } = req.body;
        const post = await createPost( title, content, userId );
        res.json(post);
    }
    catch( err ){
        res.status(400).json({ error : err.message });
    }
}

export const update = async(req,res) => {
    const blogId = req.params.blogId;
    const updatedPost = await updatePostById(req.userId , blogId , req.body );

    res.status(200).json(updatedPost);
}

export const remove = async(req,res) => {
    const postId = req.params.blogId;
    try{
        await deletePostById( postId, req.userId );
        res.json({ message : "Deleted successfully "});
    }
    catch(err) {
        res.status(403).json({error : err.message})
    }
}