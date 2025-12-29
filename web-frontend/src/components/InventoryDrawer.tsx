import React from 'react';
import type { Item, Weapon } from '../game/types';

interface InventoryDrawerProps {
    inventory: Item[];
    weapons: Weapon[];
    hydration: number;
}

export const InventoryDrawer: React.FC<InventoryDrawerProps> = ({ inventory, weapons, hydration }) => {
    return (
        <div className="glass-panel" style={{ padding: '1rem' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                STATUS
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="text-sec">Hydration</span>
                    <span className={hydration < 3 ? 'text-danger' : 'text-accent'}>{hydration}/10</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${hydration * 10}%`,
                        background: hydration < 3 ? 'var(--danger)' : 'var(--accent)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <h4 className="text-sec" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Inventory ({inventory.length}/5)</h4>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {inventory.length === 0 && <span style={{ fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.5 }}>Empty</span>}
                {inventory.map((item, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                    }}>
                        {item}
                    </div>
                ))}
            </div>

            <h4 className="text-sec" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Weapons</h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {weapons.length === 0 && <span style={{ fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.5 }}>None equipped</span>}
                {weapons.map((w, i) => (
                    <div key={i} style={{
                        background: 'rgba(210, 161, 6, 0.1)',
                        color: 'var(--gold)',
                        border: '1px solid rgba(210, 161, 6, 0.3)',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        ⚔ {w}
                    </div>
                ))}
            </div>
        </div>
    );
};
