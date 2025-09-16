import React from 'react';

export default function CustomButton({ children, ...props }) {
  return (
    <button className="custom-btn" {...props}>
      {children}
    </button>
  );
}
