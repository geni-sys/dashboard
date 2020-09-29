import React, { useState } from "react";
// STALYES OR STATICS
import { Image } from "./styles";

function Miniature({ width, height, desc, source }) {
  const [linkImage] = useState(
    () => localStorage.getItem("github_avatar") || "Reload the page"
  );

  return (
    <>
      <Image
        draggable={false}
        src={source || linkImage}
        style={{ width: width, height: height }}
        alt={desc || "Miniatura"}
      />
    </>
  );
}

export default Miniature;
