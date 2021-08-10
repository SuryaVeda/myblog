import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';


class Tour extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.details = {};
        //this.details = this.state;
        this.loc ={url:'/api/edittour'}
        
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('tours', this );
        this.props.data.methods.getData('/api/trips', this);
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('tours', this );
        
    }

    render () {
        let stateobj = Object.values(this.state);
        let dat;
        let mycomp =this;
        console.log(mycomp);
        console.log('sdajflds');
        console.log(stateobj.length);
        console.log(Object.keys(this.details).length);
        
        if (stateobj.length > 0 && Object.keys(this.details).length < 1) {
            console.log('dont wanna be here');
            dat = <div className='flex-row space-evenly'>
                { stateobj.map(function (i, index) {
                let img = `/media/trips/${i.img}`;
                let ref_url = () => {console.log('hi');mycomp.details = i;mycomp.setState({});console.log('fuck u'); console.log(mycomp.props.data.components.tours.state);};

                return(<div className = 'flex-column trip-block' onClick = {ref_url}>
                    <h2>{i.heading}</h2>
                    <img className='trip-block-img' src = {img} />
                    <p>{i.about}</p>
                </div>)
            })}
            </div>

        } else if (Object.keys(this.details).length > 0) {
            let heading_form = {
                component: this.props.data.components.tours,
                form_url : this.loc.url,
                data : this.props.data,
                pk:this.details.pk,
                formMethod: 'POST',
    
                fields : [{
                    name : 'heading',
                    type : 'text',
                    placeholder : 'Name of the place',
                    className : 'form-field heading-field heading-font',
                    style : {},
                    value: this.props.data.components.tours.details.heading,
                }],
                motherStyle: {
                    style: {display:'none'}
                },
                formStyle : {
                    className :'flex-row',
                    style : {}
                },
                buttonStyle : {
                    style : {},
                    className : 'btn'
                },
                buttonBaseStyle : {
                    style : {},
                    className : "flex-column jcenter"
                },
                buttonCustomFunction : (event) => {event.target.style.display = 'none'; event.target.nextSibling.style.display = 'flex'},
                customSubmitFunction: (data,comp) => {(comp.details = data)}
            };
            
            dat = <div className = 'flex-column'>
                {console.log('calling form creater')}
                < FormCreator props = {heading_form}/>
                {console.log('form creater callex')}
                <h2 onClick = {(event) => {event.target.previousSibling.style.display = 'flex'; event.target.style.display = 'none'}}>{this.details.heading}</h2>
                <p>{this.details.content}</p>
            </div>
        } 
        else {
            dat = <div>No trips available.</div>
        }
        return(
            <div className="flex-column">
                {dat}
            </div>
        )
    }
}

export default Tour;