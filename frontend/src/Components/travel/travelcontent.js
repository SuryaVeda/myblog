import React from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';
import comment_img from '../../../public/static/images/comment.png';

export default class TripContent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {'travel_data': []};
        this.loc = {url: '/api/travelPostForm'};
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('travel_content', this );
        this.props.data.methods.getData(this.loc.url, 'travel_content');

        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('travel_content', this );
        
    }
    render() {
        let ndata = this.props.data;
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
                        placeholder : 'Enter some interesting facts!',
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
        
                    buttonCustomFunction : post_data.buttonCustomFunction,
                    customSubmitFunction: (data,comp) => {console.log('data')}
                }
            )
        }
        return(
           <div className = 'flex-column trip-main' id = 'tripcontents'>
                <div className = 'flex-column'>
                <FormCreator props = {travel_post_form({heading_field : "", content_field: '', pk : null, form_id:'travel_post_form', submit_image_id: 'send_img_btn_travelpost',})} />
            </div>
            {this.state.travel_data.map(function (i , index) {
                let main_post_id = `travel_main_post_${i.pk}`;
                let post_id = `travel_post_${index}`;
                let new_form_id = `travel_post_form_${index}`;
                let submit_image_id = `send_img_btn_travelpost-${index}`;
                console.log(i.pk);
                console.log(i);
                let some_array = {
                     heading_field : i.heading,
                     content_field: i.content, 
                     pk : i.pk, form_id : new_form_id, 
                     submit_image_id:submit_image_id,
                     img_field_name: `${post_id}-img`,
                     buttonCustomFunction: () => {document.getElementById(post_id).style.display = 'flex', document.getElementById(new_form_id).style.display = 'none'}
                    }
                
                return (
                  <div className = 'flex-column' id = {main_post_id} >
                    <FormCreator props={travel_post_form(some_array)} />

                    <div id={post_id} className="notosans flex-column">
                      <h2 onClick={() => {document.getElementById(post_id).style.display = 'none', document.getElementById(new_form_id).style.display = 'flex'}} className="margin-bottom-zero">{i.heading}</h2>
                      <p className="small-font">A.Suryaveda | 10 min ago</p>
                      <p className="linebreaks">{i.content}</p>

                      <div className="flex-column comment-section">
                        <div className="flex-column comment-bar">
                          <div id="ex"></div>
                          <img
                            onClick={(e) => {
                              e.target.parentElement.nextElementSibling.style.display =
                                "flex";
                            }}
                            src={comment_img}
                            className="icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })}
           </div>
        )
    }
}