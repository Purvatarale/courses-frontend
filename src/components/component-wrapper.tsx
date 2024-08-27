import React from "react";

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-10 flex flex-row justify-center items-center mx-auto">
      {children}
    </div>
  );
};

export default ComponentWrapper;
