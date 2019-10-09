import React, {useEffect, useState} from 'react'
import UserProfile from '../form/UserProfile'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import Bg from '../Bg'

import {getBlogPostsHome} from '../../store/actions/postActions'
import "./scss/Home.scss"
const Home = (props) => {
    // const [files, setFiles] = useState({});
    const[uploadedFiles, setUploadedFiles] = useState();

    const [selFile, setSelFile] = useState();
    const fileSelHandle = e => {
      setSelFile(e.target.files);
      console.log(e.target.files)
    }
    const fileUploadHandle = (e) => {
      const fd = new FormData();
      for(var x = 0; x<selFile.length; x++) {
        fd.append('blogphoto', selFile[x])
    }
    console.log(selFile)
    //   fd.append('blogphoto', selFile)
      axios.post("http://localhost:8000/api/blogphoto", fd,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }}).then(res => {
        console.log(res)
        setUploadedFiles(res.data.url)

      }).catch(err=>{
        console.log(err)
      })
    }
    console.log("TCL: Home -> props", props)
    useEffect(() => {
        props.getBlogPostsHome()
      },[]);
      const mappedPosts = props.posts && props.posts.content.map(posts => posts)
      console.log("TCL: Home -> mappedPosts", mappedPosts)
      console.log(uploadedFiles)
    return(
        <>
                    <input type="file" name="blogphoto" onChange={fileSelHandle} multiple/>
            <button onClick={fileUploadHandle}>Submit</button>
            {uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles.map(url =>(
                <img src={url} alt={url}/>
            )):(<></>)}
        <div className="home">
        <div className="homeHeader">
            <h1 className="homeHeaderH">Welcome to Erica's Vanity</h1>
        </div>
        <Bg>

<h1>Latest Posts</h1>
{props.posts && props.posts.content.map(posts => (
 
<>
<div className="homeLatest">
    <div className="homeLatestTitle">
<h1>{posts.title}</h1>
<p>{posts.date}</p>
</div>
<p>{posts.body.slice(0,100).concat('...')}</p>
<Link className="homeLink"to={`/blog/${posts.postid}`}>Read Me...</Link>
</div>
</>
))}
</Bg>

</div>

</>
    )
}

const mapStateToProps = (state) => ({
    posts: state.postReducer.posts,
    // console.log(state);
    })
export default connect(mapStateToProps, {getBlogPostsHome})(Home);

