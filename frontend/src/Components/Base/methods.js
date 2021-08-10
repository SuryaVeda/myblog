class bm {
    static sendPost(data,url) {
        let xhttp = new XMLHttpRequest();
        let cookie = new Cookie();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
               console.log('success o o');
            }
        };
       
        xhttp.open("POST", url , true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("X-CSRFToken", cookie.get("csrftoken"));
        xhttp.send(`heading=${data.get('heading')}&content=${data.get('content')}`);
      }
      static addData(e, x,url){
        e.preventDefault();
        const formdata = new FormData(e.target);
        e.target.reset();
        let y = x.state;
        for (var [key, value] of formdata) {
          if (value) {      
            y[key] = value;
           
          }
      
           }
           x.setState( y); 
           this.sendPost(formdata,url); 
      
      };
      static setcomponent (name, comp) {
        let x = this.state;
        x.components[name] = comp;
      this.setState( x );
      }
      
      
}
export default bm;