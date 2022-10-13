import {Link} from 'react-router-dom'
function Menu() {
    return(
        <div className="row">
  <div className="col-lg-12 col-md-12 col-sm-12">
    <nav>
      <div id="menu" className="collapse navbar-collapse">
        <ul>
          <li className="menu-item"><Link to="/Category">iPhone</Link></li>
          <li className="menu-item"><Link to="/Category">Samsung</Link></li>
          <li className="menu-item"><Link to="/Category">HTC</Link></li>
          <li className="menu-item"><Link to="/Category">Nokia</Link></li>
          <li className="menu-item"><Link to="/Category">Sony</Link></li>
          <li className="menu-item"><Link to="/Category">Blackberry</Link></li>
        </ul>
      </div>
    </nav>
  </div>
</div>

    )
}
export default Menu;