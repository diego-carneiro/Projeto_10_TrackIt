import React from 'react';
import { ReactDOM } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CurrentDay({ token }){
    
    const dayjs = require("dayjs")
    const [habits, setHabits] = useState([])

    useEffect(() => {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(config)

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then((response) => {
            setHabits([response.data])
            console.log(response.data)
        });
        promise.catch((error) => alert(error))
    }, []);
    
    return(
        <Container>
            <BodyTitle>
                <h1>{dayjs().format('dddd')}, {dayjs().format('DD/MM')}</h1>
                <h2>Nenhum hábito concluído ainda</h2>
                {habits.map((data) =>
                <p>{data.name}</p>
                
                )}
            </BodyTitle>
            <TaskBox>

            </TaskBox>
        </Container>
    );
}
// ::::::::::Styled-Components::::::::::
const Container = styled.div`
    width: 100vw;
    height: 530px;
    margin-top: 70px;
    background-color: #E5E5E5;
    *{
        font-family: 'Lexend Deca', sans-serif;
    } 
    p{
        font-size: 18px;
        color: #666666;
        margin-left: 18px;
    }
`;
const BodyTitle = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 28px;
   h1{
        font-size: 23px;
        color: #126BA5;
        margin-left: 18px;
        margin-top: 28px;
    }
    h2{
        font-size: 18px;
        color: #BABABA;
        margin-left: 18px;
        margin-top: 5px;
    }
`;
const TaskBox = styled.div`
    width: 340px;
    height: 94px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin: 0 auto;
`;