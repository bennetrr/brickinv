import React, { ReactNode } from 'react';
import { ReactBaseProvider, Toaster } from '@wemogy/reactbase';
import { DefaultTheme, themeDeclaration } from './ui';

const decorator: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ReactBaseProvider
    theme={DefaultTheme}
    themeDependencies={{
      useThemeModeHook: () => 'default',
      themeDeclaration
    }}
  >
    {children}
    <Toaster
      closeButton
      richColors
      position="top-right"
      style={{ top: 16, right: 16 }}
    />
  </ReactBaseProvider>
);

export default decorator;
