import React from 'react';

interface RowProps {
    children?: React.ReactNode;
}

const Row: React.FC<RowProps> = ({
    children,
    ...props
}) => {
    return (
        <tr {...props}>
            {children}
        </tr>
    );
};

export default Row;
