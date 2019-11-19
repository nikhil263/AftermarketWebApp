import React, { PropTypes, Component } from 'react';
export default class NotificationDetail extends Component {
    render() {
        const { params} = this.props;
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        let notification = notifications.find(n => n.Id === parseInt(params.id,10));
        return (
            <div className="note-detail">
                <h2>{notification.Title}</h2>
                <h4 dangerouslySetInnerHTML={{__html: notification.Message}} />
                <ul>
                    {Array.isArray(notification.Link) ? notification.Link.map((l,i)=>{
                        return(<li key={i}><h4><a href={l}>{l}</a></h4></li>)

                    }) : (<li><h4 style={{paddingTop:0}}><a href={notification.Link}>{notification.Link}</a></h4></li>)}
                </ul>
            </div>
        )
    }
};
