import React from 'react';


export default class Carousel  {


static  nextquestion( classname) {
    let block = document.getElementsByClassName(classname);
    console.log(block);
    for (var i = 0; i <block.length; i++) {
                  if (window.getComputedStyle(block[i]).display == 'flex'){

                      if (i < block.length-1) {
                          block[i+1].style.display = 'flex';
                          block[i].style.display = 'none';
                          break;
                      } else {  

                        }
                    }
                }
            }
static  previousquestion(classname) {
    let block = document.getElementsByClassName(classname);
    for (var i = 0; i <block.length; i++) {
                  if (window.getComputedStyle(block[i]).display == 'flex'){

                      if (i-1 >= 0) {
                          block[i-1].style.display = 'flex';
                          block[i].style.display = 'none';
                          break;
                      } else {

                      }
                    }
                }
            }
 static get_travel_image (i, carousel_box_id, carousel_block_class) {
                    
                    if (i.image.length > 0) {
                        return(
                            <div className='flex-column'>
                            <div className='flex-column acenter jcenter' id={carousel_box_id} >
                                
                                {i.image.map(function (j, jindex) {
                                    
                                    if (jindex != 0) {
                                        return(
                                            <div className={carousel_block_class} style = {{'display':'none'}} >
                                                <img className='carousel-image'  src={j} />
                                            </div>
                                                )                                        
                                    } else {
                                        return(
                                            <div className={carousel_block_class} >
                                                <img className='carousel-image'  src={j} />
                                            </div>
                                                )
                                    }
                                })}
                                <p style={{ alignSelf: 'center', backgroundColor: '#000066', color: 'white' }}>

                                    <a className='pointer' onClick={(event) => { this.previousquestion(carousel_block_class) }}>PREV</a>
                                    |
                                    <a className='pointer' onClick={(event) => { this.nextquestion(carousel_block_class) }}>NEXT</a>
                                </p>
                            </div>
                      </div>
                        )
                    }
                    
                }
                static get_text_slider (i, carousel_box_id, carousel_block_class) {
                    
                    if (i.length > 0) {
                        return(
                            <div className='flex-column'>
                            <div className='flex-column acenter jcenter' id={carousel_box_id} >
                                
                                {i.map(function (j, jindex) {
                                    
                                    if (jindex != 0) {
                                        return(
                                            <div className={carousel_block_class} style = {{'display':'none'}} >
                                                <p>{j.para}</p>
                                            </div>
                                                )                                        
                                    } else {
                                        return(
                                            <div className={carousel_block_class} style = {{'display':'flex'}} >
                                                <p>{j.para}</p>
                                            </div>
                                                )
                                    }
                                })}
                                <p style={{ alignSelf: 'center', backgroundColor: '#000066', color: 'white' }}>

                                    <a className='pointer' onClick={(event) => { this.previousquestion(carousel_block_class) }}>PREV</a>
                                    |
                                    <a className='pointer' onClick={(event) => { this.nextquestion(carousel_block_class) }}>NEXT</a>
                                </p>
                            </div>
                      </div>
                        )
                    }
                    
                }



/*   
var startx;
var starty;
var endx;
var endy;

var xdist;
var ydist;
var starttime;
var endtime;
var elapsedtime;
mcqbox.addEventListener('touchstart', function (e) {
       console.log(e);
       var touchobj = e.changedTouches[0];
       startx = touchobj.pageX;
       starty = touchobj.pageY;
       starttime = new Date().getTime();
       
    }, false);

   mcqbox.addEventListener('touchend', function (e) {
       console.log(e);
       var touchobj = e.changedTouches[0];
       endx = touchobj.pageX;
       endy = touchobj.pageY;

       endtime = new Date().getTime();
       elapsedtime = (endtime - starttime)/1000;
       xdist = endx-startx;
       ydist = endy-starty;
       if (elapsedtime <= 2) {
           if (Math.abs(xdist) >= 30 && Math.abs(ydist) <=100 ){
              if (xdist > 0){
                  for (var i = 0; i <mcqblock.length; i++) {
                      if (window.getComputedStyle(mcqblock[i]).display == 'flex'){

                          if (i-1 >= 0) {
                              mcqblock[i-1].style.display = 'flex';
                              mcqblock[i].style.display = 'none';
                              break;
                          } else {
                          }

                      }
                  }


              } else {
                  for (var i = 0; i <mcqblock.length; i++) {
                      if (window.getComputedStyle(mcqblock[i]).display == 'flex'){

                          if (i < mcqblock.length-1) {
                              mcqblock[i+1].style.display = 'flex';
                              mcqblock[i].style.display = 'none';
                              break;
                          } else {

                          }

                      }
                  }
              }

           }
       }



   }, false);


*/
   
    
            }
