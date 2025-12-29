import React, { useState } from 'react';

interface CombatProps {
    onWin: () => void;
    onLose: (reason: string) => void;
    playerHp: number;
    setPlayerHp: (hp: number) => void;
}

// Simple Enemy
const ENEMY = {
    name: 'War General',
    maxHp: 100,
    damage: 15
};

export const Combat: React.FC<CombatProps> = ({ onWin, onLose, playerHp, setPlayerHp }) => {
    const [enemyHp, setEnemyHp] = useState(ENEMY.maxHp);
    const [log, setLog] = useState<string[]>(['Battle started!', 'Choose your attack.']);
    const [turn, setTurn] = useState<'player' | 'enemy'>('player');

    const addLog = (msg: string) => setLog(prev => [...prev.slice(-3), msg]);

    const attack = (weapon: 'sword' | 'cross-guard') => {
        if (turn !== 'player') return;

        let damage = 0;
        if (weapon === 'sword') {
            damage = Math.floor(Math.random() * 20) + 10; // 10-30 dmg
            addLog(`You slashed with Sword for ${damage} dmg!`);
        } else {
            damage = Math.floor(Math.random() * 10) + 5; // 5-15 dmg
            addLog(`You bashed with Cross-Guard for ${damage} dmg!`);
        }

        const newEnemyHp = enemyHp - damage;
        setEnemyHp(newEnemyHp);

        if (newEnemyHp <= 0) {
            addLog("Enemy defeated!");
            setTimeout(onWin, 1000);
            return;
        }

        setTurn('enemy');
        setTimeout(enemyTurn, 1000);
    };

    const enemyTurn = () => {
        const damage = Math.floor(Math.random() * ENEMY.damage) + 5;
        const newPlayerHp = playerHp - damage;
        addLog(`Enemy hit you for ${damage} damage!`);
        setPlayerHp(newPlayerHp);

        if (newPlayerHp <= 0) {
            onLose("You fell in battle.");
        } else {
            setTurn('player');
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 150,
            flexDirection: 'column'
        }}>
            <div className="glass-panel" style={{ padding: '2rem', width: '90%', maxWidth: '500px', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--danger)', marginBottom: '2rem' }}>⚔️ COMBAT ⚔️</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h3>YOU</h3>
                        <div style={{ fontSize: '1.5rem', color: playerHp < 30 ? 'red' : 'green' }}>{playerHp} HP</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h3>{ENEMY.name}</h3>
                        <div style={{ fontSize: '1.5rem', color: 'orange' }}>{enemyHp} HP</div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    padding: '1rem',
                    borderRadius: '8px',
                    height: '100px',
                    marginBottom: '2rem',
                    overflowY: 'auto'
                }}>
                    {log.map((l, i) => <div key={i}>{l}</div>)}
                </div>

                {turn === 'player' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button className="btn btn-primary" onClick={() => attack('sword')}>
                            Attack (Sword)
                        </button>
                        <button className="btn" onClick={() => attack('cross-guard')}>
                            Bash (Guard)
                        </button>
                    </div>
                ) : (
                    <div style={{ fontStyle: 'italic', opacity: 0.7 }}>Enemy attacking...</div>
                )}
            </div>
        </div>
    );
};
