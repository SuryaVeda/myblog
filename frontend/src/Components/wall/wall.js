import React  from 'react';
import '../../index.css';
import comment_img from '../../../public/static/images/comment.png';
import share_img from '../../../public/static/images/share.png';
import FormCreator from '../forms/formcreator';
import BlogPostComment from '../comments/blogcomment';
import create_comment_section from '../comments/comment.js'
export default class Wall extends React.Component {
    constructor (props) {
        super(props);
        this.state = {wall_data : []}
        this.loc = {'url': '/api/postForm', 'comment_url': '/api/blogCommentForm', 'reply_url': '/api/blogReplyForm'}
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('wall', this );
        this.props.data.methods.getData(this.loc.url, 'wall');
        this.props.data.methods.checkuser('wall');
      
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('wall', this );
       
        
    }
    render() {
        
       
        let post_form = {
            component: 'wall',
            form_url : this.loc.url,
            data : this.props.data,
            formMethod: 'POST',

            fields : [{
                name : 'heading_field',
                type : 'text',
                placeholder : 'Enter heading to ur story',
                className : 'form-field heading-field heading-font ',
                style : { width:'100%', margin:'10px 0'},
                value: '',
            },{
                name : 'content_field',
                type : 'text',
                placeholder : 'Enter some interesting facts!',
                className : 'form-field para-font',
                style : {height:'300px', width:'100%',  margin:'10px 0'},
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
                name : 'send_img',
                className: 'icon',
                type:'submit',
                style:{display:'none'},
                id : 'send_img_btn',
            },
            
            form_id : 'post_form',

            customSubmitFunction: (data,comp) => {console.log('data')}
        };
        let data = this.props.data;
        let mystate = this.state;
        let myloc = this.loc;
        let create_post_form = () => {
            data.methods.user_is_staff();
            if (data.methods.user_is_staff()) {
                return(
                    <div className = 'wall-post notosans'>
                    <FormCreator props = {post_form} />
                    </div>
                )
            } else {

            }
        };

        
        
        
        
        return (
            <div className = 'wall notosans'>
                {create_post_form()}
                {this.state.wall_data.map(function (i , index) {
                    let post_id = `blog_post_${index}`;
                    let comment_id = `blog-comment-form-${i.pk}` ;
                    let comment_details = `blog-comment-details-${i.pk}` ;

                    
                    return (
                    <div id = {post_id} className = 'wall-post notosans'>
                
                    <h2 className = "margin-bottom-zero">{i.heading}</h2>
                    <p className = 'small-font'>{i.user.username} | 10 min ago</p>
                    <p>{i.content}</p>
    
                    <div className = 'flex-column comment-section'>
                    <div className='flex-column comment-bar'>
                        <img onClick = {(e) => {document.getElementById(comment_details).style.display = 'flex'}}  src = {comment_img} className = 'icon' />
                    </div>
                    {create_comment_section(comment_details, i, comment_id,mystate.user, {comp:'wall', loc:myloc, data:data})}
                    
                    
                    </div>
                </div>
                )
                })}
            
            <div className = 'wall-post notosans'>
                <h2 className = "margin-bottom-zero">Example post</h2>
                <p className = 'small-font'>A.Suryaveda | 10 min ago</p>
                <p>The two methods that I frequently see in the wild are either token-based authentication, or cookie-based authentication. The terminology is somewhat confusing as tokens are used for both mechanisms, but “token-based authentication” usually refers to manually inserting a token in a header in an AJAX request, whereas “cookie-based authentication” refers to using cookies to send this automatically.</p>
                <div className = 'flex-column comment-section'>
                <div className='flex-column comment-bar'>
                    <img src = {comment_img} className = 'icon' />
                </div>
                <div className = 'flex-column comment-box'>
                     <h5 className = "margin-bottom-zero">Karthik | 2 min ago.</h5>
                     <p>Checking comment based authentication” usually refers to manually inserting a token in a header in an AJAX request.</p>
                </div>
                <div className = 'flex-column comment-box'>
                     <h5 className = "margin-bottom-zero">Karthik | 2 min ago.</h5>
                     <p>Checking comment based authentication” usually refers to manually inserting a token in a header in an AJAX request.</p>
                </div>
                </div>
            </div>
        </div>
        )
    }
}