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
            // openModel: false,
            // openDetailModal: false,
            // notificationId: null,
            // data: null,
            // currentIndex:0,
            // closeModal: false
        };

        // this.closeModal = this.closeModal.bind(this);
        // this.closeDetailModal = this.closeDetailModal.bind(this);
    }
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  };

    // componentWillMount(){
    //     const {dispatch} = this.props;
    //     dispatch(fetchNotificationResult());
    //     Modal.setAppElement('body');
    // }
    // componentDidMount() {
    //     const {results} = this.props;
    //     let notifications = JSON.parse(localStorage.getItem('notifications'));
    //     let notIgnore = notifications.filter(a => !a.ignore || a.ignore < 3);
    //     let data = notIgnore && notIgnore.length ? notIgnore : results.notifications;
    //     if(data && data.length){
    //         let notification = data.find(a => a.Id === data[0].Id);
    //         let index = notifications.findIndex(item => item.Id === notification.Id);
    //         if(index > -1){
    //             notifications[index] = {...notifications[index], ignore: (notifications[index].ignore ? notifications[index].ignore : 0 ) + 1}
    //         }
    //         localStorage.setItem('notifications', JSON.stringify(notifications));
    //     }
    //     // const {dispatch} = this.props;
    //     // dispatch(fetchNotificationResult());
    //     // Modal.setAppElement('body');
    // }

    // componentWillReceiveProps(newProps) {
    //     const { results, app } = newProps;
    //     const { closeModal } = this.state;
    //     if(results.notifications && results.notifications.length && !app.goingBack && !closeModal ){
    //         // localStorage.setItem('notifications', JSON.stringify(results.notifications));
    //         this.setState({openModel: true});
    //     }
    // }
    //
    // closeModal() {
    //     this.setState({openModel: false, closeModal: true});
    // }
    //
    // closeDetailModal() {
    //     this.setState({openDetailModal: false, openModel: true});
    // }

    // openDetailModal (id) {
    //     let notifications = JSON.parse(localStorage.getItem('notifications'));
    //     this.setState({openModel: false, openDetailModal: true, notificationId: id});
    //     const index = notifications.findIndex(a => a.Id === id);
    //     if(index > -1){
    //         notifications[index] = { ...notifications[index], seen: true};
    //     }
    //     localStorage.setItem('notifications', JSON.stringify(notifications));
    // }
    //
    // onNextAction (nextSlide, slidesToShow, currentSlide, slideCount, data) {
    //     console.log(nextSlide, slidesToShow, currentSlide, slideCount, data)
    //     if(slidesToShow + currentSlide >= slideCount){
    //         this.closeModal();
    //     }
    //     let notifications = JSON.parse(localStorage.getItem('notifications'));
    //     let notification = data.find(a => a.Id === data[currentSlide].Id);
    //     let index = notifications.findIndex(item => item.Id === notification.Id);
    //     if(index > -1){
    //         notifications[index] = {...notifications[index], ignore: (notifications[index].ignore ? notifications[index].ignore  : 0) + 1 };
    //     }
    //     localStorage.setItem('notifications', JSON.stringify(notifications));
    //     nextSlide();
    // }

    // notificationDialogs() {
    //     const {results} = this.props;
    //     const { openModel, currentIndex, openDetailModal, notificationId, closeModal } = this.state;
    //     let notes = JSON.parse(localStorage.getItem('notifications'));
    //     let seen = notes.filter(a => a.seen === true || a.ignore > 2);
    //     let notesWithoutSeen = notes.filter(item => !seen.includes(item));
    //     localStorage.setItem('seenNotificationsCount', seen.length);
    //     let data = notesWithoutSeen && notesWithoutSeen.length ? notesWithoutSeen : results.notifications;
    //     if(openModel && seen.length < results.notifications.length){
    //         return (
    //             <Modal
    //                 isOpen={openModel}
    //                 onRequestClose={this.closeModal}
    //                 shouldCloseOnOverlayClick={false}
    //                 className="notification-modal"
    //                 aria-labelledby="contained-modal-title-vcenter"
    //                 centered
    //             >
    //                 <div>
    //                     <div className="modal-content">
    //                         <div className="notification-slider">
    //                             <Carousel
    //                                 slideIndex={currentIndex}
    //                                 renderBottomCenterControls={null}
    //                                 renderCenterLeftControls={({ previousSlide, currentSlide }) => (
    //                                     <button
    //                                         onClick={previousSlide}
    //                                         className={`slick-arrow slick-prev ${currentSlide > 0 ? '' : 'disabled'}`}
    //                                     />
    //                                 )}
    //                                 renderCenterRightControls={({ nextSlide, slidesToShow, currentSlide, slideCount }) => (
    //                                     <button
    //                                         onClick={() => this.onNextAction(nextSlide, slidesToShow, currentSlide, slideCount, data )}
    //                                         className={`slick-arrow slick-next`}
    //                                     />
    //                                 )}
    //                                 afterSlide={index => this.setState({ currentIndex: index })}
    //                             >
    //                                 {data.map((d,i) => (
    //                                     <div key={i} className="note">
    //                                         <h2 className="text-center">{d.Title}</h2>
    //                                         <div className="btn-no-description conmet-button">
    //                                             <button onClick={() => this.openDetailModal(d.Id)}>
    //                                                 <h4>LEARN MORE</h4>
    //                                             </button>
    //                                         </div>
    //                                         <div className="btn-no-description conmet-button">
    //                                             <button onClick={this.closeModal}>
    //                                                 <h4>LATER</h4>
    //                                             </button>
    //                                         </div>
    //                                     </div>
    //                                 ))}
    //                             </Carousel>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Modal>
    //         )
    //     }
    //     if(openDetailModal) {
    //         let notification = results.notifications.find(n => n.Id === notificationId);
    //         return (
    //             <Modal
    //                 isOpen={openDetailModal}
    //                 onRequestClose={this.closeDetailModal}
    //                 shouldCloseOnOverlayClick={false}
    //                 className="notification-modal notification-detail"
    //             >
    //                 <div>
    //                     <div className="modal-content ">
    //                         <div className="grid-block small-12">
    //                             <div className="text-center">
    //                                 <h2>{notification.Title}</h2>
    //                             </div>
    //                             <div className="text-right" onClick={this.closeDetailModal}>
    //                                 <h3 style={{cursor: 'pointer', marginTop:'-15px'}}>&times;</h3>
    //                             </div>
    //                         </div>
    //                         <h4>{notification.Message}</h4>
    //                         {notification.Link.map((l,i)=>{
    //                             return(<h4 key={i}><li style={{textAlign: 'left', paddingLeft: '10%'}}>{l}</li></h4>)
    //
    //                         })}
    //                     </div>
    //                 </div>
    //             </Modal>
    //         )
    //     }
    // };

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
    return (
      <div className="grid-container main-content">
          {/*{this.notificationDialogs()}*/}
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
        <p className="terms-and-conditions">In using this application you are acknowledging that you have read and understand ConMet's <a href='/ConMet-Terms-And-Conditions.pdf' target='_blank'>terms and conditions</a></p>
      </div>
    )
  }
}

export default connect()(Start)
