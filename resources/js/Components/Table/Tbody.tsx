import React from 'react';

interface TbodyProps {
    className?: string;
    children?: React.ReactNode;
}

const Tbody: React.FC<TbodyProps> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <tbody className={`divide-y divide-gray-200 ${className}`} {...props}>
            {children}
        </tbody>
    );
};

export default Tbody;
