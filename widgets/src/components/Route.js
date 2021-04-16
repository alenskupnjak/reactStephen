import React from 'react';

const Route = ({ path, children }) => {
  console.log(path, window.location.pathname);
  console.log(children);

  return window.location.pathname === path ? children : null;
};

export default Route;
