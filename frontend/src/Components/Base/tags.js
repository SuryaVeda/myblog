import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';


class Div extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
   
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('trips', this );
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('trips', this );
        
    }

    render () {
       
        return(
            <div className="flex-row home-page">
                <div className = 'flex-column'>
                    
                </div>              
            </div>
        )
    }
}

export default Trips;