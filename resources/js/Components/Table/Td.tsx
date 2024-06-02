import React from 'react';

interface TdProps {
    className?: string;
    children?: React.ReactNode;
}

const Td: React.FC<TdProps> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <td className={`whitespace-nowrap py-4 pe-3 text-sm text-gray-800 ${className}`} {...props}>
            {children}
        </td>
    );
};

export default Td;
