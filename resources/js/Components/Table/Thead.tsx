import React from 'react';

interface TheadProps {
    className?: string;
    children?: React.ReactNode;
}

const Thead: React.FC<TheadProps> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <thead className={`border-t bg-gray-100 ${className}`} {...props}>
            {children}
        </thead>
    );
};

export default Thead;
