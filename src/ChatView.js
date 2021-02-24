import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './ChatView.css'
import { selectimage} from './features/appSlice'
import {CountdownCircleTimer}from 'react-countdown-circle-timer'

function ChatView() {
    const selectedImage = useSelector(selectimage)
    const history = useHistory()

    
    const exit =()=>{
        history.replace('/chats')
    }

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage])

    return (
        <div className="ChatView">
            <img src={selectedImage} onClick={exit} alt=""/>
            <div className="ChatView_timer">
                <CountdownCircleTimer
                isPlaying
                duration={10}
                strokeWidth={6}
                size={50}
                colors={[
                    ["#004777",0.33],
                    ["#F7B801",0.33],
                    ["#A30000",0.33],
                ]}
            >
                {({remainingTime})=>{
                    if (remainingTime===0 ) {
                        exit()
                    }
                    return remainingTime
                }}
            </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
