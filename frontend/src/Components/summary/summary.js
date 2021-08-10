import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.loc = {'url': '/'}
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('summary', this );
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('summary', this );
        
    }

    render () { 
        let summaryform = {
            component: 'summary',
            form_url : this.loc.url,
            data : this.props.data,
            formMethod: 'POST',

            fields : [{
                name : 'summary_field',
                type : 'text',
                placeholder : 'Enter bullet points!',
                className : 'form-field para-font',
                style : {height:'200px', width:'80%', margin: '20px 0'},
                value: '',
                multiple:true,
                repeat:3,
            }],
            motherStyle: {
                style: {display:'flex', width:'98%'}
            },
            formStyle : {
                className :'flex-column',
                style : {width:'100%', margin:'30px 0'}
            },
            
            buttonBaseStyle : {
                style : {},
                className : "flex-column acenter"
            },
            buttonStyle : {
                style : {},
                className : 'btn'
            },
           
            form_id : 'summary_form',

            buttonCustomFunction : (event) => {event.target.style.display = 'none'; event.target.nextSibling.style.display = 'flex'},
            customSubmitFunction: (data,comp) => {(comp.details = data)}
        };
        return(
            <div className = 'flex-column'>
                <FormCreator props = {summaryform} />
            <p  onClick = {(event) => {event.target.style.display = 'none'; document.getElementById(summaryform.form_id).style.display = 'flex'}}>Create Bullet points</p>

            </div>

        )

    }
}
            
            
        
    
        