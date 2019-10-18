import React, { PropTypes, Component } from 'react';
import Step from 'components/hub-selection/step';
import { previousFilter } from 'actions/filters';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {pushPath} from 'redux-simple-router';
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModel: false,
            openDetailModal: false,
        };
        this.closeDetailModal = this.closeDetailModal.bind(this);
    };

    openDetailModal (id) {
        const{dispatch} = this.props;
        dispatch(pushPath('/hub-selection/notification-detail/' + id));
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        const index = notifications.findIndex(a => a.Id === id);
        if(index > -1){
            notifications[index] = { ...notifications[index], seen: true};
        }
        localStorage.setItem('notifications', JSON.stringify(notifications));
        let unseen = notifications.filter(a => a.seen === false || !a.seen);
        localStorage.setItem('unseenNotificationsCount', JSON.stringify(unseen ? unseen.length : notifications.length));
    }

    closeDetailModal() {
        this.setState({openNotesModal: false, openModel: true});
    }

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

export default connect()(Notification)
