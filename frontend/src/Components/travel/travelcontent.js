import React from 'react';
import '../../index.css';
import '../../../node_modules/@splidejs/splide/dist/css/splide.min.css'
import FormCreator from '../forms/formcreator';
import comment_img from '../../../public/static/images/comment.png';
import create_comment_section from '../comments/comment';
import Carousel from '../carousel/carousel';
import parse from 'html-react-parser';
export default class TripContent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {'travel_data': [], 'user':{}};
        this.loc = {url: '/api/travelPostForm', 'comment_url': '/api/travelCommentForm', 'reply_url': '/api/blogReplyForm'};
    }
    componentDidMount () {

        this.props.data.methods.setcomponent('travel_content', this );
        this.props.data.methods.getData(this.loc.url, 'travel_content');
        this.props.data.methods.checkuser('travel_content');
        
       

        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('travel_content', this );
       
      // Carousel('mcqbox', 'mcqblock');
        
    }
    render() {
       
        
        
        let ndata = this.props.data;
        let myloc = this.loc;
        let mystate = this.state;
        let travel_post_form = (post_data) => {
            return(
                {
                    component: 'travel_content',
                    form_url : this.loc.url,
                    data : this.props.data,
                    formMethod: 'POST',
                    pk:post_data.pk,
        
                    fields : [{
                        name : 'heading_field',
                        type : 'text',
                        placeholder : 'Enter heading to ur story',
                        className : 'form-field heading-field heading-font ',
                        style : { width:'100%', margin:'10px 0'},
                        value: post_data.heading_field,
                    },{
                        name : 'content_field',
                        type : 'text',
                        placeholder : 'Enter details of ur story!',
                        className : 'form-field para-font',
                        style : {height:'300px', width:'100%',  margin:'10px 0'},
                        value: post_data.content_field,
                    }],
                    motherStyle: {
                        style: {display:'none', width:'98%'}
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
                            name: post_data.img_field_name,
                            'className': 'icon',
                            type: 'file',
                            style :{display:'none'},
                            multiple:true,
                            id : post_data.img_field_name,
                            
                        },
                    submit_image : {
                        name : 'send_img',
                        className: 'icon',
                        type:'submit',
                        style:{display:'none'},
                        id : post_data.submit_image_id,
                    },
                    
                    form_id : post_data.form_id,
                    post_id : post_data.post_id,
        
                    buttonCustomFunction : post_data.buttonCustomFunction,
                    customSubmitFunction: (data,comp) => {console.log('data')}
                }
            )
        }
        let get_travel_post_form = () => {

            if (mystate.user.is_authenticated == true) {
                return(
                <div className = 'flex-column'>
                <p className='linkStyle pointer' onClick = {(e) => {document.getElementById('travel_post_form').style.display='flex'}}>Create travel</p>
                <FormCreator props = {travel_post_form({heading_field : "", content_field: '', pk : null, form_id:'travel_post_form', submit_image_id: 'send_img_btn_travelpost',img_field_name:'travel_post_image_default', buttonCustomFunction: () => {document.getElementById('travel_post_form').style.display = 'none'} })} />
               </div>
                )             
            } else {
                
            }
        }
        return(
           <div className = 'flex-column trip-main' id = 'tripcontents'>
                {get_travel_post_form()}

            {this.state.travel_data.map(function (i , index) {
                let main_post_id = `travel_main_post_${i.pk}`;
                let post_id = `travel_post_${index}`;
                let new_form_id = `travel_post_form_${index}`;
                let submit_image_id = `send_img_btn_travelpost-${index}`;
                let carousel_box_id = `travel-carousel-box-${index}`;
                let carousel_block_class = `travel-carousel-block-${index} carouselBlockStyle`;
                let comment_id = `travel-comment-form-${i.pk}` ;
                let comment_details = `travel-comment-details-${i.pk}` ; 
                
                let get_edit_travel_form = () => {
                    
                    if (mystate.user.is_authenticated == true) {
                        let some_array = {
                            heading_field : i.heading,
                            content_field: i.content, 
                            pk : i.pk, form_id : new_form_id, 
                            submit_image_id:submit_image_id,
                            img_field_name: `${post_id}-img`,
                            buttonCustomFunction: () => {return(ndata.methods.showform(new_form_id, post_id)) },
                           };
                        return(
                            <FormCreator props={travel_post_form(some_array)} />
                        )
                    }
                }
                
                
                return (
                  <div className = 'flex-column' id = {main_post_id} >
                    {get_edit_travel_form()}

                    <div id={post_id} className="notosans flex-column">
                      <h2 style={{fontSize:'30px'}}  onClick={(event) => {if (ndata.methods.user_is_staff())  {ndata.methods.showform(post_id, new_form_id)}}} className="margin-bottom-zero">{i.heading}</h2>
                      <p className="small-font">A.Suryaveda | 10 min ago</p>

                      {Carousel.get_travel_image(i, carousel_box_id, carousel_block_class)}

                      <p className="linebreaks">{parse(i.content)}</p>
                      <div className = 'flex-column comment-section'>
                    <div className='flex-column comment-bar'>
                        <img onClick = {(e) => {document.getElementById(comment_details).style.display = 'flex'}}  src = {comment_img} className = 'icon' />
                    </div>
                    {create_comment_section(comment_details, i, comment_id,mystate.user, {comp:'travel_content', loc:myloc, data:ndata,})}
                    
                    
                    </div>
                    </div>
                  </div>
                );
            })}

           </div>
        )
    }
}