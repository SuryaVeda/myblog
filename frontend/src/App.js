import './index.css';
import Trips from './Components/pages/trips';
import HomePage from './Components/pages/homepage';
import BasePage from './Components/basepage/basepage.js';
import TravelForm from './Components/forms/travelform.js';
import TravelDetail from './Components/travel/travel';
import Footer from './Components/footer/footer';
import React from 'react';
import Home from '../public/static/images/home.png';
import Cookie from 'universal-cookie';
import FormCreator from './Components/forms/formcreator'
class App extends React.Component {
  
constructor(props) {
  super(props);
  this.setcomponent = this.setcomponent.bind(this);
  this.addData = this.addData.bind(this);
  this.sendPost = this.sendPost.bind(this);
  this.getData = this.getData.bind(this);
  this.showform = this.showform.bind(this);
  this.closeform = this.closeform.bind(this);
  this.glob = {components:{'main':this}, methods : {'setcomponent':this.setcomponent, 'addData':this.addData, 'getData':this.getData, 'showform':this.showform, 'closeform':this.closeform}};
  

}
 showform (para, form) {
  if (para.length > 0) {
    document.getElementById(para).style.display = 'none';
  }
  document.getElementById(form).style.display = 'flex';
}
closeform (para, form) {
  
}
getData(url, cstate) {
  let xx = this.glob;

  let xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
              let response = JSON.parse(this.responseText);
              console.log('haaaaaaa');
              console.log(this.responseText);
        xx.components[cstate].setState(response);
            }
  };
 
  xhttp.open("GET", url , true);
  xhttp.send();
}
sendPost(x, formdata) {
  let xhttp = new XMLHttpRequest();
  let cookie = new Cookie();
  let xx = this.glob;
  var obj = {};
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         console.log('success o o');
         console.log(this.responseText);
         let response = JSON.parse(this.responseText);
         console.log('response');
         console.log(x.cstate);
         console.log(xx);
         
        xx.components[x.cstate].setState(response);
        
        console.log('seeing state');

      }
  };
  
	for (var key of formdata.keys()) {
		obj[key] = formdata.getAll(key);
    console.log(key)
	}
  console.log(x.post_url);
  console.log('dasfsdasfafs444234432324432');
 
  xhttp.open("POST", x.post_url , true);
  
  xhttp.setRequestHeader("X-CSRFToken", cookie.get("csrftoken"));
  console.log(formdata);
  xhttp.send(formdata);
}
addData(x) {
  x.event.preventDefault();
  const formdata = new FormData(x.event.target);
  console.log(formdata);
  if (x.pk != null) {
    formdata.append('pk', x.pk)
  }
  
     this.sendPost(x,formdata); 

};
setcomponent (name, comp) {
  this.glob.components[name] = comp;
};


render () {
    const home_image = Home;
    const glob = this.glob;
    let cookie = new Cookie();
    console.log(cookie.get('session'));
    console.log(cookie.get('csrftoken'));
  const vars = { 
    headingData : '',
    headingStyle : {backgroundColor:'white', height:200,  justifyContent:'center', display:'none'},
    navlinks: [{name:'home', address: '/app', image: home_image}, {name:'About', address: 'about'}, {name:'trips', address: '/app/trips/'}],
    navbarStyle : {backgroundColor : 'black',minHeight : 50,color: 'white', fontFamily: 'Roboto', padding:10},
    navitemStyle : {color: 'white',marginLeft: 20, marginRight: 20, },
    connect : {fb: 'fb', insta: 'insta', twitter: 'twitter', style: {justifyContent:'center',alignContent:'center', height :100, backgroundColor:'orange'}},
   };
   
  let page = function() {
    let npath = window.location.pathname;
    console.log(npath);
      if (npath === '/about') {
        let x = <TravelForm data = {glob} />;
        return (x)
      }
      else if (npath === '/app/trips/') {
        console.log('yat');
        return (<Trips data = {glob} />)
      }
      else if (npath === '/') {
        return (<Trips data = {glob} />)
      }
      else if (npath === '/app/') {
        return (<HomePage data = {glob} />)
      }

      else {
        console.log('not about');
        return (<div>hi</div>)
      }
  
  };
   
  return (
    <div className = 'App'>
      <BasePage vars = {vars} />
    <div className = "flex-column">
    {page()}
    </div>
    
    </div>
  );
}
   
}

export default App;
