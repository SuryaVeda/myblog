import React from 'react'
import '../../index.css'
import Heading from '../heading/heading';
import Nav from '../nav/nav';
import Footer from '../footer/footer';


class BasePage extends React.Component {
    render () {
        
        const {vars} = this.props
        return (
             <div className="App">
              <Heading headingData = {vars.headingData} style={vars.headingStyle} />
              <Nav navlinks = {vars.navlinks} navbarStyle = {vars.navbarStyle} navitemStyle = {vars.navitemStyle} />
             
              
             </div>
           );
    }
}

export default BasePage;
