import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';

export default class Fact extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {fact_data : {'para':''}};
        this.loc = {'url': '/api/factForm'};
    }

    componentDidMount () {
        this.props.data.methods.setcomponent('facts', this );
        this.props.data.methods.getData(this.loc.url, 'facts')
    
     
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('facts', this );
        document.getElementById('fact_form').style.display = 'none';
        document.getElementById('fact_para').style.display = 'flex';
        
    }
    render () {
     
        let fact_form = {
            component: 'facts',
            form_url : this.loc.url,
            data : this.props.data,
            formMethod: 'POST',

            fields : [{
                name : 'fact_field',
                type : 'text',
                placeholder : 'Enter some interesting facts!',
                className : 'form-field para-font',
                style : {height:'200px', width:'100%'},
                value: '',
            }],
            motherStyle: {
                style: {display:'none', width:'98%'}
            },
            formStyle : {
                className :'flex-column',
                style : {width:'90%'}
            },
            buttonStyle : {
                style : {},
                className : 'btn'
            },
            buttonBaseStyle : {
                style : {},
                className : "flex-column acenter"
            },
            form_id : 'fact_form',

            buttonCustomFunction : (event) => {event.target.style.display = 'none'; event.target.nextSibling.style.display = 'flex'},
            customSubmitFunction: (data,comp) => {(comp.details = data)}
        };
        

   
        
        return(
            <div className = 'flex-column facts notosans'>
                   <h2 onClick = {(event) => {this.props.data.methods.showform('fact_para', fact_form.form_id)}}>Something new!!</h2>
                   <FormCreator props = {fact_form} />
                   <p id= 'fact_para' onClick = {(event) => {this.props.data.methods.showform('fact_para', fact_form.form_id)}}> {this.state.fact_data.para} </p>
           </div>
        )
    }

}