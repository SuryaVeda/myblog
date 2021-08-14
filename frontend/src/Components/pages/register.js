import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';

export default class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {'user':{}}
        this.loc = {'url':'/accounts/registerUser'}
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('register', this );
        this.props.data.methods.checkuser('register');
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('register', this );
        
    }

    render () {
        let check_status = () => {
            if (Object.keys(this.state.user).length > 0) {
                window.location.href = '/app'
            } else {

            }
        };
        let register_form = {
            component: 'register',
            form_url : this.loc.url,
            data : this.props.data,
            formMethod: 'POST',

            fields : [{
                name : 'username',
                type : 'text',
                placeholder : 'Enter Username!',
                className : 'form-field para-font',
                style : { width:'350px', height: '50px', margin:'10px 0'},
                value: '',
            },{
                name : 'email',
                type : 'email',
                placeholder : 'Enter Email!',
                className : 'form-field para-font ',
                style : { width:'350px', height: '50px', margin:'10px 0'},
                value: '',
            },{
                name : 'password',
                type : 'password',
                placeholder : 'Enter Password!',
                className : 'form-field para-font',
                style : { width:'350px', height: '50px', margin:'10px 0'},
                value: '',
            }],

            motherStyle: {
                style: {display:'flex-column', width:'60%', alignSelf:'center'}
            },
            formStyle : {
                className :'flex-column',
                style : {width:'100%', alignContent:'center'}

            },
            buttonStyle : {
                style : {},
                className : 'btn'
            },
            
            buttonBaseStyle : {
                style : {alignSelf:'center'},
                className : "flex-row center space-between"
            },
            
           
            form_id : 'user-register-form',

            customSubmitFunction: (data,comp) => {console.log('data')}
        }
        return(
            <div className = 'flex-column jcenter'>
                <FormCreator props={register_form} />
                {check_status()}
            </div>
        )
    }
}