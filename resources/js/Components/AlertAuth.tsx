import React from 'react';

interface AlertAuthProps {
  message?: string;
  type?: 'danger' | 'success' | 'primary' | 'warning' | 'info' | 'default';
}

const AlertAuth: React.FC<AlertAuthProps> = ({ message, type }) => {
  if (!message) {
    return null;
  }

  let className = 'text-sm text-white rounded-md p-4 mb-2 ';

  console.log(type)

  switch (type) {
    case 'danger':
      className += 'bg-danger';
      break;
    case 'success':
      className += 'bg-green-500';
      break;
    case 'primary':
      className += 'bg-primary';
      break;
    case 'warning':
      className += 'bg-warning';
      break;
    default:
      className += 'hidden';
      break;
  }

  const renderPrefix = () => {
    switch (type) {
      case 'info':
      case 'default':
      case 'primary':
        return <span className="font-bold">Info:</span>;
      case 'success':
        return <span className="font-bold">Success,</span>;
      case 'danger':
        return <span className="font-bold">Error:</span>;
      case 'warning':
        return <span className="font-bold">Attention:</span>;
      default:
        return null;
    }
  };

  return (
    <div className={className} role="alert">
      {renderPrefix()} {message}
    </div>
  );
};

export default AlertAuth;
