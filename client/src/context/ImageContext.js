import React, {createContext, useContext, useEffect, useState, useRef} from "react";//useEffect : 부수 효과 처리 hook(외부의 상태를 변경)
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();//자식에게 상속을 편하게 사용하기 위해 사용!

export const ImageProvider = (prop) =>{
    const [images, setImages] = useState([]);
    const [myImages, setMyImages] = useState([]);
    const [isPublic, setIsPublic] = useState(false);
    const [imageUrl, setImageUrl] = useState("/images");
    const [imageLoading, setImageLoading] =useState(false);
    const [imageError, setImageError] = useState(false);
    const [me] = useContext(AuthContext);
    const pastImageUrlRef = useRef();//userdf의 다른 기능은 상태값을 넣어줄수 았는데 useref는 이 값이 바뀌어도 리렌더링 되지 않는다.

    useEffect(() => {
        if(pastImageUrlRef.current === imageUrl) return;
        setImageLoading(true);
        axios
        .get(imageUrl)
        .then((result)=> isPublic ? setImages((prevData)=> [...prevData, ...result.data]) : setMyImages((prevData)=>[...prevData,...result.data]))
        .catch((err) => {
            console.log(err);
            setImageError(err);
        })
        .finally(()=> {
            
            setImageLoading(false)
            pastImageUrlRef.current = imageUrl;
        });
    }, [imageUrl, isPublic]);
    
    useEffect(()=>{
        if(me){
            setTimeout(()=>{
                axios.get("/users/me/images")
                .then((result)=>setMyImages(result.data))
                .catch((err)=> console.error(err));
            },0);
        }else{
            setMyImages([]);
            setIsPublic(true);
        }
    },[me]);

    return (
        <ImageContext.Provider value={{
            images : isPublic ? images:myImages,
            setImages : isPublic ? setImages : setMyImages,
            isPublic,
            setIsPublic,
            setImageUrl,
            imageLoading,
            imageError,
        }}>{prop.children}</ImageContext.Provider>
    );
    
};