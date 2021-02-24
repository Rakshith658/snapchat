import React,{useCallback, useRef} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from './features/Cameraslice';
import {useDispatch}from "react-redux"
import { useHistory } from 'react-router-dom';
import './webcamCapture.css'


const videoConstraints = {
    width:250,
    height:400,
    facingMode:"user",
}


function WebcamCapture() {

    const webcamRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()


    // const [image, setimage] = useState(null)
    const capture =useCallback(
        () => {
            const imageScr = webcamRef.current.getScreenshot()
            dispatch(setCameraImage(imageScr))
            history.push("/preview")

            // console.log(imageScr);
            // setimage(imageScr)
        },
        [webcamRef,dispatch,history]
    )
    return (
        <div className="WebcamCapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon
                className='webcamCapture_Button'
                onClick={capture}
                fontSize="large"
            />
            {/* <img src={image} alt=""/> */}
        </div>
    )
}

export default WebcamCapture
