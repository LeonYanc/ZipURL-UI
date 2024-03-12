import { useEffect, useState } from "react";

export function Logo(){
    return (<div className="logo2">
    <span role="img">🗒️</span>
    <h1>ZipURL</h1>
  </div>)
  }

export function Search({query, setQuery, placeholder="", type="text"}){
    return(
    <input
            className="search2"
            type={type}
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
   )
  }

export function NavBar({children}){

return (
    <nav className="nav-bar">
        <Logo />
        
        {children}
    </nav>
)
}