import React from 'react';

interface GameLayoutProps {
    children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
    return (
        <div style={{
            width: '100%',
            maxWidth: '800px',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(250px, 1fr) 300px',
            gap: '1rem',
            height: '90vh'
        }}>
            {children}
        </div>
    );
};
