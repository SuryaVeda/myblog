import React from 'react';
import '../forms/travel.css';
import '../../index.css';

class TravelDetail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = [];
        this.deletepost = this.deletepost.bind(this);
        this.loc = {'url': '/travel/'}
        
    }
    deletepost() {
        console.log(this.props);

    }

componentDidMount() {
    this.props.data.methods.setcomponent('travelDetail', this );
    this.props.data.methods.getData(this.loc.url, this);
    
    
}  

render () {
    let data;
    let stateobj = Object.values(this.state); 
     if (stateobj.length > 0) {
         data = <div>
         {stateobj.map(function(i, index) {
             return(
                 <div className='flex-column highlight'>
                     <h1>{i.heading}</h1>
                     <p>{i.content}</p>
                 </div>
             )
         })}
     </div>
    }  else {
        data = <div>no data </div>
    } 
    
    return (
        <div>{data}</div>
    ) 
    
}

}

export default TravelDetail;