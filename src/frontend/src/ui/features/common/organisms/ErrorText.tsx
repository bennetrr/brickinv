import React from 'react';
import { observer } from 'mobx-react';

interface IErrorTextProps {
  code: string;
  message: string;
}

const ErrorText: React.FC<IErrorTextProps> = observer(({ code, message }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }}>
      <span style={{ fontSize: 'max(10vh, 60px)', fontWeight: 100 }}>{code}</span>
      <div style={{ width: 2, height: 'max(11vh, 66px)', background: 'black' }} />
      <span>{message}</span>
    </div>
  );
});

export default ErrorText;
