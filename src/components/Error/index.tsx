import './Error.style.scss';

import { FC } from 'react';

const Error: FC<{
  message: string;
}> = ({ message }) => {
  return (
    <div className="error">
      <h3 className="error__message">{message}</h3>
    </div>
  );
};

export default Error;
