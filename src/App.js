import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider,signOut} from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './firebase/firebase.initiailz';


initializeAuthentication()
const GoogleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then(result => {
        const {displayName,email,photoURL} = result.user;
        const loggedInUser ={
          name:displayName,
          email:email,
          photo:photoURL
        };
        setUser(loggedInUser)
      
      })
      .catch(error =>{
        console.log(error.message);
      })
    }
      const handleGitHubSignIn = ()=>{
        signInWithPopup(auth,gitHubProvider)
        .then(result => {
          console.log(result.user);
          const {displayName,email,photoURL} = result.user;
          const loggedInUser ={
            name:displayName,
            email:email,
            photo:photoURL
          };
          setUser(loggedInUser)

        })
      }
      const handleSignOut = () =>{
        signOut(auth)
        .then( ()=>{
          setUser({})
        })

      }

  
  return (
    <div className="App">
     {!user.photo? 
     <div>
      <button onClick={handleGoogleSignIn}>Google sign In</button>
      <br />
      <button onClick ={handleGitHubSignIn}>GitHub sign In</button>
      <br />
      </div>:

      <button onClick ={handleSignOut}>Sign Out</button>
      
      }
      {
        user.photo &&  <div>
          <h1>welcome {user.name}</h1>
          <p>I know your email address:  <b>{user.email} </b></p>
          <img src={user.photo} alt="" />
          </div>
      }
    </div>
  );
}

export default App;
