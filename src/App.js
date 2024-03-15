import { useEffect, useState } from "react";
import Data from "./Data";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Googledrivelogo from "./assets/googledrivelogo.png";
import { auth } from "./FirebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
function App() {
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState("");

  const SignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      {userAuth ? (
        <>
          <Header user={userAuth} />
          <div className="App">
            <Sidebar user={userAuth} />
            <Data user={userAuth} />
          </div>
        </>
      ) : (
        <>
          <div className="loginWrap">
            <img src={Googledrivelogo} alt="googledriveimg" />
            <button onClick={SignIn}>Login To Google Drive Clone</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
