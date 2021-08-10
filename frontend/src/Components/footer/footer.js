import React from 'react';
import '../../index.css';

const FooterLink = (props) => {
    return (
    <div className = "flex-row" style={props.links.style}>
        <a className = 'space inherit-color' href={props.links.fb}>FB</a>
        <a className = 'space inherit-color' href={props.links.insta}>Insta</a>
        <a className = 'space inherit-color' href={props.links.twitter}>twitter</a>
    </div>
    
    )
    
}

class Footer extends React.Component {
    render () {
        const {links} = this.props;
        const {style} = this.props;
        return (
            <div className = "flex-column">
                
                <FooterLink links = {links} />
            </div>
        )
    }
}

export default Footer;