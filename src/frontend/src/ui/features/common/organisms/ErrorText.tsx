import React from 'react';
import { observer } from 'mobx-react';

interface IErrorTextProps {
  code: string;
  message: string;
}

const ErrorText: React.FC<IErrorTextProps> = observer(({ code, message }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-thin text-[max(10vh,60px)]">{code}</span>
      <div className="w-[2px] h-[max(11vh,66px)] bg-black" />
      <span>{message}</span>
    </div>
  );
});

export default ErrorText;
