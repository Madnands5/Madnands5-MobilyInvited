import React from 'react';
import 'bootstrap';

class Notification extends React.Component{
    render(){
        return(
            
     <div>
   {/* Button trigger modal */} 
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
   Notifications
  </button>
    {/* Modal */} 
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content" style={{borderRadius: 5}}>
        <div className="modal-body  ">
          <div className="Notificationportion-strt p-2">
            <div className="Notifications-header d-flex flex-row">
              <h4 className="font-weight-bold pr-5" style={{marginRight: 130}}>Notifications</h4>
              <img className="ml-5 mr-3" src="assets/Icons/noun_Info_2691046.png" height="35px;" />
              <button type="button" className="btn btn" style={{background: 'none'}}>
                <i className="fa fa-ellipsis-h mt-2 " aria-hidden="true" /></button>
            </div>
            <div className="media mt-5 mb-3">
              <img className="mr-3" src="assets/images/notificationimage7.png" alt="Generic placeholder image" />
              <div className="media-body">
                <h5 className="mt-0 font-weight-bold">Dan liked your post</h5>
                <p className="text-secondary"><img className="mr-3 " src="assets/images/Group%203710.svg" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
            <div className="media mb-3">
              <img className="mr-3" src="assets/images/notificationimage6.png" alt="Generic placeholder image" />
              <div className="media-body">
                <h5 className="mt-0 font-weight-bold">Dan commented your post</h5>
                <p className="text-secondary"><img className="mr-3 " src="assets/images/ic-comment-48px.svg" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
            <div className="media mb-3">
              <img className="mr-3" src="assets/images/notificationimage5.png" alt="Generic placeholder image" />
              <div className="media-body">
                <h5 className="mt-0 font-weight-bold">Dan scheduled your post</h5>
                <p className="text-secondary"><img className="mr-3 " src="assets/images/noun_event_2080556.svg" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
            <div className="media mb-3">
              <img className="mr-3" src="assets/images/notificationimg4.png" alt="Generic placeholder image" />
              <div className="media-body">
                <h5 className="mt-0 font-weight-bold">Dan sent a message</h5>
                <p className="text-secondary"><img className="mr-3 " src="assets/images/comment-dots.svg" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
            <div className="media mb-3">
              <img className="mr-3" src="assets/images/noificationimg3.png" alt="Generic placeholder image" />
              <div className="media-body">
                <p className="mt-0  text-secondary">Dan tagged you in a post</p>
                <p className="text-secondary"><img className="mr-3 " src="assets/images/tag.svg" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
            <div className="media mb-3">
              <img className="mr-3" src="assets/images/notificationimg2.png" alt="Generic placeholder image" />
              <div className="media-body">
                <p className="mt-0  text-secondary">Dan make you admin of Minvitd</p>
                <p className="text-secondary"><img className="mr-3 " src="assets/images/user.1.svg" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
            <div className="media mb-5">
              <img className="mr-3" src="assets/images/notificationimg1.png" alt="Generic placeholder image" />
              <div className="media-body">
                <p className="mt-0  text-secondary">You have customised the post</p>
                <p className="text-secondary"><img className="mr-3 " src="assets/Icons/Path%204969.png" height="10px;" />Sunday, 30/06/20, 09:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        )
    }
}
export default Notification;