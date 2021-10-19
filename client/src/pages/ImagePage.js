import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {ImageContext} from "../context/ImageContext"
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ImagePage = ()=>{
    const history = useHistory();
    const {imageId} = useParams();
    const {images, myImages, setImages, setMyImages} = useContext(ImageContext);
    const [me] = useContext(AuthContext);
    const [hasLiked, setHasLiked] = useState(false);
    const image = images.find((image)=> image._id ===imageId) ||
        myImages.find((image)=>image._id ===imageId);
    useEffect(()=>{
        if(me && image && image.likes.includes(me.userId)) setHasLiked(true);
    },[me, image]);
    
    if (!image) return <h3>Loading</h3>;

    const updateImage = (images, image) => [
        ...images.filter(image => image._id !== imageId), image
    ].sort((a,b)=>new Date(a.creactedAt).getTime() - new Date(b.creactedAt).getTime());
    const onSubmit = async() =>{
        const result = await axios.patch(`/images/${imageId}/${hasLiked ? "unlike" : "like"}`);
        if(result.data.public) setImages(updateImage(images, result.data));
        else setMyImages(updateImage(myImages, result.data));
        setHasLiked(!hasLiked);
    }

    
    const deleteHandler = async() =>{
        try{
           if(!window.confirm("정말 삭제하시겠습니까?")) return;
            const result = await axios.delete(`/images/${imageId}`);
            toast.success(result.data.message);
            setImages(images.filter((image) => image._id !== imageId));
            setMyImages( myImages.filter((image)=>image._id !== imageId))
            history.push("/");
        }catch(err){
            toast.error(err.message);
        }
       
    }
    return(
        <div>
            <h3>Image Page - {imageId}</h3>
            <img style={{width:"100%"}} alt={imageId} src={`http://localhost:5000/uploads/${image.key}`}/>
            <span>좋아용{image.likes.length}</span>
            {me && image.user._id === me.userId &&
                <button style={{float: "right", marginLeft: 10}}
                        onClick={deleteHandler}>삭제</button>}
            <button onClick={onSubmit} style={{float: "right"}}>{hasLiked ? "좋아요 취소" : "좋아요"}</button>
        </div>
    );
};

export default ImagePage;