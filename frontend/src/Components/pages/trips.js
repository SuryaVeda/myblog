import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';
import Summary from '../summary/summary';
import TripContent from '../travel/travelcontent';
import comment_img from '../../../public/static/images/comment.png'

class Trips extends React.Component {
    constructor (props) {
        super(props);
        this.state = {'travel_data':[]};
        this.loc = {'url': '/', 'turl': '/api/travelPostForm'};
   
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('trips', this );
        this.props.data.methods.getData(this.loc.turl, 'trips');

        
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
        let tstate = this.state.travel_data;
        
       
        return(
            
            <div className="flex-row ubuntu nowrap">
                <div className = 'flex-column trip-index'>
                    <div className = 'flex-column trip-content-list'>
                    <h2>Contents</h2>
                    <div className = 'search-trips flex-column' >
                        <FormCreator props = {search_trips} />      
                    </div>
                    <div className = 'flex-column content-list unwrap'>
                        <p onClick = {(event) => {event.target.nextSibling.style.display = 'flex'}} className='pointer underline acenter space-top'>list of contents</p>
                        <ol className = 'display-none flex-column nowrap'>
                        {tstate.map(function (i, index) {
                            return(
                                <li onClick={()=> {window.location.href = `#travel_main_post_${i.pk}`}} className = 'pointer underline bold-red space-down'>{i.heading}</li>
                                
                            )
                        })}
                        </ol>
                        
                    </div>
                    </div>
                </div>
                
                <TripContent data = {this.props.data} />
                                  
            </div>
        )
    }
}

export default Trips;