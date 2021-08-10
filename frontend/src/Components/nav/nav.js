import React from 'react';
import '../../index.css';

const NavLink = (props) => {
    if (props.navlink.image) {
        return (
            <div className = "flex-column acenter jcenter" style = {props.style}>
              <a id = 'nav-item-{key}' href={props.navlink.address}> <img src = {props.navlink.image} className="icon" /> </a>
            </div>
        )
    } else {
        return (
            <div className = "nav-item flex-column acenter jcenter" style = {props.style}>
               <a id = 'nav-item-{key}' href={props.navlink.address}>{props.navlink.name}</a>
            </div>
        )
    }
}

class Nav extends React.Component {
    render () {
        const {navlinks} = this.props;
        const {navbarStyle} = this.props;
        const {navitemStyle} = this.props;
        return (
            <div className='flex-row acenter' style={navbarStyle} >
                {navlinks.map(function(link, i) {
                return (<NavLink navlink={link} key={i} style = {navitemStyle} />);
            })}
            </div>
        )
    }
}

export default Nav;