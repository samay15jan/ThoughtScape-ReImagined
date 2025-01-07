import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router";
import googleLogo from "../../assets/google.jpg";

const FirebaseAuth = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const actionCodeSettings = {
    url: "https://9000-idx-thoughtscape-1735923066644.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev", // ContinueURL
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        setError("Successfully Authenticated with Google");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Google login error:", error);
        setError("An Error occured while logging in with Google");
      });
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    setError("Password reset email is sent.");
    sendPasswordResetEmail(auth, email, actionCodeSettings).then(() => {
      setError("Verification email sent! Please check your inbox.");
    });
  };

  const handleEmailLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          sendEmailVerification(auth.currentUser, actionCodeSettings).then(
            () => {
              setError("Verification email sent! Please check your inbox.");
            }
          );
        } else {
          setError("Successfully authenticated with email!");
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Email login error:", error);
        switch (error.code) {
          case "auth/user-not-found":
            setError("No account found with that email.");
            break;
          case "auth/invalid-credential":
            setError("Incorrect username/password. Please try again.");
            break;
          case "auth/invalid-email":
            setError("The email address is not valid.");
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your connection.");
            break;
          default:
            setError("An error occurred while logging in.");
        }
      });
  };

  const handleEmailSignUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser, actionCodeSettings).then(
            () => {
              setError("Verification email sent! Please check your inbox.");
            }
          );
        } else {
          setError("Successfully created an account with email!");
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Email sign-up error:", error);

        switch (error.code) {
          case "auth/email-already-in-use":
            setError("The email is already in use. Please try logging in.");
            break;
          case "auth/invalid-email":
            if (email && !email.length === 0) {
              sendEmailVerification(auth.currentUser, actionCodeSettings).then(
                () => {
                  setError("Verification email sent! Please check your inbox.");
                }
              );
            }
            break;
          case "auth/weak-password":
            setError(
              "Password is too weak. Please choose a stronger password."
            );
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your connection.");
            break;
          default:
            setError("An error occurred while creating the account.");
        }
      });
  };

  function handleMenuChange(isReset) {
    setEmail("");
    setPassword("");
    setError("");
    if (isReset) {
      navigate("/reset", { replace: true });
    } else {
      type === "login"
        ? navigate("/register", { replace: true })
        : navigate("/login", { replace: true });
    }
  }

  return (
    <div className="grid grid-cols-1">
      {type != "reset" && (
        <>
          <div className="text-2xl font-bold">
            Transforming chaos into clarity.
          </div>
          <div className="text-sm font-medium mt-2 mr-12">
            From notes and projects to journals and decisions — all powered by
            AI's magic.
          </div>
        </>
      )}
      {type === "reset" && (
        <div className="text-2xl font-medium text-center underline">
          Reset Password
        </div>
      )}
      <form className="w-full grid grid-col-1" action="submit">
        <input
          className="bg-[#F7F7F7] hover:bg-gray-100 rounded-md text-lg p-2 mb-2 mt-5 h-12 rounded-sm`"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {type != "reset" && (
          <input
            className="bg-[#F7F7F7] hover:bg-gray-100 rounded-md text-lg p-2 my-2 h-12 rounded-sm`"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        )}
        <button
          type="submit"
          className="font-medium justify-center flex items-center bg-[#0875ea] text-white text-sm mt-5 p-3 pr-2 rounded-md w-30 hover:opacity-80 drop-shadow-lg transition-all ease-in-out duration-200"
          onClick={
            (type === "login" && handleEmailLogin) ||
            (type === "register" && handleEmailSignUp) ||
            (type === "reset" && handleResetPassword)
          }
        >
          {(type === "login" && "Login") ||
            (type === "register" && "Create Account") ||
            (type === "reset" && "Send Password Reset Email")}
        </button>
      </form>

      <div className="font-medium text-[14px] mt-2 opacity-80 flex gap-2 justify-center items-center">
        <button
          className="hover:text-[#0875ea] cursor-pointer transition-all ease-in-out duration-50 transform hover:scale-105"
          onClick={() => handleMenuChange(false)}
        >
          <span>{type === "login" ? "Sign Up Instead" : "Login Instead"}</span>
        </button>
        {type != "reset" && (
          <>
            <span className="text-[#9e9e9e]">|</span>
            <button
              className="hover:text-[#0875ea] cursor-pointer transition-all ease-in-out duration-50 transform hover:scale-105"
              onClick={() => handleMenuChange(true)}
            >
              <span>Forgot password</span>
            </button>
          </>
        )}
      </div>
      <strong className="text-center my-4">OR</strong>
      <button
        className="font-medium justify-center flex items-center bg-black text-white font-bold opacity-90 text-sm p-3 pr-2 rounded-md hover:opacity-80 drop-shadow-lg transition-all ease-in-out duration-200"
        onClick={handleGoogleLogin}
      >
        <img src={googleLogo} className="w-6 mr-2 " alt="" />
        Continue with Google
      </button>
      <div className="text-center mt-2 text-[#a74275] font-medium">{error}</div>
      <p className=" mt-2 opacity-70 text-[12px] font-medium">
        By signing in i agree to <strong>thought</strong>scape
        <sup className="mt-3">∞ </sup>
        <a className="font-bold text-[#0875ea] cursor-pointer">
          Terms of Service
        </a>
        ,
        <a className="font-bold text-[#0875ea] cursor-pointer">
          Privacy Policy
        </a>
        and Data processing terms. Security, privacy and anonimity is our
        topmost priority.
      </p>
    </div>
  );
};

export default FirebaseAuth;
