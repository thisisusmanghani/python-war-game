import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                const clearTimer = setTimeout(onClear, 300); // Wait for animation
                return () => clearTimeout(clearTimer);
            }, 3000); // Show for 3s
            return () => clearTimeout(timer);
        }
    }, [message, onClear]);

    if (!message && !show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: `translateX(-50%) translateY(${show ? '0' : '-20px'})`,
            background: 'rgba(255, 255, 255, 0.9)',
            color: 'black',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontWeight: 'bold',
            opacity: show ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
            zIndex: 1000,
            pointerEvents: 'none',
            width: 'max-content',
            maxWidth: '90vw',
            textAlign: 'center'
        }}>
            {message}
        </div>
    );
};
