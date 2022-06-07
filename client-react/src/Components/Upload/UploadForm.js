import React, {useState} from 'react'
import "../../static/css/Upload/UploadForm.css"
import UploadImageStep from './UploadImageStep'
import UploadInfoStep from './UploadInfoStep'
import UploadReviewStep from './UploadReviewStep'
import UploadSubmitStep from './UploadSubmitStep'
import UploadProgress from './UploadProgress'
import UploadGuidelines from './UploadGuidelines'
import { getServerToken, getUserToken } from '../CommonUtls'

function UploadForm(props) {
    const [stepCounter, setStepCounter]= useState(0)
    const [media, setMedia] = useState("")
    const [caption, setCaption] = useState("")
    const [talent, setTalent] = useState("")

    function uploadCaption(value) {
        setCaption(value)
    }

    function uploadTalent(value) {
        setTalent(value)
    }

    function uploadMedia(file) {
        setMedia(file)
    }

    function increaseCounter() {
        setStepCounter(prevCounter => prevCounter + 1)
    }

    function decreaseCounter() {
        setStepCounter(prevCounter => prevCounter - 1)
    }

    return (
        <div className="upload-form-wrap">
            <div className="upload-form">
                <UploadProgress attr={{stepCounter: stepCounter}}/>
                    {stepCounter === 0 ? <UploadImageStep 
                        increaseCounter={increaseCounter} 
                        uploadMedia={uploadMedia} 
                    /> : null}
                    {stepCounter === 1 ? <UploadInfoStep 
                        increaseCounter={increaseCounter} 
                        decreaseCounter={decreaseCounter}
                        uploadCaption={uploadCaption} 
                        uploadTalent={uploadTalent} 
                        attr={props.attr} 
                    /> : null }
                    {stepCounter === 2 ? <UploadReviewStep
                        attr={{
                            imgSrc: media[0],
                            caption: caption,
                            talent: talent
                        }}
                        increaseCounter={increaseCounter} 
                        decreaseCounter={decreaseCounter}
                    /> : null}
                    {stepCounter === 3 ? <UploadSubmitStep
                        attr={{
                            imgSrc: media[0],
                            caption: caption,
                            talent: talent,
                            user_token: getUserToken(),
                            server_token: getServerToken()
                        }}
                    /> : null}
            </div>
            <div className="upload-guidelines-wrap">
                <UploadGuidelines />
            </div>
        </div>
    )
}

export default UploadForm