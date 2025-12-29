import React from 'react';

interface CraftingProps {
    onCraft: (item: 'steel' | 'charcoal') => void;
    onClose: () => void;
}

export const Crafting: React.FC<CraftingProps> = ({ onCraft, onClose }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100
        }}>
            <div className="glass-panel" style={{ padding: '2rem', minWidth: '300px' }}>
                <h2 style={{ marginBottom: '1rem' }}>Crafting Table</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <button className="btn" onClick={() => onCraft('charcoal')}>
                        <div>Rocks + Wood</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>= Charcoal</div>
                    </button>
                    <button className="btn" onClick={() => onCraft('steel')}>
                        <div>Iron Ore + Charcoal</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>= Steel</div>
                    </button>
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button className="btn btn-danger" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
