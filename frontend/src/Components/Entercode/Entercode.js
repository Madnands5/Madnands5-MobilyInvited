import React from 'react';
import 'bootstrap';




class Entercode extends React.Component {
    render(){
        return(
          <div>
  {/* Button trigger modal */} 
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalnext">
    Enter Code
  </button>
  {/* Modal */} 
  <div className="modal fade" id="modalnext" tabIndex={-1} role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
    <div className="modal-dialog commonModal" role="document">
      <div className="modal-content" style={{borderRadius: 36}}>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <img src="assets/images/Cross.png" aria-hidden="true" className="modalclose" style={{float: 'right', width: '40.9px', height: '40.9px', marginRight: 20, marginTop: 20}} />
        </button>
        <div className="modal-body  ">
          <img src="assets/icons/noun_event_20805564.png" className="rounded mx-auto d-block" style={{height: 100, width: 100}} />
          <h4 style={{float: 'left', marginTop: 60, fontWeight: 'bold', fontStretch: 'normal', fontStyle: 'normal', fontSize: 16, marginLeft: 5}}>Enter Code</h4>
          <input className="form-control form-control-sm" type="text" placeholder="H2X5HS" style={{borderRadius: 30, margin: '10px 0.2px 4.8px 0'}} />
          <a href="#"><button type="button" className="btn btn-primary mt-3 p-2" style={{width: '100%', borderRadius: 50, fontWeight: 'bold'}}>Use Code</button></a>
          <h6 style={{textAlign: 'center', marginTop:'10px'}}>OR</h6>
          <a href="#"><button type="button" className="btn btn-primary mt-3 p-2 createevent" style={{width: '100%', borderRadius: 50, fontWeight: 'bold'}}>Create Event</button></a>
        </div>
      </div></div></div></div>

        )
    }
}

export default Entercode;