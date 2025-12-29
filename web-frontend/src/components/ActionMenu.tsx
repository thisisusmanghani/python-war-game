import React from 'react';
import type { Direction } from '../game/types';

interface ActionMenuProps {
    onMove: (dir: Direction) => void;
    onPickUp: () => void;
    onCraft: () => void;
    onShop?: () => void;
    canShop: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onMove, onPickUp, onCraft, onShop, canShop }) => {
    return (
        <div className="glass-panel" style={{ padding: '1rem', display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', justifyContent: 'center' }}>
                <div />
                <button className="btn" onClick={() => onMove('forward')}>▲ Forward</button>
                <div />
                <button className="btn" onClick={() => onMove('left')}>◀ Left</button>
                <button className="btn" onClick={() => onMove('backward')}>▼ Backward</button>
                <button className="btn" onClick={() => onMove('right')}>Right ▶</button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={onPickUp}>Hand (Pick Up)</button>
                <button className="btn" onClick={onCraft}>Crafting</button>
                {canShop && (
                    <button className="btn text-gold" style={{ border: '1px solid var(--gold)' }} onClick={onShop}>
                        Merchant Shop
                    </button>
                )}
            </div>
        </div>
    );
};
