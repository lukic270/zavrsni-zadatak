import { useEffect, useState } from "react";
import GalleryServices from "../services/GalleryServices";
import { useNavigate } from "react-router-dom";
import useComments from "./useComments";

export default function useGallery(id,page){

    const[gallery,setGallery] = useState({});
     const navigate = useNavigate();




    useEffect(()=>{
        fetchGallery()
    }, [id]);


    

    async function fetchGallery(){
        try {
            const data = await GalleryServices.getSingleGallery(id);

            if(data) setGallery(data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const deleteGallery = async () => {
        try {
            await GalleryServices.DeleteGallery(id);
            fetchGallery();

            navigate('/galleries')
        } catch (error) {
            console.log(error);
        }
    }

  

    return {gallery, setGallery, deleteGallery};
}
