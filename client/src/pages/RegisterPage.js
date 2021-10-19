import React, { useContext, useState} from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify"
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import { useHistory } from "react-router";



const RegisterPage =() =>{
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [me,setMe] = useContext(AuthContext);
    const history = useHistory();


    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            if (username.length < 3) throw new Error("이름이 너무 짧아요!");
            if (password.length < 6) throw new Error("비밀번호는 6자리 이상 해주세요!");
            if (password !== passwordCheck) throw new Error("비밀번호가 달라요!");
            const result = await axios.post("/users/register", { name, username, password });
            setMe({ userId: result.data.userId, sessionId: result.data.sessionId, name: result.data.name, });
            toast.success("회원가입 성공");
            history.push("/");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }

    }

    return (
    <div style={{
        marginTop:100,
        maxWidth:350,
        marginLeft:"auto",
        marginRight:"auto",
    }}>
        <h3>회원가입</h3>
        <form onSubmit={submitHandler}>
            <CustomInput label = "이름" value={name} setValue={ setName }/>
            <CustomInput label = "회원ID" value={username} setValue={ setUsername }/>
            <CustomInput label = "비밀번호" value={password} type="password" setValue={ setPassword }/>
            <CustomInput label = "비밀번호확인" value={passwordCheck} type="password" setValue={ setPasswordCheck }/>
            <button type="submit">버튼</button>
        </form>

    </div>
        );
};

export default RegisterPage;

