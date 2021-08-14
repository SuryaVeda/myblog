import './index.css';
import Trips from './Components/pages/trips';
import HomePage from './Components/pages/homepage';
import BasePage from './Components/basepage/basepage.js';
import TravelForm from './Components/forms/travelform.js';
import Register from './Components/pages/register';
import TravelDetail from './Components/travel/travel';
import Footer from './Components/footer/footer';
import React from 'react';
import Home from '../public/static/images/home.png';
import Cookie from 'universal-cookie';
import FormCreator from './Components/forms/formcreator'

class App extends React.Component {
  
constructor(props) {
  super(props);
  this.state = {'user':{}};
  this.setcomponent = this.setcomponent.bind(this);
  this.addData = this.addData.bind(this);
  this.sendPost = this.sendPost.bind(this);
  this.getData = this.getData.bind(this);
  this.showform = this.showform.bind(this);
  this.closeform = this.closeform.bind(this);
  this.checkuser = this.checkuser.bind(this);
  this.logout = this.logout.bind(this);
  this.carousel = this.carousel.bind(this);
  this.user_is_staff = this.user_is_staff.bind(this);
  this.glob = {components:{'main':this}, methods : {'setcomponent':this.setcomponent, 'addData':this.addData, 'getData':this.getData, 'showform':this.showform, 'closeform':this.closeform, 'checkuser':this.checkuser, 'user_is_staff': this.user_is_staff, 'logout':this.logout, 'carousel': this.carousel}};
  

}
carousel (box, eblock) {
  let mcqbox = document.getElementById(box);
  let mcqblock = document.getElementsByClassName(eblock);
  if (mcqblock.length > 0) {
    console.log('revealing block');
    mcqblock[0].style.display = "flex";
    }
  }

logout () {
  let xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
              let response = JSON.parse(this.responseText);
              
        this.setState(response);
            }
  };
 
  xhttp.open("GET", '/accounts/logoutUser' , true);
  xhttp.send();
}
user_is_staff () {
  if (Object.keys(this.state.user).length > 0) {
    console.log(this.state.user.staff)
    return(this.state.user.staff)
  } else {
    return(false)
  }
}
checkuser (cstate) {
  let xhttp = new XMLHttpRequest();
  let xx = this.glob;
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
              let response = JSON.parse(this.responseText);
              
        xx.components[cstate].setState(response);
            }
  };
 
  xhttp.open("GET", '/api/checkuser' , true);
  xhttp.send();
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
              console.log('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')
              
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
       
         let response = JSON.parse(this.responseText);
     
         
        xx.components[x.cstate].setState(response);
        

      }
  };
  
	for (var key of formdata.keys()) {
		obj[key] = formdata.getAll(key);
    console.log(key)
	}

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
  if (x.data.fk_pk != null) {
    formdata.append('fk_pk', x.data.fk_pk)
  }
  if (x.data.post_pk != null) {
    formdata.append('post_pk', x.data.post_pk)
  }
  if (x.data.redirect_url != null) {
    formdata.append('redirect_url', x.data.redirect_url)
  }
  
     this.sendPost(x,formdata); 

};
setcomponent (name, comp) {
  this.glob.components[name] = comp;
};
componentDidMount () {
  this.setcomponent('myapp', this)
  this.checkuser('myapp')
}
componentDidUpdate () {
  this.setcomponent('myapp', this)

}


render () {
    const home_image = Home;
    const glob = this.glob;
    let cookie = new Cookie();

     let user_status = () => {
        if (Object.keys(this.state.user).length > 0 ) {
          try {
            document.getElementById('register').style.display = 'none';
          document.getElementById('logout').style.display = 'flex';
          }
          catch {
          }


        } else {
          try {
            document.getElementById('register').style.display = 'flex';
          document.getElementById('logout').style.display = 'none';
          }
          catch {
          }

        }
       
      
    }
  let vars = { 
    headingData : '',
    headingStyle : {backgroundColor:'white', height:200,  justifyContent:'center', display:'none'},
    navlinks: [{name:'home', address: '/app', image: home_image},  {name:'trips', address: '/app/trips/'}, {name:'register', address: '/accounts/register', id:'register' , style :{position: 'absolute', right:'10px'}},{name:'logout', address: '/accounts/logoutUser', id:'logout', style :{position: 'absolute', right:'10px'}} ],
    navbarStyle : {backgroundColor : 'black',minHeight : 50,color: 'white', fontFamily: 'Roboto', padding:10},
    connect : {fb: 'fb', insta: 'insta', twitter: 'twitter', style: {justifyContent:'center',alignContent:'center', height :100, backgroundColor:'orange'}},
   };
   
  let page = function() {
    let npath = window.location.pathname;
      if (npath === '/about') {
        let x = <TravelForm data = {glob} />;
        return (x)
      }
      else if (npath === '/app/trips/') {
        return (<Trips data = {glob} />)
      }
      else if (npath === '/') {
        return (<Register data = {glob} />)
      }
      else if (npath === '/app/') {
        return (<HomePage data = {glob} />)
      }
      else if (npath === '/accounts/register') {
        return (<Register data = {glob} />)
      }

      else {
        return (<div>hi</div>)
      }
  
  };
   
  return (
    <div className = 'App'>
      <BasePage vars = {vars} />
    <div className = "flex-column">
    {page()}
    </div>
    {user_status()}
    
    </div>
  );
}
   
}

export default App;
