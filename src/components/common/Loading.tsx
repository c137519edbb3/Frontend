import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/loading.gif"
        alt="Loading..."
        width={40}
        height={40}
        priority
        unoptimized={true}
      />
    </div>
  );
};

export default Loading;
