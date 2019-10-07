import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import './scss/Form.scss'
import {postComment } from '../../store/actions/commentActions';
import {getBlogPostsById, getBlogPosts } from '../../store/actions/postActions';


function CommentFrm({errors, touched}) {
    var d = new Date(); 
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var dateset = month + "-" + day + "-" + year



    return(
        <Form className = "ui form commentform">
            <div className = "field">
                {touched.date && errors.date &&(<p className = "error">{errors.date}</p>)}
                <Field type = "text" className="date" value ={dateset}name = "date" placeholder = "Date" />
            </div>
            <div className = "field">
                {touched.comment && errors.comment &&(<p className = "error">{errors.comment}</p>)}
                <Field component="textarea" className="commentbox  hideboxes" type = "text" name = "comment" placeholder = "Comment" />
            </div>
            <button className = "ui button " type="submit">Submit</button>
            {/* <button className="hidebtn ui button" onClick={e=>{e.preventDefault(); let hiddenbox = document.querySelector('.hideboxes'); let hidebtn = document.querySelector('.hidebtn'); hiddenbox.classList.toggle('hidden');hidebtn.classList.toggle('hidden');  }}>Show Comment</button> */}
        </Form>
    );
};

const Comment = withFormik({
    mapPropsToValues({date, comment}) {
        var d = new Date(); 
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var hour = d.getHours();
        var min = d.getMinutes();
        var second = d.getSeconds(); 
        if (month <= 9 ){
            month = 0+month.toString();
        }
        if (day <= 9 ){
            day = 0+day.toString();
        }
        if (hour <= 9 ){
            hour = 0+hour.toString();
        }
        if (second <= 9 ){
            second = 0+second.toString();
        }
        if (min <= 9 ){
                min = 0+min.toString();
            }
        var dateset = month + "-" + day + "-" + year + " " + hour +":"+ min +":"+ second
        return{
            date: date || dateset,
            comment: comment || ""
        };
    },
    validationSchema: Yup.object().shape({
        date: Yup.string().required("Date is Required"),
        comment: Yup.string().required("Comment is Required"),

    }),

    handleSubmit(values, formikBag) {
        console.log("TCL: handleSubmit -> formikBag", formikBag)
        formikBag.props.postComment(values, formikBag.props.props.post.postid)
        .then(()=> {formikBag.props.getBlogPostsById(formikBag.props.props.post.postid)}).then(()=>{formikBag.resetForm()})
    }
    
      })(CommentFrm);
      


export default connect(null, { postComment, getBlogPostsById })(Comment);