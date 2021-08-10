import React from 'react';
import '../../index.css'

class SendGetRequest extends React.Component {
    constructor (props) {
        super(props);
        this.get = this.get.bind(this);
    }
    get () {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', this.props.url);
        xhttp.onreadystatechange = function () {
            console.log(xhttp.responseText);
            
            return xhttp.responseText;
        }
        xhttp.send();


    }
    render () {
        return(<div>
            {this.get()}
        </div>)
    }
}

export default SendGetRequest;