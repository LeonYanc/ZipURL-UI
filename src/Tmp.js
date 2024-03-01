import { useEffect, useState } from "react";
//import PropTypes from "prop-types";

const tempacc = [
    ["kfzhu", "12345"],
    ["ek", "23465"]
]

function Logo(){
    return (<div className="logo2">
    <span role="img">🗒️</span>
    <h1>ZipURL</h1>
  </div>)
  }

function Search({query, setQuery, placeholder=""}){
    return(
    <input
            className="search2"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
   )
  }

function Login({isOpen, setIsOpen, setForgotpw, form, setForm, setPage, accounts}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [wrongpw, setWrongpw] = useState(false);
    function handleSubmit(e){
        e.preventDefault();
        if (!username) return;
        setForm([username, password]);
        if (!noaccmatch([username, password])) setPage(4);
      }
    function noaccmatch(form){
        return (accounts.filter((u) => (u[0]===form[0] && u[1]===form[1])).length===0)
    }
    useEffect(function(){
    async function ue(){
      setWrongpw(form[0] !== "" && noaccmatch(form));
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
        <Search query={password} setQuery={setPassword} placeholder="Password"/>
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

const specialChar = ["¬", "\`", "!", "@", "£", "#", "%", "&", "-", "_", 
"=", ":", "~", "\"", "'", ";", ","]
function PWRules(password){
  console.log(specialChar.filter((c) => (password.search(c) !== -1)));
  const sp = (specialChar.filter((c) => (password.search(c) !== -1))).length !== 0;
  console.log(password.length >= 8 && sp)
  return(
    password.length >= 8 && sp
  );
}

function Signup({isOpen, setIsOpen, form, setForm, setPage, accounts, setAccounts}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongpw, setWrongpw] = useState(0);
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
      if (noaccmatch(form)){
          
          if (!PWRules(form[1])) setWrongpw(1);
          else{ setWrongpw(0);
            if (form[0].search("@") === -1 || form[0].search(".com") === -1) setWrongpw(3);
            else setAccounts([...accounts, form]);
          }
      }
      else if (!acccmatch(form)) setWrongpw(2);
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
      <h1>Sign up below:</h1>
      <Search query={username} setQuery={setUsername} placeholder="E-Mail"/>
      <Search query={password} setQuery={setPassword} placeholder="Password"/>
      <h3>{wrongpw ? (wrongpw === 1? "Weak password" : (wrongpw === 2? "Account already exists" : "Invalid e-mail address"))
          : ""} &nbsp;</h3>
      <h3>{//accounts.filter((u) => (u[0]==form[0] && u[1]==form[1])).length
      }</h3>
      <button className="login-btn">
          Sign up for Free
      </button>
    </form>
  )
}

function NavBar({children}){
  
  return (
    <nav className="nav-bar">
        <Logo />
        
        {children}
      </nav>
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



export default function Tmp(){
    const [accounts, setAccounts] = useState(tempacc);
    const [isOpen, setIsOpen] = useState(true);
    const [forgotpw, setForgotpw] = useState(false);
    const [form, setForm] = useState(["", ""]);
    const [page, setPage] = useState(0);
    console.log(accounts)
    useEffect(function(){
      async function ue(){
        setForm(["", ""]);
      }
      ue();
      }, [page])

    function HandlePage({page}){
      //Main
      if (page === 0) return (<Main setPage={setPage}/>)
      //Login
      if (page === 1) return (<Login isOpen={isOpen} setIsOpen={setIsOpen} 
        setForgotpw={setForgotpw} form={form} setForm={setForm} setPage={setPage} accounts={accounts}/>)
      //Signup
      if (page === 2) return (<Signup isOpen={isOpen} setIsOpen={setIsOpen}
         form={form} setForm={setForm} setPage={setPage} accounts={accounts} setAccounts={setAccounts}/>)
      //Forgot pw
      if (page === 3) return (<div>Forgot Password</div>)
      //Interface
      if (page === 4) return (<div>Main interface</div>)
    }
    return(<>
    {//<Login isOpen={isOpen} setIsOpen={setIsOpen} setForgotpw={setForgotpw} form={form} setForm={setForm}/>
    }{
    <HandlePage page={page}/>
    }
    </>)
}