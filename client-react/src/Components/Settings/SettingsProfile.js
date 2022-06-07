import React, { useState, useEffect } from "react"
import "../../static/css/Settings/SettingsProfile.css"
import {getUserToken, getServerToken} from "../CommonUtls"
import { SERVER_URL } from '../CommonUtls'
import {useMediaQuery} from 'react-responsive'

function SettingsProfile() {
    const [displayName, setDisplayName] = useState("")
    const [gender, setGender] = useState("")
    const [about, setAbout] = useState("")
    const [age, setAge] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bannerImage, setBannerImage] = useState("")
    const [formDataProfileImage, setFormDataProfileImage] = useState(null)
    const [formDataBannerImage, setFormDataBannerImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    function handleNameChange(e) {
        setDisplayName(e.target.value)
    }

    function handleGenderChange(e) {
        setGender(e.target.value)
    }

    function handleAboutChange(e) {
        setAbout(e.target.value)
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    function handleAgeChange(e) {
        if (isNumeric(e.target.value) || e.target.value == "") {
            setAge(e.target.value)
        }
    
    }

    function handleProfileImageChange(e) {
        setFormDataProfileImage(e.target.files[0])
    }

    function replicateProfileImageClick() {
        document.getElementById("file-profile-image").click()
    }

    function handleBannerImageChange(e) {
        setFormDataBannerImage(e.target.files[0])
    }
    
    function replicateBannerImageClick() {
        document.getElementById("file-banner-image").click()
    }

    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
    }

    useEffect(() => {
        setLoading(true)
        fetch(`${SERVER_URL}/get_settings_profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {         
            if (res) {
                setGender(res.gender)
                setAge(res.age)
                setDisplayName(res.name)
                setAbout(res.about)
                setProfileImage(res.profile_image)
                setBannerImage(res.banner_image)
                setLoading(false)
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
            }).catch(err => {
            
        })
    }, [])
    function editSettingsProfile() {
        setSaveLoading(true)
        let req_body_edit = {
            ...req_body,
            name: displayName,
            age: age,
            gender: gender,
            about: about,
            imgSrc: formDataProfileImage,
            img2Src: formDataBannerImage
            
        }
        let req_body_edit_form = new FormData()
        for (let i in req_body_edit) {
            req_body_edit_form.append(i, req_body_edit[i])
        }
        fetch(`${SERVER_URL}/edit_settings_profile`, {
        method: "POST",
        body: req_body_edit_form
        }).then(response => response.json()).then(res => {         
            if (res.status == "success") {
                window.location.reload()
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
            }).catch(err => {
            
        })
    }

    return (
        <div className="fade-in" style={{height: isPhone && !isTablet && !isDesktop ? "580px" : "520px"}}>
            {loading ? 
            <div style={{height: "inherit", display: "flex",
            flexDirection: "column", justifyContent: "center",
            alignItems: "center"}}>
                <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </div> :
            <div style={{height: "inherit"}} className="fade-in">
            <div className="settings-profile-banner-div" style={{backgroundImage:!formDataBannerImage ? `url(${bannerImage})` : `url(${window.URL.createObjectURL(formDataBannerImage)})`}}>
            </div>
            <div className = "settings-profile-wrap">
                <div style={{marginBottom: "35px"}} className= "settings-profile-image-section">
                    <img className="settings-profile-image-display" src={!formDataProfileImage ?profileImage : window.URL.createObjectURL(formDataProfileImage)} />
                    <div style={{display: "flex", flexDirection: "row", marginLeft: isPhone && !isTablet && !isDesktop ? "15px" : "30px", marginTop: "100px"}}>
                        <form>
                            <input type="file" accept="image/png, image/jpg, image/jpeg, image/*" id="file-profile-image" style={{display: 'none'}} onChange={handleProfileImageChange}/>
                        </form>
                        <button style={{marginRight: "15px"}} onClick={replicateProfileImageClick} type="button" class="btn btn-edit-profile-banner white light-heavy">
                        {isPhone && !isTablet && !isDesktop ? null : <span className="material-icons md-24 white" style={{marginRight: "5px"}}>mode_edit</span>}
                        {isPhone && !isTablet && !isDesktop ? "Picture" : "Edit Picture"}
                        </button>
                        <form>
                            <input type="file" accept="image/png, image/jpg, image/jpeg, image/*" id="file-banner-image" style={{display: 'none'}} onChange={handleBannerImageChange}/>
                        </form>
                        <button onClick={replicateBannerImageClick} type="button" class="btn btn-edit-profile-banner white light-heavy">
                        {isPhone && !isTablet && !isDesktop ? null : <span className="material-icons md-24 white" style={{marginRight: "5px"}}>mode_edit</span>}
                        { isPhone && !isTablet && !isDesktop ? "Banner": "Edit Banner"}
                        </button>
                    </div>
                </div>
                <div className="settings-profile-info-section">
                    <div className="settings-profile-name-gender-values">
                        <p style={{marginBottom: "5px"}} className="white medium light-heavy feed-zero-margin">Display Name</p>
                        <input style={{marginBottom: "15px"}} onChange={handleNameChange} className="display-name-form light-heavy light-gray small-medium" type="text" value={displayName}></input>
                        <p style={{marginBottom: "5px"}} className="white medium light-heavy feed-zero-margin">Gender</p>
                        <input onChange={handleGenderChange} className="display-name-form light-heavy light-gray small-medium" type="text" value={gender}></input>
                    </div>
                    <div className="settings-profile-about-value light-gray light-heavy">
                        <p style={{marginBottom: "5px"}} className="white medium light-heavy feed-zero-margin">About</p>
                        <input style={{width: isPhone && !isTablet && !isDesktop ? "100%" : "425px", maxWidth: isPhone && !isTablet && !isDesktop ? "100%" :"425px", marginBottom: "15px"}} onChange={handleAboutChange} className="display-name-form light-heavy light-gray small-medium" type="text" value={about}></input>
                        <p style={{marginBottom: "5px"}} className="white medium light-heavy feed-zero-margin">Age</p>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                            <input onChange={handleAgeChange} className="display-name-form light-heavy light-gray small-medium" type="text" value={age}></input>
                            {saveLoading ? 
                            <button style={{minWidth: "60px"}} type="button" class="btn btn-settings-save white light-heavy">
                                <span style={{height: "1.2rem", width: "1.2rem", color: "white"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span class="sr-only"></span>
                            </button> :
                            <button onClick={editSettingsProfile} type="button" class="btn btn-settings-save white light-heavy">Save</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        </div>
    )
}

export default SettingsProfile