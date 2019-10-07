import React, {useState} from 'react'
import { connect } from "react-redux";
import {doUpdateUser} from '../../store/actions/authActions'
import './scss/UserProfile.scss'
const UserProfilePage = ({userprops, uuid, doUpdateUser}) => {
    console.log("TCL: UserProfilePage -> props", userprops, uuid)
    const [fname, setFname] = useState(userprops.fname);
    const [lname, setLname] = useState(userprops.lname);
    const [email, setEmail] = useState(userprops.email);
    const [avatarurl, setAvatarurl] = useState(userprops.avatarurl);

    function handleSubmit (e) {
        // e.preventDefault()
        // doUpdateUser(userprops.profileid, e.target.value)
    }
    console.log("TCL: UserProfilePage -> fname", fname)
    return(
        <>
        <p>First Name </p>
        <form className="proform">
            <input className="proinput" type="text" name="fname" value={fname} placeholder="First Name" onChange={e => setFname(e.target.value)}/>
            <button onClick={e=>{e.preventDefault();doUpdateUser(userprops.profileid, `{"fname":"${fname}"}`); }}>Update First Name</button>
        </form>
        <p>Last Name</p>
        <form className="proform">
            <input className="proinput" type="text" name="lname" value={lname} placeholder="Last Name" onChange={e => setLname(e.target.value)}/>
            <button onClick={e=>{e.preventDefault();doUpdateUser(userprops.profileid, `{"lname":"${lname}"}`); }}>Update Last Name</button>
        </form>
        <p>Email</p>
        <form className="proform">
            <input className="proinput" type="email" name="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <button onClick={e=>{e.preventDefault();doUpdateUser(userprops.profileid, `{"email":"${email}"}`); }}>Update Email</button>
        </form>
        <p>Photo</p>
        <img src={avatarurl} alt='avatar'/>
        <form className="proform">
            <input className="proinput" type="text" name="avatarurl" value={avatarurl} placeholder="Avatar Url" onChange={e => setAvatarurl(e.target.value)}/>
            <button onClick={e=>{e.preventDefault();doUpdateUser(userprops.profileid, `{"avatarurl":"${avatarurl}"}`); }}>Update Avatar</button>
        </form>
        </>
    )
}

export default connect (null, {doUpdateUser})( UserProfilePage)