import React from 'react';
import { PropsWithChildren } from 'react';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
}

export default AuthLayout;
