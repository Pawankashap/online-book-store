import React from "react";
import bannerImage from "../Images/bgimage.jpg"

function Home({user}) {
  return (
    <div>
      <img src={bannerImage} alt="Banner" style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default Home;