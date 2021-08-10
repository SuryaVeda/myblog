import React from 'react';
import '../../index.css';

const HeadingBody = (props) => {
    return (<div className = "heading-body flex-column">
        <h1>{props.headingData}</h1>
    </div>)
}

class Heading extends React.Component {
    render () {
        const {headingData} = this.props;
        const {style} = this.props;
        return (
            <div className = "main-heading flex-column acenter" style={style}>
                
                <HeadingBody headingData = {headingData} />
            </div>
        )
    }
}

export default Heading;