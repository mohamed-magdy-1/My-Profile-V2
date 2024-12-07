'use client';

import { useEffect, useState, useRef } from "react";
import Slider from "./slider/slider";

export default function Home() {

  const lottieRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@lottiefiles/lottie-player").then(() => {
        console.log("LottiePlayer loaded");
      });
    }
  }, []);


  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prevIndex = Number(localStorage.getItem("prevIndex"));
      if (prevIndex === 0) {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 5000); 

        return () => clearTimeout(timer); 
      }
    }
  }, []); 

  return (
    <div>
      <div className="Loading">
        <div
          className="lottie"
          style={{
            display: loading ? "flex" : "none", 
            animation: loading ? "LoadingAnimations 3s ease-out" : "none",
            animationDelay: loading ? "3s" : "none",
          }}
        >
          <lottie-player
            ref={lottieRef} // ربط العنصر بالمرجع
            style={{
              width: "320px",
            }}
            autoplay
            loop
            src="/icons/Animation-hello.json"
          ></lottie-player>
        </div>
      </div>

      <Slider />
    </div>
  );
}