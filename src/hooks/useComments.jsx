import { useEffect, useState } from "react";
import GalleryServices from "../services/GalleryServices";

export default function useComments() {
    const [comments, setComments] = useState([]);


    useEffect(() => {
        fetchComments();
    }, []);

    async function fetchComments() {
        try {
            const { data } = await GalleryServices.getComments();
            setComments(data); 
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteComment(id) {
        try {
            await GalleryServices.deleteComment(id);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

   

    

    return { comments,setComments, deleteComment };
}
