
import React, { useState, useEffect } from "react";
import './SimpleSlider.css';

const SimpleSlider = (props) => {
    const [userIndex, setUserIndex] = useState(0);
    const [userAvatars, setUserAvatars] = useState({});

    const getUserAvatar = async () => {
        const userName = props.users[userIndex];
        if (!(userName in userAvatars)) {
            await fetch ('https://api.github.com/users/' + userName)
                .then (response => {
                    if(response.ok)
                    {
                        return response.json();
                    }
                    throw new Error("Error fetching data");
                })
                .then(response => {
                    const userAvatarsTemp = {...userAvatars};
                    userAvatarsTemp[userName] = response.avatar_url;
                    setUserAvatars(userAvatarsTemp);
                })
                .catch(error => {
                    console.log(error);
                });
        } 
    
    }
    useEffect(() => { getUserAvatar() }, [userIndex] );

    const getPreviousIndex= () => {
        if (userIndex === 0) {
            setUserIndex(props.users.length -1);
        } else {
            setUserIndex(userIndex - 1);
        }
    }

    const getNextIndex = () => {
        if (userIndex == props.users.length -1) {
            setUserIndex(0);
        } else {
            setUserIndex(userIndex + 1);
        }
    }

    return (
        <div>
            
            {!userAvatars[props.users[userIndex]] && 
                <div class="wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <span>Loading...</span>
                </div>
            }
            {userAvatars[props.users[userIndex]] &&
                <div>
                    <button class="button" onClick={getPreviousIndex}>Previous</button> 
                    <img class = "image" src={userAvatars[props.users[userIndex]]}/> 
                    <button class="button" onClick={getNextIndex}>Next</button>
                </div>
            }
            
        </div>


    );
}

export default SimpleSlider;