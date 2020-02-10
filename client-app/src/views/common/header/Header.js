import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Header = () => {
    const [collapse, setCollapse] = useState(false)
    return(
        <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
            <a className={"navbar-brand"} href="#">EQ Works Challenge</a>
            <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon"}></span>
            </button>

            <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                <ul className={"navbar-nav mr-auto"}>
                    <NavLink to="/chart" className={"nav-item nav-link"} activeClassName="active">Chart</NavLink>
                    <NavLink to="/table" className={"nav-item nav-link"} activeClassName="active">Table</NavLink>
                    <NavLink to="/geo" className={"nav-item nav-link"} activeClassName="active">Map</NavLink>
                </ul>
            </div>
        </nav>
    )
}

export default Header;