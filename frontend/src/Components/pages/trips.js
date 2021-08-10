import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';
import Summary from '../summary/summary';
import TripContent from '../travel/travelcontent';
import comment_img from '../../../public/static/images/comment.png'

class Trips extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.loc = {'url': '/'};
   
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('trips', this );
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('trips', this );
        
    }

    render () {
        
        
        let search_trips = {
            component: 'trips',
            form_url : this.loc.url,
            data : this.props.data,
            formMethod: 'GET',
            

            fields : [{
                name : 'search_trips',
                type : 'text',
                placeholder : 'enter trip name..',
                className : 'form-field para-font',
                style : {height:'30px', width:'90%'},
                value: '',
                onchange: (ctext) => {
                    let mystate = this.props.data.components.travel_content.state;
                    mystate.travel_data.some(function(obj) {
                        if(obj.heading.toLowerCase().includes(ctext.target.value.toLowerCase())) {
                            document.getElementById('tripcontents').insertBefore(document.getElementById(`travel_main_post_${obj.pk}`), document.getElementById('tripcontents').firstChild)
                        }
                    })
                } ,
            }],
            motherStyle: {
                style: {display:'flex', width:'98%'}
            },
            formStyle : {
                className :'flex-row',
                style : {width:'100%'}
            },
           
           
            buttonBaseStyle : {
                style : {},
                className : "flex-column "
            },
            
            form_id : 'search_trips_form',

            buttonCustomFunction : (event) => {event.target.style.display = 'none'; event.target.nextSibling.style.display = 'flex'},
            customSubmitFunction: (data,comp) => {(comp.details = data)}
        };
        
       
        return(
            
            <div className="flex-row ubuntu nowrap">
                <div className = 'flex-column trip-index'>
                    <h2>Contents</h2>
                    <div className = 'search-trips flex-column' >
                        <FormCreator props = {search_trips} />
                        
                        
                    </div>
                </div>
                
                <TripContent data = {this.props.data} />
                                  
            </div>
        )
    }
}

export default Trips;