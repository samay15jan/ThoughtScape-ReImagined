import { signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../utils/firebase.js';
import { ref, set } from "firebase/database";
// import googleLogo from '../../images/google-logo.jpg'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const FirebaseAuth = () => {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
      .then((result) => {
        const user = result.user
        const userId = user.uid
        set(ref(db, 'users/' + userId), {
          name: user.displayName,
          email: user.email,
          profile: user.photoURL,
        });
      })
      .catch((error) => {
        console.error('Google login error:', error)
      });
  };
  return (
    <div>
      <div className='lg:block hidden absolute right-24 top-5 '>
        <button className='bg-opacity-70 flex items-center bg-white text-black p-3 pr-2 rounded-full w-30 hover:bg-gray-200 drop-shadow-lg' onClick={handleGoogleLogin}><img className='w-8 mr-2' src='' alt="Google" />Sign in with Google</button>
      </div>
      <div className='lg:hidden block absolute right-20 top-4'>
        <button className='bg-opacity-70 bg-white rounded-full hover:bg-gray-200 drop-shadow-lg p-1' onClick={handleGoogleLogin}><img className='w-8' src={googleLogo} alt="Google" /></button>
      </div>
    </div>
  );
};

// Register
const firebaseRegister = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    localStorage.setItem('email', user.email)
    localStorage.setItem('userId', user.uid)
    return
  } catch (error) {
    throw error.message
  }
}

// Login
const firebaseLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    localStorage.setItem('email', user.email)
    localStorage.setItem('userId', user.uid)
    return
  }
  catch (error) {
    throw error.message
  }
}

const logout = async () => {
  try {
    const Logout = await signOut(auth)
    console.log('signed out')
    return
  }
  catch (error) {
    throw error
  }
}

export default FirebaseAuth