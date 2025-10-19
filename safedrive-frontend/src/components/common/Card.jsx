import React from 'react';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl ${className}`}>
      {title && <h3 className="text-xl font-bold text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;