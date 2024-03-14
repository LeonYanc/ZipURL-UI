import { useEffect, useState } from "react";
import Maininterface from "./Maininterface";
import {Logo, Search, NavBar} from "./UI"
//import PropTypes from "prop-types";

const tempacc = [
    ["kfzhu1229@gmail.com", "12345"],
    ["ek", "23465"]
]
//test mode: uses front end stored account and link data
const test = true;
//default page: the page the UI will land on upon launch
//0: Main; 1: Login; 2: Signup; 3: Forgot pw; 4: Main Interface
const defaultpage = 4;


function Login({isOpen, setIsOpen, form, setForm, setPage, accounts, r, setr}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [wrongpw, setWrongpw] = useState(false);
    //return token
    //const [r, setr] = useState(null);
    const API = "localhost:8080/login"
    function handleSubmit(e){
        e.preventDefault();
        if (!username) return;
        setForm([username, password]);
        //if (!noaccmatch([username, password])) setPage(4);
      }
    function noaccmatch(form){
        return (accounts.filter((u) => (u[0]===form[0] && u[1]===form[1])).length===0)
    }
    useEffect(function(){
    async function ue(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: form[0], password: form[1]})
      };
      fetch({API}, requestOptions)
          .then(response => response.json())
          .then(data => setr(data));
      console.log(JSON.stringify({email: form[0], password: form[1]}));
      if (test) {
        setWrongpw(form[0] !== "" && noaccmatch(form));
        if (!noaccmatch([username, password])) setPage(4);
      }else{ 
        setWrongpw(form[0] !== "" && r.status);
        if (r && !r.status) setPage(4);
      }
    }
    ue();
    }, [form])
    return(
    <form className="nav-bar2" onSubmit={handleSubmit}>
        <button
            className="btn-toggle2"
            onClick={() => setPage(0)}
        >
            {isOpen ? "x" : "+"}
        </button>
        <Logo />
        <h3>&nbsp;</h3>
        <Search query={username} setQuery={setUsername} placeholder="E-Mail"/>
        <Search query={password} setQuery={setPassword} placeholder="Password" type="password" />
        <button className="btn-link"
            onClick={() => setPage(3)}>Forgot Password?</button>
        <h3>{wrongpw ? "Mismatched username & password" : ""} &nbsp;</h3>
        <h3>{//accounts.filter((u) => (u[0]==form[0] && u[1]==form[1])).length
        }</h3>
        <button className="login-btn">
            Log in
        </button>
      </form>
    )
}

const specialChar = ["¬", "`", "!", "@", "£", "#", "%", "&", "-", "_", 
"=", ":", "~", "\"", "'", ";", ","]
function PWRules(password){
  console.log(specialChar.filter((c) => (password.search(c) !== -1)));
  const sp = (specialChar.filter((c) => (password.search(c) !== -1))).length !== 0;
  console.log(password.length >= 8 && sp)
  return(
    password.length >= 8 && sp
  );
}

function Signup({isOpen, setIsOpen, form, setForm, setPage, accounts, setAccounts, reset=false, setr}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongpw, setWrongpw] = useState(0);
  //return token
  const [rr, setrr] = useState("");
  const API = "localhost:8080/register"
  function handleSubmit(e){
      e.preventDefault();
      if (!username) return;
      setForm([username, password]);
    }
  function noaccmatch(form){
      return (accounts.filter((u) => (u[0]===form[0])).length===0)
  }
  function acccmatch(form){
      return (accounts.filter((u) => (u[0]===form[0] && u[1]===form[1])).length!==0)
  }
  useEffect(function(){
  async function ue(){
    if (form[0] !== ""){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {email: form[0], password: form[1]}
      };
      //fetch({API}, requestOptions)
      //    .then(response => response.json())
      //    .then(data => setrr(data));
      console.log({email: form[0], password: form[1]});
      
      if (noaccmatch(form)){
          
          if (!PWRules(form[1])) setWrongpw(1);
          else{ setWrongpw(0);
            if (form[0].search("@") === -1 || form[0].search(".c") === -1) setWrongpw(3);
            else if (test) setAccounts([...accounts, form]);
            else fetch({API}, requestOptions)
            .then(response => response.json())
            .then(data => setrr(data));
            
            if (rr.status) setWrongpw(2);
          }
      }
      else if (!acccmatch(form)) {
        setWrongpw(2);
        if (reset){
          const tmpa = accounts.filter((u) => (u[0]!==form[0]))
          setAccounts([...tmpa, form]);
        }
      }
      //if (r.status !== undefined) setWrongpw(2);
    }
  }
  ue();
  }, [form])
  return(
  <form className="nav-bar2" onSubmit={handleSubmit}>
      <button
          className="btn-toggle2"
          onClick={() => setPage(0)}
      >
          {isOpen ? "x" : "+"}
      </button>
      <Logo />
      <h1>{reset? "To reset, enter your existing e-mail and new password" : "Sign up below:"}</h1>
      <Search query={username} setQuery={setUsername} placeholder="E-Mail"/>
      <Search type="password" query={password} setQuery={setPassword} placeholder="Password"/>
      <h3>{wrongpw ? (wrongpw === 1? "Weak password" : (wrongpw === 2? "Account already exists" : "Invalid e-mail address"))
          : (reset? "Success!" : "")} &nbsp;</h3>
      <h3>{//accounts.filter((u) => (u[0]==form[0] && u[1]==form[1])).length
      }</h3>
      <button className="login-btn">
          {reset? "Reset" : "Sign up for Free"}
      </button>
    </form>
  )
}

function Forgotpw({isOpen, setIsOpen, form, setForm, setPage, accounts, setAccounts}){
  const [username, setUsername] = useState("");
  const [wrongpw, setWrongpw] = useState(0);
  function handleSubmit(e){
      e.preventDefault();
      if (!username) return;
      setForm([username, "reset"]);
    }
  function noaccmatch(form){
      return (accounts.filter((u) => (u[0]===form[0])).length===0)
  }
  useEffect(function(){
  async function ue(){
    if (form[0] !== ""){
      if (noaccmatch(form)){
          setWrongpw(3);
      }
      else {
        setWrongpw(2);
        //const tmpa = accounts.filter((u) => (u[0]!==form[0]))
        //setAccounts([...tmpa, form]);
      }
    }
  }
  ue();
  }, [form])

  return(
  <form className="nav-bar2" onSubmit={handleSubmit}>
      <button
          className="btn-toggle2"
          onClick={() => setPage(0)}
      >
          {isOpen ? "x" : "+"}
      </button>
      <Logo />
      <h1>Forgot Password? Please enter your e-mail address:</h1>
      <Search query={username} setQuery={setUsername} placeholder="E-Mail"/>
      <h3>{wrongpw ? (wrongpw === 1? "" : (wrongpw === 2? "A password reset e-mail has been successfully sent!" : "An account associated with this e-mail address does not exist!"))
          : ""} &nbsp;</h3>
      <h3>{//accounts.filter((u) => (u[0]==form[0] && u[1]==form[1])).length
      }</h3>
      <button className="login-btn">
          Reset Password
      </button>
    </form>
  )
}



function Main({setPage}){
  return (
    <>
    <NavBar>
      <div>&nbsp;</div>
      <nav className="nav-bar-grid">
      <button className="navbar-btn" onClick={() => setPage(1)}>
            Log in
        </button>
        <button className="navbar-btn" onClick={() => setPage(2)}>
            Sign up for Free
        </button>
        </nav>
    </NavBar>
    <div className="main-body">
    <h1>Build stronger digital <br></br> connections!</h1>
    <h2>
    Use our URL shortener to engage your audience and connect them to the right information. Build, edit, and track everything inside the ZipURL interface.
    </h2>
    <button className="navbar-btn" onClick={() => setPage(2)}>
            Sign up for Free
    </button>
    </div>
    </>
  )
}
/*
function POST({API, children}) {
  const [r, setr] = useState(null);
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer {my-token}' },
        body: JSON.stringify(children)
    };
    fetch({API}, requestOptions)
        .then(response => response.json())
        .then(data => setr(data));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [API, children]);
return (r)
}*/

export default function Tmp(){
    const [accounts, setAccounts] = useState(tempacc);
    const [isOpen, setIsOpen] = useState(true);
    //const [forgotpw, setForgotpw] = useState(false);
    const [form, setForm] = useState(["", ""]);
    const [page, setPage] = useState(defaultpage);
    const [r, setr] = useState(""); //return JWT
    console.log(accounts)
    useEffect(function(){
      async function ue(){
        if (page !== 4) setForm(["", ""]);
      }
      ue();
      }, [page])

    function HandlePage({page}){
      //Main
      if (page === 0) return (<Main setPage={setPage}/>)
      //Login
      if (page === 1) return (<Login isOpen={isOpen} setIsOpen={setIsOpen} 
        form={form} setForm={setForm} setPage={setPage} accounts={accounts} r={r} setr={setr}/>)
      //Signup
      if (page === 2) return (<Signup isOpen={isOpen} setIsOpen={setIsOpen}
         form={form} setForm={setForm} setPage={setPage} accounts={accounts} setAccounts={setAccounts} setr={setr}/>)
      //Forgot pw
      if (page === 3) return (<Forgotpw isOpen={isOpen} setIsOpen={setIsOpen}
        form={form} setForm={setForm} setPage={setPage} accounts={accounts} setAccounts={setAccounts}/>)
      //Interface
      if (page === 4) return (<Maininterface form={form} setPage={setPage} r={r} test={test}/>)
    }
    return(<>
    {//<Login isOpen={isOpen} setIsOpen={setIsOpen} setForgotpw={setForgotpw} form={form} setForm={setForm}/>
    }{
    <HandlePage page={page}/>
    }
    </>)
}