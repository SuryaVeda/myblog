import React from 'react';
import '../../index.css'
import comment_img from '../../../public/static/images/comment.png';
import share_img from '../../../public/static/images/share.png';
import FormCreator from '../forms/formcreator';
export default function create_comment_section (comment_details, i, comment_id, user, parent)  {
    let reply_form = (id, c_pk=null, p_pk=null) => {
        return({
          component: parent.comp,
          fk_pk:c_pk,
          post_pk:p_pk,
          form_url : parent.loc.reply_url,
          data : parent.data,
          formMethod: 'POST',
          redirect_url:parent.loc.url,

          fields : [
              {
              name : 'reply_field',
              type : 'text',
              placeholder : 'Reply to comment!',
              className : 'form-field para-font',
              style : {height:'150px', width:'100%',  margin:'10px 0'},
              value: '',
          }],
          motherStyle: {
              style: {display:'flex', width:'98%', padding:'10px 0 10px 10px'}
          },
          formStyle : {
              className :'flex-column',
              style : {width:'90%'}
          },
          
          buttonBaseStyle : {
              style : {},
              className : "flex-row space-between"
          },
          image_field : {
                  name: 'post_img',
                  'className': 'icon',
                  type: 'file',
                  style :{display:'none'},
                  id : 'image-upload-di',
                  
              },
          submit_image : {
              name : `send_btn_${id}`,
              className: 'icon',
              type:'submit',
              style:{display:'none'},
              id : `send_reply_btn_${id}`,
          },
          
          form_id : id,

          customSubmitFunction: (data,comp) => {console.log('data')}
      })  
      };
    
    let comment_form = (id, pk=null) => {
        return({
          component: parent.comp,
          fk_pk:pk,
          form_url : parent.loc.comment_url,
          data : parent.data,
          formMethod: 'POST',

          fields : [
              {
              name : 'content_field',
              type : 'text',
              placeholder : 'Comment for queries!',
              className : 'form-field para-font',
              style : {height:'150px', width:'100%',  margin:'10px 0'},
              value: '',
          }],
          motherStyle: {
              style: {display:'flex', width:'98%'}
          },
          formStyle : {
              className :'flex-column',
              style : {width:'90%'}
          },
          
          buttonBaseStyle : {
              style : {},
              className : "flex-row space-between"
          },
          image_field : {
                  name: 'post_img',
                  'className': 'icon',
                  type: 'file',
                  style :{display:'none'},
                  id : 'image-upload-di',
                  
              },
          submit_image : {
              name : `send_btn_${id}`,
              className: 'icon',
              type:'submit',
              style:{display:'none'},
              id : `send_btn_${id}`,
          },
          
          form_id : id,

          customSubmitFunction: (data,comp) => {console.log('data')}
      })  
      };
      
            
    if (user.is_authenticated) {
        
        
        return(
            <div id = {comment_details} className='flex-column display-none'>
           {i.comments.map(function (k, kindex) {
               
               let reply_id = `blog-commentreply-form-${i.pk}-${k.pk}` ;
               let reply_details = `blog-commentreply-details-${i.pk}-${k.pk}` ;
                return(
                <div className = 'flex-column comment-box'>
                <h5 className = "margin-bottom-zero"> {k.user.username} | 2 min ago.</h5>
                <p>{k.text}</p>
                <p className='small-font linkStyle pointer' onClick= {(e) => {document.getElementById(reply_details).style.display = 'flex'}} >reply</p>
                
                <div id={reply_details} className = 'flex-column display-none'>
                    {k.replies.map(function (l, lindex) {
                        return(
                        <div  className = 'flex-column comment-box reply-box'>
                            <h5 className = "margin-bottom-zero">{l.user.username} | 2 min ago.</h5>
                            <p>{l.text}</p>
                            

                        </div>)
                    })}
                    <FormCreator props = {reply_form(reply_id, k.pk, i.pk)} />
                    
                </div>
            
                </div>
                )
           })}
            <FormCreator props= {comment_form(comment_id, i.pk)}/>
            </div>
        )
        
    } else {
        return(<div className='flex-column display-none reply-box small-box jcenter' id={comment_details}>
            <p className='bold-red center pointer' onClick= {() => {window.location.href="/accounts/register"}}>Sign in to view comments </p>
        </div>)
    }

} 
