import React  from 'react';
import '../../index.css';
import FormCreator from '../forms/formcreator';

import Fact from '../facts/facts';
import Wall from '../wall/wall';

class HomePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        this.props.data.methods.setcomponent('homepage', this );
        
    }
    componentDidUpdate () {
        this.props.data.methods.setcomponent('homepage', this );
        
    }
    render () {
       
        return(
           <div className = 'flex-column cornsilk acenter'>
               <div className = 'flex-row home-page'>
               <Fact data= {this.props.data} />
               <Wall data = {this.props.data} />
            
           </div>
           </div>
        );

    }
}

export default HomePage;