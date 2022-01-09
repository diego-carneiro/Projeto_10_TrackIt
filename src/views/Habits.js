import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import NewHabit from "../components/NewHabit";
import PostedHabits from "../components/PostedHabits";
import Footer from "../components/Footer";
import { AuthContext } from "../providers/auth";

export default function Habits({ token }) {

    const [isHidden, setIsHidden] = useState(true);
    const [habitInfo, setHabitInfo] = useState("");
    const [postTrigger, setPostTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [showHabits, setShowHabits] = useState(true);
    const [info, setInfo] = useState(null);
    const [id, setId] = useState("");

    const navigate = useNavigate();

    if (postTrigger === true) {
        postHabit();
        setPostTrigger(false);
    }

    if (deleteTrigger === true) {
        deleteHabit();
        setDeleteTrigger(false);
    }

    useEffect(() => {

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        promise.then(response => {
            console.log(response);
            setInfo(response.data); 
            
            if(info !== null){
                setHideText(true)
            }
        });
        promise.catch(error => {
            alert(error);
        });

       

    }, [postTrigger, deleteTrigger]);


    function postHabit() {
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habitInfo,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        promise.then(response => {
            console.log(response);
            navigate("/habitos")
        });
        promise.catch(error => {
            alert("Erro ao salvar novo hábito");
        });
    }

    function deleteHabit() {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

        );
        navigate("/habitos")
    }
    console.log(deleteTrigger, "?");

    return (
        <>
            <Header />
            <Container>
                <TittleSection>
                    <p>Meus hábitos</p>
                    <PlusButton onClick={() => {
                        setIsHidden(false);
                    }}>
                        <p>+</p>
                    </PlusButton>
                </TittleSection>
                <NewHabit isHidden={isHidden} setIsHidden={setIsHidden} setHabitInfo={setHabitInfo} setPostTrigger={setPostTrigger}
                />
                    <PostedHabits token={token} info={info} showHabits={showHabits} setId={setId} setDeleteTrigger={setDeleteTrigger}/>
                <InteractionBox display={hideText}>
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </InteractionBox>
            </Container>
            <Footer />
        </>
    );
}
// ::::::::::Styled-Components::::::::::
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
    padding: 20px 18px 20px 18px;
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 70px;
`
const TittleSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    p{
        font-size: 23px;
        color: #126BA5;
    }
`
const PlusButton = styled.div`
   width: 40px;
   height: 35px;
   background-color: #52B6FF;
   border-radius: 4.63636px;
   display: flex;
   justify-content: center;
   align-items: center;

   p{
       color: #FFFFFF;
   }
`
const InteractionBox = styled.div`
    margin-top: 30px;
    p{
        font-size: 18px;
        color: #666666;
    }
    display: ${props => props.display ? "none" : "inherit"};
`