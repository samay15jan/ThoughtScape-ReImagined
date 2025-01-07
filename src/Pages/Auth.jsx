import React from "react";
import AuthImage from "../assets/authImage.jpg";
import ThoughtscapeLight from "../assets/thoughtscape_light.png";
import ThoughtscapeDark from "../assets/thoughtscape_dark.png";
import FirebaseAuth from "../components/auth/FirebaseAuth";
import reviews from "../utils/reviews";

const Auth = ({ type }) => {
  const [review, setReview] = React.useState(null);

  React.useEffect(() => {
    const review = reviews()
    setReview(review);
  }, []);

  return (
    <div className="w-screen h-screen overflow-x-hidden px-5 py-24 lg:py-10 lg:px-20 bg-gradient-to-r from-[#e2cbda] to-[#bfd8d9]">
      <div className="h-full grid grid-cols-7 bg-white rounded-2xl drop-shadow-xl">
        <div className="tracking-tighter absolute justify-center lg:justify-start top-10 lg:top-5 ml-0 lg:ml-4 w-full flex text-black text-lg font-medium">
          <img src={ThoughtscapeDark} className="w-14 mt-[-14px]" alt="" />
          <strong>thought</strong>scape
          <sup className="mt-3">∞</sup>
        </div>
        <div className="px-5 lg:px-32 flex items-center col-span-7 lg:col-span-4 lg:mt-5">
          <FirebaseAuth type={type} />
        </div>
        <div className="hidden lg:block p-5 col-span-3">
          <div className=" relative w-full h-full subpixel-antialiased font-mono">
            <div className="absolute inset-0 bg-black opacity-30 rounded-2xl" />
            <div className="tracking-tighter absolute top-40 ml-8 w-full flex text-white text-4xl font-medium">
              <img src={ThoughtscapeLight} className="w-32 mt-[-45px]" alt="" />
              <strong>thought</strong>scape
              <sup className="mt-3">∞</sup>
            </div>
            <div className="absolute bottom-20 text-white mx-10">
              <div className="text-[16px] mb-4 font-medium">"{review?.review}"</div>
              <div className="text-[14px] font-bold">- {review?.name}</div>
            </div>
            <img
              className="rounded-2xl w-full h-full object-cover transition-all ease-in-out duration-500"
              src={AuthImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
