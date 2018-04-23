import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { pages } from '../../build/pages.scss';
import MapComp from './MapComp';



const Modal = ({ e, eId = "", modalId, currentId = 0, data = "no data",
  onClick = f => f, closeModal, show, formatTime, formatLocation, formatSessions, formatDay }) => {
  // console.log("e", e, "eId:",eId = "", "modalId", modalId, "currentId", currentId= 0, 
  // "data", data = "no data" , "onClick", onClick = f => f, "closeModal", closeModal, "show", show, "formatTime", formatTime, 
  // "formatLocation", formatLocation, "formatSessions", formatSessions, "formatDay", formatDay);
  if (!show) {
    return null;
  }

  return <div className="backDrop" >
    <div className="modalStyle" onClick={() => closeModal()} >

      <table className="modalTable">
        <tbody>
          <tr>
            <th colSpan="2">Vitamin D </th>
          </tr>

          <tr>
            <td>
              <p className="bold">
                Event detail
            </p>
              <p className="bold"> Date & TIme
            </p>
              <p >
                {(e.event_start) ? formatDay((new Date(parseInt(e.event_start, 10)))) : formatTime(null)}<br />
                {(e.event_start) ? formatTime((new Date(parseInt(e.event_start, 10)))) : formatTime(null)}
                - {(e.event_end) ? formatTime((new Date(parseInt(e.event_end, 10)))) : formatTime(null)}
              </p>
              <p className="bold"> Location
            </p>
              <p>
                {(e.venue) ? formatLocation(e.venue).name : "TBA"}<br />
                {(e.venue) ? formatLocation(e.venue).address : "TBA"}<br />
                {(e.venue) ? formatLocation(e.venue).city : "TBA"}<br />
                {(e.venue) ? formatLocation(e.venue).region : "TBA"}<br />
                {(e.venue) ? formatLocation(e.venue).postalCode : "TBA"}<br />
                {(e.venue) ? formatLocation(e.venue).country !== "United States" ? formatLocation(e.venue).country : "" : "country TBA"}
              </p>
            </td>
            <td>GoogleMaps<MapComp />  
             
            </td>
          </tr>

            <tr>
              <td colSpan="2">
                <p className="bold"> Description
            </p>
                <p>
                  {eId.description}
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p className="bold"> Session({eId.sessions.length})
             </p>
              </td>
            </tr>
            {formatSessions(eId.sessions)}

        </tbody>
      </table>

    </div>
    </div>
    }
    
    export default Modal;
    
// export default class Modal extends Component{
//   constructor(props){
//   super(props);

//   this.state = {
//     data: " data",
//     key: props.event,
//     e :props.event,
//     modalId: props.modalId,
//     currentId: props.currentId|| 0,
//     onClick:props.onClick,
//     show: props.show
//     }

//     this.setModalData = this.setModalData.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }

//   componentDidMmount(prevS, newState){
//     console.log("prevS:",prevS," newState:", newState  );
//     this.setState({show:true});

//   }
//   setModalData(modalId){
//     this.props.onClick(modalId);
//     this.setState({modalId:modalId});

//   }

//   closeModal(){
//     alert("close modal");
//     this.setState({show:false});
//   }
//   render(){
//     let {e ,modalId, currentId, onClick } = this.props;
//     if( !this.show){
//       return null;
//     }
//     return(
//     <div className="backDrop" >  
//       <div className={"modalStyle"} onClick={()=> this.setModalData(modalId) }>

//         { "e "+e }
//         { " modalId "+modalId}
//         { " currentId, "+ currentId}
//         { " onClick "+onClick }

//         {console.log("props",this.props)}

//         Modal {e}

//       {/* //find a way to display the data in case there is no data */}
//       <button  onClick={()=>this.closeModal() } > close </ button>
//       </div> 
//      </div>  
//     )
//   }

// }
