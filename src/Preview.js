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
import SendIcon from '@material-ui/icons/Send'
import {v4 as uuid } from 'uuid'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/appSlice'

function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage,history])

    const closePreview = ()=>{
        dispatch(resetCameraImage())
        // history.replace('/')
    }

    const sendPost = () => {
        const id = uuid();
        const uplodetask = storage.ref(`posts/${id}`).putString(cameraImage,"data_url");
        uplodetask.on('state_changed',null,(error)=>{
            console.log(error);
        },
        ()=>{
            //complte function....
            storage.ref('posts').child(id).getDownloadURL().then((url)=>{
                db.collection('posts').add({
                    imageUrl:url,
                    username:user.username,
                    read:false,
                    profilePic:user.profilePic,
                    timestamp:firebase.default.firestore.FieldValue.serverTimestamp(),
                })
                history.replace('/chats')
            })
        })
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
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send</h2>
                <SendIcon fontSize="small" className="preview__sender"/>
            </div>
        </div>
    )
}

export default Preview
