import React, {useContext, useEffect, useRef, useCallback} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ImageContext} from "../context/ImageContext"
import "./ImageList.css"


const ImageList = () =>{
    const {images, isPublic, setIsPublic,imageLoading, imageError, setImageUrl} = useContext(ImageContext);
    const [me] = useContext(AuthContext);
    const elementRef = useRef(null);

    const loaderMoreImages = useCallback(() =>{//usecallback은 1번째 인자로 함수가 들어오는데 이 함수는 2번째 인자의 값이 바뀔때만 호출되고 그렇지 않으면 이전값을 기억해 재사용한다.
        if(imageLoading || images.length === 0) return;
        const lastImageId = images[images.length -1]._id;
        setImageUrl(`${isPublic ? "" : "users/me/"}/images?lastId=${lastImageId}`)
    },[images, imageLoading, isPublic, setImageUrl]);//usecallback의 조건 배열에는 객체,배열보다 string, number, bollean같은 값을 넣어주는 것이 좋다.

    useEffect(()=>{
            if(!elementRef.current) return;
            const observer = new IntersectionObserver(([entry])=>{
                console.log('intersection',entry.isIntersecting);
                if(entry.isIntersecting) loaderMoreImages();
            })
            observer.observe(elementRef.current);
            return ()=> observer.disconnect();
    },[loaderMoreImages]);

    const imgList = images.map((image, index) => (
        <Link key={image.key} to={`/images/${image._id}`} ref={index + 5 === images.length ? elementRef:undefined}>
            <img
                alt=""
                src={`http://localhost:5000/uploads/${image.key}`} />
        </Link>
    ));


    return(
        <div>
            <h3 style={{display:"inline-block", marginRight: 10}}>Image List ({isPublic ? "공개" : "개인"} 사진)</h3>
            {me && <button onClick={()=>setIsPublic(!isPublic)}>{(isPublic ? "개인" : "공개") +"사진보기"}</button>}
            <div className="image-list-container">{imgList}</div>
            {imageError && <div>Error...</div>}
            {imageLoading && <div>Loading...</div>}
        </div>
    );
};

export default ImageList;