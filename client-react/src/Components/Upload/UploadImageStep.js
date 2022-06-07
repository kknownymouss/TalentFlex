import React, {useEffect, useState} from "react"
import "../../static/css/Upload/UploadImageStep.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

function UploadImageStep(props) {

    useEffect(() => {
        AOS.init();
      }, []);


    const [formData, setFormData] = useState(null)
    const [done, setDone] = useState(false)


    function handleChange(e) {
        setFormData(e.target.files)
        setDone(true)
    }
    function replicateClick() {
        document.getElementById("file").click()
    }

    function moveOn() {
        props.increaseCounter()
        props.uploadMedia(formData)
    }

    return (
        <>
        {!done ? 
        <div className="choose-file-wrap"  data-aos="fade-down" data-aos-duration="750">
            <form>
                <div className="image-upload-wrap">
                    <img src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582691/TalentFlex_Static/Others/file_upload2_csiyzm.png"} />
                </div>
                <input type="file" accept="video/mp4, video/x-m4v, video/*, image/png, image/jpg, image/jpeg, image/*" id="file" style={{display: 'none'}} onChange={handleChange}/>
            </form>
            <button type="button" class="btn btn-outline-light browse-but light-heavy black" onClick={replicateClick}>Browse Media</button>
        </div> : null}
        {done ?
        <div className="success-upload" data-aos="fade-up" data-aos-duration="750">
            <p className="feed-zero-margin white light-heavy medium-big success-upload-text">File uploaded successfully.</p>
            <img className="success-image" src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582692/TalentFlex_Static/Others/green_check_zu9cdx.png"} />
            <button className="btn btn-success light-heavy medium success-upload-button" onClick={moveOn}>Next</button>
        </div> : null
        }
        </>
    )
}

export default UploadImageStep