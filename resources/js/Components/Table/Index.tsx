import React from 'react';

interface TableProps {
    className?: string;
    children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
    className = 'w-full',
    children,
    ...props
}) => {
    return (
        <div className={`scrollbar overflow-x-auto`}>
            <table
                className={`w-full divide-y divide-gray-300 ${className}`} 
                {...props}
            >
                {children}
            </table>
        </div>
    );
};

export default Table;
