import React from 'react';
import type { GameNode } from '../game/types';
import forestBg from '../assets/forest.png';
import caveBg from '../assets/cave.png';
import riverBg from '../assets/river.png';
import shopBg from '../assets/shop.png';
import warBg from '../assets/war.png';

interface LocationViewProps {
    node: GameNode;
}

const getBackground = (name: string): string => {
    if (name.includes('Shop')) return shopBg;
    if (name.includes('Cave')) return caveBg;
    if (name.includes('River')) return riverBg;
    if (name.includes('War')) return warBg;
    return forestBg;
};

const getEmojiForNode = (name: string): string => {
    if (name.includes('Tree')) return '🌲';
    if (name.includes('Cave')) return '🕳️';
    if (name.includes('Rock')) return '🪨';
    if (name.includes('River')) return '🌊';
    if (name.includes('Shop')) return '⛺';
    if (name.includes('Dead') || name.includes('Carcass')) return '☠️';
    if (name.includes('Start')) return '🏁';
    if (name.includes('War')) return '⚔️';
    return '📍';
};

export const LocationView: React.FC<LocationViewProps> = ({ node }) => {
    const emoji = getEmojiForNode(node.name);
    const bg = getBackground(node.name);

    return (
        <div className="glass-panel" style={{
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px', // Increased height
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-image 0.5s ease-in-out',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}>
                {emoji}
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px black' }}>{node.name}</h2>
            <p style={{ color: '#ddd', maxWidth: '500px', textShadow: '0 1px 3px black', fontSize: '1.1rem' }}>{node.description}</p>

            {node.items.length > 0 && (
                <div style={{ marginTop: '2rem', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '12px' }}>
                    <span className="text-sec" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>ON THE GROUND:</span>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        {node.items.map(item => (
                            <span key={item} style={{
                                background: 'rgba(88, 166, 255, 0.3)',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(88, 166, 255, 0.4)'
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
