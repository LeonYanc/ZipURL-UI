import { useEffect, useState } from "react";
import {Logo, Search, NavBar} from "./UI"

export default function Maininterface({form, setPage}){
    return (
        <>
        <NavBar>
          <div>&nbsp;</div>
          <nav className="nav-bar-grid">
          <button className="navbar-btn-link" onClick={() => setPage(1)}>
                {form[0]}
            </button>
            <button className="navbar-btn" onClick={() => setPage(0)}>
                Log Out
            </button>
            </nav>
        </NavBar>
        <div className="main-body">
        <h1>Welcome Back! {form[0]}</h1>
        <h2>
        Use our URL shortener to engage your audience and connect them to the right information. Build, edit, and track everything inside the ZipURL interface.
        <br></br>
        Start by creating your first shortened link!
        </h2>
        <button className="navbar-btn" onClick={() => setPage(2)}>
                New Shortened Link
        </button>
        </div>
        </>
    )
}