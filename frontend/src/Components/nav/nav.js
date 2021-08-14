import React from 'react';
import '../../index.css';

const NavLink = (props) => {
    let get_nav_id = () => {
        if (props.navlink.id) {
            return(props.navlink.id)
            
        } else {
            return ('nav-item-{key}')
        }

    };
    if (props.navlink.image) {
        return (
            <div className = "flex-column acenter jcenter" style = {props.navlink.style}>
              <a id = {get_nav_id()} href={props.navlink.address}> <img src = {props.navlink.image} className="icon" /> </a>
            </div>
        )
    } else {
        return (
            <div className = "nav-item flex-column acenter jcenter" style = {props.navlink.style}>
               <a id = {get_nav_id()} href={props.navlink.address}>{props.navlink.name}</a>
            </div>
        )
    }
}

class Nav extends React.Component {
    render () {
        const {navlinks} = this.props;
        const {navbarStyle} = this.props;
        return (
            <div className='flex-row acenter' style={navbarStyle} >
                {navlinks.map(function(link, i) {
                return (<NavLink navlink={link} key={i}  />);
            })}
            </div>
        )
    }
}

export default Nav;