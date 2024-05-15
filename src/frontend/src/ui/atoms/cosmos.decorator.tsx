import React, { ReactNode } from 'react';

const decorator: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ height: '100%', padding: 16 }}>
    {children}
  </div>
);

export default decorator;
