import React from 'react';
import type { Weapon } from '../game/types';

interface ShopProps {
    onBuy: (item: Weapon) => void;
    onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ onBuy, onClose }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100
        }}>
            <div className="glass-panel" style={{ padding: '2rem', minWidth: '320px' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--gold)' }}>Merchant Shop</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <button className="btn" onClick={() => onBuy('sword')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Sword</span>
                            <span className="text-gold">Steel + Leather</span>
                        </div>
                    </button>
                    <button className="btn" onClick={() => onBuy('cross-guard')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Cross Guard</span>
                            <span className="text-gold">1 Steel</span>
                        </div>
                    </button>
                    <button className="btn" onClick={() => onBuy('helmet')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Helmet</span>
                            <span className="text-gold">Steel + Leather</span>
                        </div>
                    </button>
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button className="btn btn-danger" onClick={onClose}>Leave Shop</button>
                </div>
            </div>
        </div>
    );
};
