import React, {PropTypes, Component} from 'react';
import {pushPath} from 'redux-simple-router';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Carousel from 'nuka-carousel';
import {
    unifiedSearch,
    fetchHubAssemblyFilters,
    fetchHubAssemblyFiltersWithNoResults, saveBrakeRotorNumber, fetchNotificationResult
} from 'actions';
import Autocomplete from 'react-autocomplete';

class Start extends Component {
    constructor(props) {
        super(props);
        this.doSearch = this.doSearch.bind(this);

        this.state = {
            value: '',
            partNumber: [],
            loading: false,
            url: '',
            openModel: false,
            openDetailModal: false,
            notificationId: null,
            data: null,
            currentIndex:0,
            closeModal: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
    }
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  };

    componentWillMount(){
        // localStorage.removeItem('notifications');
        // localStorage.removeItem('unseenNotificationsCount');
        const {dispatch} = this.props;
        dispatch(fetchNotificationResult());
        Modal.setAppElement('body');
    }

    componentDidMount() {
        const {results} = this.props;
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        if(notifications && notifications.length){
            let notIgnore = notifications.filter(a => !a.ignore || a.ignore < 3);
            let data = notIgnore && notIgnore.length ? notIgnore : results.notifications;
            if(data && data.length){
                let notification = data.find(a => a.Id === data[0].Id);
                let index = notifications.findIndex(item => item.Id === notification.Id);
                if(index > -1){
                    notifications[index] = {...notifications[index], ignore: (notifications[index].ignore ? notifications[index].ignore : 0 ) + (notifications[index].ignore < 3 ? 1 : 0)}
                }
                localStorage.setItem('notifications', JSON.stringify(notifications));
            }
        }
    }

    componentWillReceiveProps(newProps) {
        const { results, app } = newProps;
        const { closeModal } = this.state;
        if(results.notifications && results.notifications.length && !app.goingBack && !closeModal ){
            this.setState({openModel: true});
        }
    }

    closeModal() {
        this.setState({openModel: false, closeModal: true});
        sessionStorage.setItem('ignoreNotifications', JSON.stringify(true));
    }

    closeDetailModal() {
        this.setState({openDetailModal: false, openModel: true});
        let count = JSON.parse(localStorage.getItem('unseenNotificationsCount'));
        if(count === this.state.currentIndex){
            this.closeModal();
        }
    }

    openDetailModal (id) {
        const{dispatch} = this.props;
        dispatch(pushPath('/hub-selection/notification-detail/' + id));
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        this.setState({openModel: false});
        const index = notifications.findIndex(a => a.Id === id);
        if(index > -1){
            notifications[index] = { ...notifications[index], seen: true};
        }
        localStorage.setItem('notifications', JSON.stringify(notifications));
        let unseen = notifications.filter(a => a.seen === false || !a.seen);
        localStorage.setItem('unseenNotificationsCount', JSON.stringify(unseen ? unseen.length : notifications.length));
    }

    onNextAction (nextSlide, slidesToShow, currentSlide, slideCount, data) {
        if(slidesToShow + currentSlide >= slideCount){
            this.closeModal();
        }
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        let notification = data.find(a => a.Id === data[currentSlide].Id);
        let index = notifications.findIndex(item => item.Id === notification.Id);
        if(index > -1){
            notifications[index] = {...notifications[index], ignore: (notifications[index].ignore ? notifications[index].ignore  : 0) + 1 };
        }
        localStorage.setItem('notifications', JSON.stringify(notifications));
        nextSlide();
    }

    notificationDialogs() {
        const {results} = this.props;
        const { openModel, currentIndex } = this.state;
        let notes = JSON.parse(localStorage.getItem('notifications'));
        let seenIgnore = notes.filter(a => a.seen === true || a.ignore > 2);
        let unseen = notes.filter(a => a.seen === false || !a.seen);
        let notesWithoutSeenIgnore = notes.filter(item => !seenIgnore.includes(item));
        localStorage.setItem('unseenNotificationsCount', unseen ? unseen.length : notes.length);
        let data = notesWithoutSeenIgnore && notesWithoutSeenIgnore.length ? notesWithoutSeenIgnore : results.notifications;
        let ignoreNotes = JSON.parse(sessionStorage.getItem("ignoreNotifications"));
        if(openModel && seenIgnore.length < results.notifications.length && !ignoreNotes){
            return (
                <Modal
                    isOpen={openModel}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}
                    className="notification-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <div>
                        <div className="modal-content">
                            <div className="notification-slider">
                                <Carousel
                                    slideIndex={currentIndex}
                                    renderBottomCenterControls={null}
                                    renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                                        data.length > 1 ?
                                        <button
                                            onClick={previousSlide}
                                            className={`slick-arrow slick-prev ${currentSlide > 0 ? '' : 'disabled'}`}
                                        /> : null
                                    )}
                                    renderCenterRightControls={({ nextSlide, slidesToShow, currentSlide, slideCount }) => (
                                        data.length > 1 ?
                                        <button
                                            onClick={() => this.onNextAction(nextSlide, slidesToShow, currentSlide, slideCount, data )}
                                            className={`slick-arrow slick-next ${slidesToShow + currentSlide < slideCount ? '' : 'disabled'}`}
                                        /> : null
                                    )}
                                    afterSlide={index => this.setState({ currentIndex: index })}
                                >
                                    {data.map((d,i) => (
                                        <div key={i} className="note">
                                            <h2 className="text-center">{d.Title}</h2>
                                            <div className="btn-no-description conmet-button">
                                                <button onClick={() => this.openDetailModal(d.Id)}>
                                                    <h4>LEARN MORE</h4>
                                                </button>
                                            </div>
                                            <div className="btn-no-description conmet-button">
                                                <button onClick={this.closeModal}>
                                                    <h4>LATER</h4>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
        }
    };

  handleClick(path) {
    const {dispatch} = this.props;
    dispatch(pushPath(path));
  }

    doSearch(e){
        e.preventDefault();
        this.hubAssemblyFilters(this.state.partNumber);
    }

    hubAssemblyFilters(data){
        if(data.PartTypeId === 115){
            this.getResult(data.CompetitorInterchangesId);
        }else if(data.PartTypeId === 5){
            this.props.dispatch(pushPath('/hub-selection/stud/filters/sdnum?inclv=1&sdnum='+data.CompetitorPartNumber));
        }else if(data.PartTypeId === 23){
            this.props.dispatch(pushPath('/hub-selection/replacement-drum/recommended-drums/'+data.CompetitorInterchangesId));
        }else if(data.PartTypeId === 203){
            this.props.dispatch(saveBrakeRotorNumber(data.CompetitorPartNumber));
            setTimeout(() => {
                this.props.dispatch(pushPath('/hub-selection/replacement-rotor/recommended-rotors/'+data.CompetitorInterchangesId));
            }, 100);
        }else{
            if(this.state.partNumber.length === 1){
                this.getResult(this.state.partNumber[0].CompetitorInterchangesId);
            }else if((this.state.value !== "") && (this.state.partNumber.length === 0) && !this.state.loading){
                this.props.dispatch(pushPath('/hub-selection/no-results'));
            }
        }
    }

    getResult(id){
        const { dispatch } = this.props;
        let url = '';
        dispatch(fetchHubAssemblyFilters(id)).then(()=>{
            let filters = this.props.results.filters.Results;
            let CompetitorPartNumber = this.state.partNumber[0].CompetitorPartNumber;
            if(filters === undefined){
                dispatch(fetchHubAssemblyFiltersWithNoResults(id)).then(()=>{
                    this.props.dispatch(pushPath('/hub-selection/not-available/' + CompetitorPartNumber))
                })
            }else{
                let i = 1, length = Object.keys(filters).length;

                Object.keys(filters).forEach((key)=>{
                    url += (i === length) ? key+'='+filters[key] : key+'='+filters[key]+"&";
                    i++;
                });
                this.props.dispatch(pushPath('/hub-selection/filters/'+url));
            }

        });
    }

  render() {
      let notes = JSON.parse(localStorage.getItem('notifications'));
    return (
      <div className="grid-container main-content">
          {notes ? this.notificationDialogs() : null}
        <h2>What are you looking for?</h2>
          {/*<form id="autoComplete">*/}
              {/*<Autocomplete*/}
                  {/*value={this.state.value}*/}
                  {/*inputProps={{ placeholder: 'Please enter a valid ConMet or Competitor part number',className: 'assembly-number', id:'assemblyNumber',type:'text' }}*/}
                  {/*wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}*/}
                  {/*items={this.state.partNumber}*/}
                  {/*getItemValue={(item) => item.CompetitorName+' '+item.CompetitorPartNumber}*/}
                  {/*onSelect={(value, state) => {*/}
                      {/*this.props.results.selectedHubAssemblyNumber = state.CompetitorName+' '+state.CompetitorPartNumber;*/}
                      {/*this.hubAssemblyFilters(state);*/}
                      {/*this.setState({ value, partNumber: [state] })*/}
                  {/*}}*/}
                  {/*onChange={(event, value) => {*/}
                      {/*this.setState({value, partNumber : [], loading: true });*/}
                      {/*if(value !== ''){*/}
                          {/*this.props.dispatch(unifiedSearch(value)).then(() => {*/}
                              {/*let results = this.props.results.partNumber.Results;*/}
                              {/*if(results){*/}
                                  {/*this.setState({ partNumber: this.props.results.partNumber.Results, loading: false });*/}
                              {/*}else{*/}
                                  {/*this.setState({ partNumber: [], loading: false });*/}
                              {/*}*/}
                          {/*});*/}
                      {/*}*/}
                  {/*}}*/}
                  {/*renderItem={(item, isHighlighted) =>*/}
                      {/*<div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorInterchangesId}>*/}
                          {/*{item.CompetitorName}  {item.CompetitorPartNumber}*/}
                      {/*</div>*/}
                  {/*}*/}
                  {/*renderMenu={(items, value) => (*/}
                      {/*<div className="menu">*/}
                          {/*{value === '' ? (*/}
                              {/*<div className="item">Type ConMet or Competitor assembly number</div>*/}
                          {/*) : this.state.loading ? (*/}
                              {/*<div className="item">Loading...</div>*/}
                          {/*) : items.length === 0 ? (*/}
                              {/*<div className="item">No matches for {value}</div>*/}
                          {/*) : items}*/}
                      {/*</div>*/}
                  {/*)}*/}
              {/*/>*/}
              {/*<div className="help">Some examples: “104444”, “ConMet 10031065”, “Gunite 5669‑1”, “Webb 20231‑‑1T‑71”</div>*/}
              {/*<div className="btn-no-description conmet-button">*/}
                  {/*<button type="submit" onClick={this.doSearch}><h2 style={{textAlign: 'center'}}>Continue</h2></button>*/}
              {/*</div>*/}
          {/*</form>*/}
          {/*<hr/>*/}
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/choose-path')} store={this.context.store}>
            <h2>HUBS <i className="icon-angle-right" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/parts/choose-path')} store={this.context.store}>
            <h2>HUB COMPONENTS <i className="icon-angle-right" title="Right Arrow" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/replacement-drum')} store={this.context.store}>
            <h2>BRAKE DRUMS <i className="icon-angle-right" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/replacement-rotor')} store={this.context.store}>
            <h2>BRAKE ROTORS <i className="icon-angle-right" title="Right Arrow" /></h2>
          </button>
        </div>
        {/*<div className="btn-no-description conmet-button">*/}
          {/*<button onClick={this.handleClick.bind(this, '/hub-selection/stud/filter')} store={this.context.store}>*/}
            {/*<h2>STUD SEARCH <i className="icon-angle-right" title="Right Arrow" /></h2>*/}
          {/*</button>*/}
        {/*</div>*/}
        <p className="terms-and-conditions">In using this application you are acknowledging that you have read and understand ConMet's <a href={`${window.location.origin}/ConMet-Terms-And-Conditions.pdf`}>terms and conditions</a></p>
      </div>
    )
  }
}

export default connect()(Start)
