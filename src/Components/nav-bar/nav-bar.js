import React, { Children, useState } from "react";
import "C:/Users/Client/Desktop/crud-estimaciones/src/Components/nav-bar/nav-bar.css"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import CustomLink from "../CustomLink";

function NavBar() {
    

    return(
        <nav className="nav">
            <Link to="/" className="site-title">
                Site Name
            </Link>
            <ul>
                <CustomLink to="/obras">Obras</CustomLink>
                <CustomLink to="/casas">Casas</CustomLink>
                <CustomLink to="/captura">Captura</CustomLink>
            </ul>
        </nav>
    )
}

export default NavBar;