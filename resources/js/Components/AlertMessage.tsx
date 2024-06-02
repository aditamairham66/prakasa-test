import React, { useState } from 'react';

interface AlertProps {
  message: string;
  type: 'info' | 'success' | 'danger' | 'warning' | 'default' | 'primary';
}

const AlertMessage: React.FC<AlertProps> = ({ message, type }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div
          id="dismiss-alert"
          className={`transition duration-300 mb-3 border rounded-md p-4 ${
            type === 'danger' ? 'border-danger bg-danger' :
            type === 'success' ? 'border-green-500 bg-success' :
            type === 'primary' ? 'border-primary bg-primary' :
            type === 'warning' ? 'border-warning bg-warning' : ''
          }`}
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0 text-white">
              <i className="mgc_information_line text-xl"></i>
            </div>
            <div className="flex-grow ms-4">
              <h3 className="text-sm font-semibold text-white">
                {type === 'info' || type === 'default' || type === 'primary' ? (
                  <span className="font-bold">Info:</span>
                ) : type === 'success' ? (
                  <span className="font-bold">Success</span>
                ) : type === 'danger' ? (
                  <span className="font-bold">Error.</span>
                ) : type === 'warning' ? (
                  <span className="font-bold">Attention !</span>
                ) : null}
              </h3>
              <div className="mt-1 text-sm text-white">{message}</div>
            </div>
            <button
              data-fc-dismiss="dismiss-alert"
              type="button"
              id="dismiss-test"
              className="ms-auto h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center bg-transparent text-white"
              onClick={handleClose}
            >
              <i className="mgc_close_line text-xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
