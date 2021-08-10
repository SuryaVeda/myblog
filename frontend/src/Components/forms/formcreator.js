import React from 'react'
import '../../index.css'
import img_upload from '../../../public/static/images/image_upload.png';
import send_img from '../../../public/static/images/send.png';
import plus from '../../../public/static/images/plus.png';
class FormCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        
       
       
    }
    componentDidMount () {
        this.setState(this.props);
    }
    componentDidUpdate () {
       console.log(`form creater ${this.state}`);
       console.log(this.state)
    }
    render() {
        let {fields} = this.props.props;
        let {formStyle} = this.props.props;
        let {buttonBaseStyle} = this.props.props;
        let {buttonStyle} = this.props.props;
        let img_field = () => {
            if (this.props.props.image_field) {
                return(
                   <div className = 'flex-column'>
                        <label htmlFor = {this.props.props.image_field.id} ><img className = 'icon' src = {img_upload} />  </label>

                        <input id ={this.props.props.image_field.id} style={this.props.props.image_field.style} type ={ this.props.props.image_field.type} name = {this.props.props.image_field.name}  />
                   </div>
                )
                
            }     
            
        };
        let btn_field = () => {
            if (this.props.props.buttonStyle) {
                return(<button className = {buttonStyle.className} style= {buttonStyle.style}  type = 'submit'>Submit</button>)


            } else if (this.props.props.submit_image) {
                return(<div className = 'flex-column'>
                <label htmlFor = {this.props.props.submit_image.id} ><img className = 'icon' src = {send_img} />  </label>

                <input id ={this.props.props.submit_image.id} style={this.props.props.submit_image.style} type ={ this.props.props.submit_image.type} name = {this.props.props.submit_image.name}  />
           </div>)
            }
            else {
                console.log('no button')
                    
                

            }
        };
        console.log('dksjflsjaf\\\\\\\\');
        console.log(this.props.props);
        let form_submit = (event) => {
            console.log(event);
            event.preventDefault();
            if (this.props.props.buttonCustomFunction) {
                this.props.props.buttonCustomFunction();  
            }
           
            this.props.props.data.methods.addData(
                {
                    'event': event, 
                    'cstate': this.props.props.component, 
                    'post_url':this.props.props.form_url, 
                    'pk' :this.props.props.pk, 
                    'customSubmitFunction': this.props.props.customSubmitFunction
                })
        };
        return (
            <div  id={this.props.props.form_id} className = 'flex-column' style={this.props.props.motherStyle.style}>
                <form encType = 'multipart/form-data' method = {this.props.props.formMethod} className = {formStyle.className} style = {formStyle.style} onSubmit = {form_submit} >
                {fields.map(function (i, index)
                
                {
                    let multiple;
                    let classe = `display-none ${i.className}`;
                    if (i.type == 'text') {
                        let create_field = () => {
                            console.log('lets se3e');
                            
                            if (i.multiple == true) {
                                return(
                                    Array.from(Array(i.repeat).keys()).map( function (x, y) {
                                        if (x > 0) {
                                            
                                            return(
                                         
                                                <textarea id = {index} className={classe} name = {i.name} placeholder = {i.placeholder} style = {i.style}>{i.value}</textarea>
     
                                             )

                                        } else {
                                            let newclss = `flex-column ${i.className}`;
                                            return(
                                         
                                                <textarea id = {index} className={newclss} name = {i.name} placeholder = {i.placeholder} style = {i.style}>{i.value}</textarea>
     
                                             )
                                        }
                                    })
                                ) 
                            
                            } else {

                            return(
                                <textarea onChange = {i.onchange} id = {index} className={i.className} name = {i.name} placeholder = {i.placeholder} style = {i.style}>{i.value}</textarea>
                            )
                            }
            
                        };
                       
                        if (i.multiple == true ) {
                            let show_next_form = () => {
                                var arr = Array.prototype.slice.call(document.getElementsByName(i.name));
                                for (let g = 0; g < arr.length; g++) {
                                    if (arr[g].classList.contains('display-none')) {
                                        arr[g].classList.remove('display-none');
                                        return 1;
                                    }
                                    
                                }

                            }
                           multiple = <img onClick = {show_next_form}  src = {plus} className = 'pointer small-icon acenter ' style = {{marginLeft:'10px'}} />
                        } 
                        return(
                            <div className = 'flex-row'>
                                {create_field()}
                               
                                {multiple}
                            </div>
                        )
                    }
                
                    
                })}
                <div style={buttonBaseStyle.style} className = {buttonBaseStyle.className}>
                        {img_field()}
                        {btn_field()}
                    </div>

                </form>
                
            </div>
        );
    }
}

export default FormCreator;