import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/Cameraslice'
import './Preview.css'
import CloseIcon from '@material-ui/icons/Close'
// import { createSvgIcon, TextField } from '@material-ui/core'
import TextField from '@material-ui/icons/TextFields'
import  Create from '@material-ui/icons/Create'
import Note from '@material-ui/icons/Note'
import MusicNote from '@material-ui/icons/MusicNote'
import AttachFile from '@material-ui/icons/AttachFile'
import Crop from '@material-ui/icons/Crop'
import Timer from '@material-ui/icons/Timer'

function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage,history])

    const closePreview = ()=>{
        dispatch(resetCameraImage())
        // history.replace('/')
    }
    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview_close"/>
            <div className="preview_toolbarright">
                <TextField/>
                <Create/>
                <Note/>
                <MusicNote/>
                <AttachFile/>
                <Crop/>
                <Timer/>
            </div>
            <img src={cameraImage} alt="Image"/>
            <div className="preview__footer">
                <h2>Send</h2>
                <SendIcon fontSize="small" className="preview__sender"/>
            </div>
        </div>
    )
}

export default Preview
