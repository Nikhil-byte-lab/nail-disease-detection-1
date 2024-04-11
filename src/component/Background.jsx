import React from "react";
const Background = (props) => {
  return (
    <div style={{ position: "relative", zIndex: 5 }}>
      <div
        style={{
          backgroundImage:
            "linear-gradient(125deg, #f0e0ff 0%, #dcf3ff 50%, #f0e0ff 75%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
          filter: "blur(8px)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          height: "100vh",
          width: "100vw",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
export default Background;
