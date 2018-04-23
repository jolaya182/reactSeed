import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import styles from '../../build/menus.scss'

const selectedStyle = {
  backgroundColor: "white",
  color: "slategray"
}
const nSelectedStyle = {
  backgroundColor: "slategray",
  color: "ghostwhite"
}

export const MainMenu = () =>
  <nav className="mainMenu">
    <NavLink to="/">[Home]</NavLink>
    <NavLink to="/about" activeStyle={selectedStyle}>[About]</NavLink>
    <NavLink to="/events" activeStyle={selectedStyle}>[Events]</NavLink>
    <NavLink to="/products" activeStyle={selectedStyle}>[Products]</NavLink>
    <NavLink to="/contact" activeStyle={selectedStyle}>[Contact Us]</NavLink>
  </nav>

export const AboutMenu = ({ match }) => <div className="aboutMenu">
  <li>
    <NavLink to="/about"   style={match.isExact && selectedStyle? selectedStyle : nSelectedStyle}>
      [Company]
    </NavLink>
  </li>
  <li>
    <NavLink to="/about/history" activeStyle={selectedStyle}>
      [History]
    </NavLink>
  </li>
  <li>
    <NavLink to="/about/services" activeStyle={selectedStyle}>
      [Services]
    </NavLink>
  </li>
  <li>
    <NavLink to="/about/location" activeStyle={selectedStyle}>
      [Location]
    </NavLink>
  </li>
</div>

// export default class MainMenu extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       colors : ["red", "blue"]
//     }
//   }
//   render(){
//     return(
//       <div>
//         template for me
//       </div>
//     )
//   }
// }

// const PageTemplate = () => {
//   return (
//     <div>
//       <p>PageTemplate!!!!!</p>
//     </div>
//   );
// };

// export default PageTemplate;
