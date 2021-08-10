import React  from 'react';
import '../../index.css';
import comment_img from '../../../public/static/images/comment.png';
import share_img from '../../../public/static/images/share.png';
import FormCreator from '../forms/formcreator';

export default class BlogPostComment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
        this.loc = {'comment_url':'/api/blogPostComment'}
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('blogComment', this );
     
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('blogComment', this );
       
        
    }
    render () {
        let c = this.props.post;
        let comment_f = this.props.comment_form;
        comment_f.form_id = this.props.id;
        console.log(comment_f.form_id);
        
        let comments = () => { 
            if (c.comments) {
                return(
                    
                        <div className = 'flex-column comment-box'>
                <h5 className = "margin-bottom-zero">Karthik | 2 min ago.</h5>
                <p>Checking comment based authentication” usually refers to manually inserting a token in a header in an AJAX request.</p>
           </div>
            
           )
            } else {
               return( 
                    <div className = 'flex-column comment-box'>
                 <h5 className = "margin-bottom-zero">Karthik | 2 min ago.</h5>
                 <FormCreator props = {this.props.comment_form} />

                </div>
               )
            }
        };
        return(
           <div className = 'comment-main-box'>
               {comments()}
           </div>
        )
    }
}