import React, { Component } from "react";
import { Route, link } from "react-router-dom";
import Modal from "./Modal"
import {pages} from '../../build/pages.scss'




export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n:"",
      events: ["nothing"],
      pageNumbers: [1, 2, 3],
      eventsLength: 0,
      pageSize: 3,
      currentPage: 1,
      totalPages: 1,
      currentEventSelected: "",
      currentId: "",
      months:["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ]
    }
    this.getEvents = this.getEvents.bind(this);
    this.getEventById = this.getEventById.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.getPaginationSetUp = this.getPaginationSetUp.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatLocation = this.formatLocation.bind(this);
    this.formatSessions = this.formatSessions.bind(this);
    this.formatDay = this.formatDay.bind(this);

  }

  //8 blocks 9:53
  //17 blocks 10:40
  getEvents() {
    // let o = {'page':2}
    let gEvents = (resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:3000/events");
      xhr.onload = function () {

        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    };


    let p = new Promise(gEvents);
    let t = this;
    p.then(
      (data) => {
        data = JSON.parse(data)
        // console.log("data: ", data);
        let e = data;
        // console.log("events:", e.events);

        let currentPage = 1;
        let pageSize = this.state.pageSize;
        let eventsLength = e.total;
        let totalEventsPerPage = Math.ceil(eventsLength / pageSize);
        let startP, endP;
        if (totalEventsPerPage <= 10) {
          startP = 1;
          endP = totalEventsPerPage;
        }
        else {
          if (currentPage <= 6) {
            startP = 1;
            endP = 10;
          } else if (currentPage + 4 >= totalEventsPerPage) {
            startP = totalEventsPerPage - 9;
            endP = endP;
          } else {
            startP = currentPage - 5;
            endP = currentPage + 4;
          }
        }
        let newPageNumbers = [];
        for (let i = startP; i <= endP; i += 1) {
          newPageNumbers.push(i);
        }
        // console.log("newArrayOfEvents:", newArrayOfEvents);

        t.setState({ events: e.events, eventsLength: e.total, pageNumbers: newPageNumbers, totalPages: newPageNumbers.length });
      }
    ).catch((err) => {
      console.log("err: ", err);
    });
    // let done = (err, data)=>{
    //   if(err){throw err}
    //   console.log("data received: ", data);
    // }
    // console.log("getting events");
    // let xhtp = new XMLHttpRequest();
    // xhtp.open("GET", "http://localhost:8080/");
    // xhtp.onload = ()=>{
    //   done(null, xhtp.repsonse);
    // };
    // xhtp.onerror = ()=>{
    //   done(xhtp.repsonse);

    // }
    // xhtp.send();


  }

  getEventById(id) {
    // let id=10;
    // update this.state.currentId after a successfull 
    // request , do in in the successfull  part of the promise  
    
    // console.log("id:",id);
    //get event by sending id
    //use same get events code
    let gEvents = (resolve, reject) => {
      let xhr = new XMLHttpRequest();
      // xhr.setRequestHeader("Content-Type", "application/json");

      // xhr.open("POST", "http://localhost:3000/events");
      xhr.open("GET", "http://localhost:3000/events/" + id, true);
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      // xhr.setRequestHeader("Content-Type", "application/json");
      // xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);

        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
        console.log(this);
      };

      xhr.send();
    };
    let t = this;
    let p = new Promise(gEvents);
    p.then((data) => {
      data = JSON.parse(data)
      // console.log("data: ", data);
      let e = data;
      // console.log("events by id:", e.event);
      t.setState({ currentEventSelected: e.event, currentId: id });
      // t.setState({ events: e.events, eventsLength: e.total  } );
    }).catch((err) => {
      console.log("err: ", err);
    });
  }

  onChangePage(pageNumber) {
    let totalPages = this.state.totalPages;
    // console.log("pageNumber ", pageNumber, " totalPages ", totalPages)
    if (pageNumber > totalPages || pageNumber < 1)
      return;

    this.setPage(pageNumber);
  }
  //div#wrapperCategory > div > div:nth-of-type(3)
  setPage(currentPage) {
    let gEvents = (resolve, reject) => {
      // let o = {"page": pageNumber}
      let o = "page=" + currentPage
      let xhr = new XMLHttpRequest();
      // console.log(" currentPage: ", currentPage);
      // xhr.open("POST", "http://localhost:3000/events");
      xhr.open("GET", "http://localhost:3000/events?" + o);
      // xhr.setRequestHeader("Content-Type", "application/json");
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.setRequestHeader("Content-Type", "application/json");
      // xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);

        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
        console.log(this);
      };

      xhr.send();
    };
    let t = this;
    let p = new Promise(gEvents);
    p.then((data) => {
      let e = JSON.parse(data)
      // console.log("events e:", e);
      // t.setState({ events: e.events, eventsLength: e.total  } );
      const newArrayOfEvents = e.events.map((evElem, index) => {
        return index;
      });
      let { pageNumbers, eventsLength, pageSize } = this.state;
      let obj = this.getPaginationSetUp(e.total, currentPage, pageSize);
      // console.log("paginatedObject:", obj);
      let pageOfItemsIndexed = e.events.slice(obj.startIndx, obj.endIndx);
      t.setState({
        events: e.events, eventsLength: e.total, currentPage: currentPage,
        pageNumbers: obj.newPageNumbers, totalPages: obj.newPageNumbers.length
      })
    }).catch((err) => {
      console.log("err: ", err);
    });
  }

  getPaginationSetUp(eventsLength, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    let totalEventsPerPage = Math.ceil(eventsLength / pageSize);
    let startP, endP;

    if (totalEventsPerPage <= 10) {
      startP = 1;
      endP = totalEventsPerPage;
    }
    else {
      if (currentPage <= 6) {
        startP = 1;
        endP = 10;
      } else if (currentPage + 4 >= totalEventsPerPage) {
        startP = totalEventsPerPage - 9;
        endP = endP;
      } else {
        startP = currentPage - 5;
        endP = currentPage + 4;
      }
    }
    let startIndx = (currentPage - 1) * pageSize;
    let endIndx = Math.min(startIndx + pageSize - 1, eventsLength - 1);

    let newPageNumbers = [];
    for (let i = startP; i <= endP; i += 1) {
      newPageNumbers.push(i);
    }


    return {
      eventsLength: eventsLength,
      currentPage: currentPage,
      pageSize: pageSize,
      startP: startP,
      endP: endP,
      startIndx: startIndx,
      endIndx: endIndx,
      newPageNumbers: newPageNumbers
    };
  }

  closeModal() {

    this.setState({currentEventSelected:"",  currentId: "" });
  }

  formatTime(date, date2) {
    if (date === null) return "no end time";
    
    if( !date2 ){

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours < 12 ? "am" : "pm";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ":" + minutes + "" + ampm;
      return strTime;
    }else{
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours < 12 ? "am" : "pm";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ":" + minutes + "" + ampm;
      
      let hours2 = date2.getHours();
      let minutes2 = date2.getMinutes();
      let ampm2 = hours2 < 12 ? "am" : "pm";
      hours2 = hours2 % 12;
      hours2 = hours2 ? hours2 : 12;
      minutes2 = minutes2 < 10 ? '0' + minutes2 : minutes2;
      let strTime2 = "-"+hours2 + ":" + minutes2 + "" + ampm2;
      
      
      return strTime+strTime2;
    }
  }
  formatLocation(venue) {
    let name = venue.name ? venue.name : "no venue title available";
    let address = venue.address ? venue.address : "no venue address available";
    let city = venue.city ? venue.city : "no venue city available";
    let region = venue.region ? venue.region : "no venue region available";
    let postalCode = venue.postalCode ? venue.postalCode : "no venue postalCode available";
    let country = venue.country ? venue.country : "no venue country available";
    if (country === "United States") country = "";

    // return name + "\n" + address + "\n" + city + "," + region + " " + postalCode + "\n" + country;
  return {name:name,  address:address, city:city,  region:region,  postalCode:postalCode,  country:country };

  }

  formatSessions(arry) {
    if (arry.lengh < 1) return "no sessions recorded";
    const html = arry.map((elem, index) => {
      if (!elem) return null;
      // console.log(elem);
     
      return <tr key={index} className="modalTr">
        <td><p>
          {elem.title}
        </p>
        </td>
        <td className="textAlignRight">
        <p>
          {this.formatTime(new Date(elem.event_start ), new Date(elem.event_end )) }
          </p>
        
        </td>
      </tr>

    });
    return html;

  }

  formatDay(date){
    if (date === null) return "no end time";
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let str = this.state.months[month] + " "+ day + ", "+ year;
    return str;

  }

  componentWillMount() {

    console.log("componentWillMount:", this.state.eventsLength);
    //make the call to get the size of the fixture
    //store all the events in the state
    //update the eventLength variable
    this.getEvents();

  }
  componentDidMount() {
    // console.log("componentDidMount:", this.state.eventsLength);
    // console.log("componentDidMountEvents:", this.state.events);
    // console.log("state:",this.state);
    // this.setState({eventsLength:2});
    //make the call to get the size of the fixture
    //store all the events in the state
    //update the eventLength variable

  }
  componentDidUpdate() {

    console.log("ComponentDidUpdate: ", this.state.eventsLength);
    //make the call to get the size of the fixture
    //store all the events in the state
    //update the eventLength variable
    // this.setstate();
  }
  componentWillUpdate() {

    console.log("componentWillUpdate: ", this.state.eventsLength);
    //make the call to get the size of the fixture
    //store all the events in the state
    //update the eventLength variable

  }


  render() {
    const th = this;
    const state = this.state;
    const { pageNumbers, currentId, currentPage, totalPages } = this.state;
    const { events } = this.state;
    const { getEventById } = this.getEventById;
    const currentEventSelected = this.state.currentEventSelected;
    const MONTH_NAMES = this.state.months;

    if (events.length < 1)
      return;

    // console.log("currentId:", currentId, "currentEventSelected", currentEventSelected);
    return (<div >
      <div className="cssTable">
        {(events.length === 0) ? <p>no events listed</p> :
          events.map((event, index) => <div className="event" key={index * -1} onClick={(currentId ==="")? () => this.getEventById(event.id):f=>f}>
            <img className="e" src={event.image_url}  />
            
            <p className="thick"> {event.title}</p>
            <p className="thin" > {MONTH_NAMES[(new Date(parseInt(event.event_start, 10))).getMonth()]},  
            {(event.venue) ? event.venue.city : "TBA"},
              {(event.venue) ? event.venue.region : "TBA"} </p>

            <Modal key={event.id}
            //  modalId={event.id} currentId={currentId} 
            closeModal={this.closeModal}
              e={event} eId={currentEventSelected} 
            show={(currentId === event.id) ?  true  : false} 
              formatTime={this.formatTime}
              formatLocation={this.formatLocation} formatSessions={this.formatSessions}
              formatDay={this.formatDay}
              
              >
              

            </Modal>

          </div>
          )
        }
        </div>
          <div className="centerPagination">
            <div className="pagination">
              <div className={state.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => th.onChangePage(1)}>First</a>
              </div>
              <div className={state.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => th.onChangePage(state.currentPage - 1)}>Previous</a>
              </div>
              {pageNumbers.map((page, index) =>
                <div key={index} className={state.currentPage === page ? 'active' : ''}>
                  <a onClick={() => th.onChangePage(page)}>
                    {page}

                  </a>

                </div>
              )}
              <div className={state.currentPage === state.totalPages ? 'disabled' : ''}>
                <a onClick={() => th.onChangePage(state.currentPage + 1)}>Next</a>
              </div>
              <div className={state.currentPage === state.totalPages ? 'disabled' : ''}>
                <a onClick={() => th.onChangePage(state.totalPages)}>Last</a>
              </div>

            </div>
        </div>
     </div> 
    )
  }
}