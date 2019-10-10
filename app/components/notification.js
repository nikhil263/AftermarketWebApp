import React, { PropTypes, Component } from 'react';
import Step from 'components/hub-selection/step';
import { previousFilter } from 'actions/filters';
import Modal from 'react-modal';
import {Link} from 'react-router';
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModel: false,
            openDetailModal: false,
            notificationId: null,
        };
        this.closeDetailModal = this.closeDetailModal.bind(this);
    };

    openDetailModal (id) {
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        this.setState({openNotesModal: true, notificationId: id});
        const index = notifications.findIndex(a => a.Id === id);
        if(index > -1){
            notifications[index] = { ...notifications[index], seen: true};
        }
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    closeDetailModal() {
        this.setState({openNotesModal: false, openModel: true});
    }

    renderDialogs() {
        const { openNotesModal, notificationId } = this.state;
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        let unseen = notifications.filter(a => a.seen === false || !a.seen);
        localStorage.setItem('unseenNotificationsCount', unseen ? unseen.length : notifications.length);
        if(openNotesModal) {
            let notification = notifications.find(n => n.Id === notificationId);
            return (
                <Modal
                    isOpen={openNotesModal}
                    onRequestClose={this.closeDetailModal}
                    shouldCloseOnOverlayClick={true}
                    className="notification-modal notification-detail"
                >
                    <div>
                        <div className="modal-content">
                            <div className="grid-block">
                                <div className="text-center small-12">
                                    <h2>{notification.Title}</h2>
                                    <h4 style={{padding:'15px 0'}}>{notification.Message}</h4>
                                    <ul>
                                        {Array.isArray(notification.Link) ? notification.Link.map((l,i)=>{
                                            return(<li key={i}><h4 style={{textAlign: 'left'}}><a href={l}>{l}</a></h4></li>)

                                        }) : (<li><h4 style={{textAlign: 'left'}}><a href={notification.Link}>{notification.Link}</a></h4></li>)}
                                    </ul>
                                </div>
                                <div className="small-12 close" onClick={this.closeDetailModal}>
                                    <h3>&times;</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
        }
    };
    render() {
        const { dispatch, history, app} = this.props;
        const childProps = {
            app,
            goBack: (app) => {
                dispatch(previousFilter(app))
            }
        };
        const backClick = childProps.goBack.bind(this, app);
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        Modal.setAppElement('body');
        return (
            <div className="grid-frame splash notification-menu" id="notification">
                {this.renderDialogs()}
                <div className="grid-block vertical">
                    <Step history={history} dispatch={dispatch} app={app} onClick={backClick}></Step>
                    <div className="grid-container">
                        <div className="grid-content splash-title">
                            <h2>ConMet App Notifications</h2>
                            <div className="notification-list">
                                {notifications.map((item, i) => (
                                    <div className="grid-block small-12" key={i} onClick={() => this.openDetailModal(item.Id)} style={{cursor: 'pointer'}}>
                                        <div className="note-arrow"> </div>
                                        <div className="note-list text-left">
                                            <h4 style={{fontWeight: item.seen ? 'initial' : 'bold'}}>{item.Title}</h4>
                                        </div>

                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
