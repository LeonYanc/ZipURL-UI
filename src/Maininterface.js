import { useEffect, useState } from "react";
import {Search, NavBar} from "./UI"

const initaddress = "http://zipurl.com/";
const URLMethods = ["BASE64", "BASE62", "MD5"];

function InitWelcome(){
    return (
        <h2>
        Use our URL shortener to engage your audience and connect them to the right information. Build, edit, and track everything inside the ZipURL interface.
        <br></br>
        Start by creating your first shortened link!
        </h2>
    )
}
function WelcomeList({linkslist}){
    return (
        <>
            <h2><br />Your Links:<br /></h2>

            <ul className="list">
                {linkslist.map((link) => (
                <li key={link[0]}>
                    {//<img src={movie.Poster} alt={`${movie.Title} poster`} />
                    }
                    <h3><br />{link[1]}</h3>
                    <div>
                    <p>
                        <span>ZipURL🗒️:  </span>
                        <span>{`${initaddress}${link[2]}`}</span>
                    </p>
                    <p>
                        <span>URL:  </span>
                        <span>{link[0]}</span>
                    </p>
                    <p>
                        <span>Type: </span>
                        <span>{URLMethods[link[3]]}</span>
                    </p>
                    </div>
                </li>
                ))}
            </ul>

        </>
    )
}
function Welcome({form, setnewlink, linkslist}){
    const emptylist = linkslist.length === 0;
    return (
        <div className="main-body">
        <h1>Welcome{(emptylist)? "" : " Back"}! {form[0]}</h1>
        {emptylist && <InitWelcome />}
        {!emptylist && <WelcomeList linkslist={linkslist} />}
        <h2>&nbsp;</h2>
        <button className="navbar-btn" onClick={() => setnewlink(true)}>
                New Shortened Link
        </button>
        </div>
    )
}

function NewLink({setnewlink, r, linkslist, setLinkslist, test}){
    const [link, setLink] = useState("");
    const [URLMethod, setURLMethod] = useState(0);
    const APIu = "localhost:8080/api/urls/";
    const tmpshtURL = ["Ksehr", "3v8GnO", "3v8GnOQ3v8GnOQefawefwe"];
    const [rr, setrr] = useState("");
    const [err, setErr] = useState(false);
    function handleSubmit(e){
        e.preventDefault();
        if (!link) return;
        //setForm([username, "reset"]);
        if (test) {
            setLinkslist([...linkslist, [link, "Titlawefwefe", tmpshtURL[URLMethod], URLMethod]]);
            setnewlink(false);
            console.log(linkslist);
        } else {
            const API2 = URLMethods[URLMethod].toLowerCase();
            const API = `${APIu}${API2}`
            console.log(API);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${r}`},
                body: {LongURL: link}
            };
            fetch({API}, requestOptions)
                .then(response => response.json())
                .then(data => setrr(data));
            if (rr.shortURL) {
                setLinkslist([...linkslist, [link, rr.Title, rr.shortURL.slice(18), URLMethod]])
            } else setErr(true);
        }
      }
    return (
        <form className="main-body" onSubmit={handleSubmit}>
        <h1>Create New</h1>
        <h2>
        <br></br>
        Customise your destination:
        <br></br>
        </h2>
        <Search query={link} setQuery={setLink} placeholder="Destination Link"/>
        <h2><br></br>
        Set URL encode method:</h2>
        <select value = {URLMethod} onChange={(e)=>setURLMethod(Number(e.target.value))}>
        {Array.from({length: 3}, (_, i) => i).map
        ((num) => (
            <option value={num} key={num}>
                {URLMethods[num]}
            </option>
        ) )}
        </select>
        <h3>{err ? "Something went wrong, please try again later" : ""} &nbsp;</h3>
        <div className="nav-bar-grid2">
        <button className="navbar-btn">
                Generate Shortened Link
        </button>
        <button className="navbar-btn" onClick={() => setnewlink(false)}>
                Cancel
        </button>
        </div>
        </form>
    )
}

export default function Maininterface({form, setPage, r, test}){
    const [newlink, setnewlink] = useState(false);
    const [linkslist, setLinkslist] = useState([]);
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
        {//!newlink && Welcome(form, setnewlink)
        }
        {//newlink && NewLink(setnewlink)
        }
        {!newlink && <Welcome form={form} setnewlink={setnewlink} linkslist={linkslist}/>}
        {newlink && <NewLink setnewlink={setnewlink} r={r} linkslist={linkslist} setLinkslist={setLinkslist} test={test}/>}
        </>
    )
}