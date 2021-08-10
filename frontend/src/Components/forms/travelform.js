import React from 'react';
import Cookie from 'universal-cookie';
import '../../index.css';
import './travel.css';
import FormCreator from './formcreator';


class TravelForm extends React.Component {
    
    
    
      constructor (props) {
          super(props);
          this.state = {};
          this.loc = {'url':'/createtravel/'}

      }
      componentDidMount() {
        this.props.data.methods.setcomponent('travelDetailForm', this );
    }  
    render () {
        const form_setting = () => ({
            component: this.props.data.components.travelDetail,
            form_url : this.loc.url,
            data : this.props.data,

            fields : [{
                name : 'heading',
                type : 'text',
                placeholder : 'Name of the place',
                className : 'form-field heading-field heading-font space-down',
                style : {}
            }, {
                name : 'content',
                type : 'text',
                placeholder : 'Share your Journey!!',
                className : "form-field content-field para-font space-down ",
                style : {}
            }],
            formStyle : {
                className :'flex-column  med-form-size acenter',
                style : {}
            },
            buttonStyle : {
                style : {},
                className : 'btn flex-end'
            },
            buttonBaseStyle : {
                style : {},
                className : 'flex-row j-flex-end'
            },
        })
        console.log(form_setting());
        
        console.log(this.props.s);
        return (

                <FormCreator props = {form_setting()} />
                

        );
    }
}

export default TravelForm;