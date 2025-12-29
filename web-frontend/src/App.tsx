import { useState, useEffect } from 'react';
import { useGame } from './game/gameState';
import { GameLayout } from './components/GameLayout';
import { LocationView } from './components/LocationView';
import { ActionMenu } from './components/ActionMenu';
import { InventoryDrawer } from './components/InventoryDrawer';
import { Crafting } from './components/Crafting';
import { Shop } from './components/Shop';
import { Combat } from './components/Combat';
import { Toast } from './components/Toast';

const StartScreen = ({ onStart }: { onStart: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="glass-panel" style={{
      padding: '3rem',
      textAlign: 'center',
      maxWidth: '400px',
      margin: 'auto',
      marginTop: '10vh'
    }}>
      <h1 style={{ marginBottom: '2rem' }}>Forest Adventure</h1>
      <input
        type="text"
        placeholder="Enter your hero name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(0,0,0,0.3)',
          color: 'white',
          width: '100%',
          marginBottom: '1.5rem',
          fontSize: '1rem'
        }}
      />
      <button
        className="btn btn-primary"
        disabled={!name.trim()}
        onClick={() => onStart(name)}
        style={{ width: '100%', fontSize: '1.1rem' }}
      >
        Start Game
      </button>
    </div>
  );
};

function Game({ playerName }: { playerName: string }) {
  const { player, currentNode, actions } = useGame(playerName);
  const [showCrafting, setShowCrafting] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Fix: Use useEffect to sync feedback only when message changes, preventing loops
  useEffect(() => {
    if (player.message) {
      setFeedback(player.message);
    }
  }, [player.message]);

  // Combat Trigger: If at War node (99) and not won yet
  const showCombat = player.currentPosId === 99 && !player.gameWon && !player.isGameOver;

  return (
    <>
      <Toast message={feedback || ''} onClear={() => setFeedback(null)} />

      <GameLayout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <LocationView node={currentNode} />

          <div className="glass-panel" style={{ padding: '1rem', minHeight: '60px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.2rem', color: 'var(--accent)' }}>GAME LOG</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{player.message}</div>
          </div>

          {!showCombat && <ActionMenu
            onMove={actions.move}
            onPickUp={actions.pickUpItem}
            onCraft={() => setShowCrafting(true)}
            onShop={() => setShowShop(true)}
            canShop={currentNode.name === 'Shop'}
          />}
        </div>

        <InventoryDrawer
          inventory={player.inventory}
          weapons={player.weapons}
          hydration={player.hydration}
        />
      </GameLayout>

      {showCrafting && (
        <Crafting
          onCraft={(item) => { actions.combine(item); setShowCrafting(false); }}
          onClose={() => setShowCrafting(false)}
        />
      )}

      {showShop && (
        <Shop
          onBuy={(item) => { actions.buy(item); }}
          onClose={() => setShowShop(false)}
        />
      )}

      {showCombat && (
        <Combat
          playerHp={player.hp}
          setPlayerHp={(hp) => actions.setHp(hp)}
          onWin={actions.setGameWon}
          onLose={actions.setGameOver}
        />
      )}

      {player.gameWon && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(46, 160, 67, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, flexDirection: 'column'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆 YOU WON!</h1>
          <p>You have conquered the Forest Adventure.</p>
          <button className="btn" style={{ marginTop: '2rem', background: 'white', color: 'black' }} onClick={() => { localStorage.clear(); window.location.reload(); }}>Play Again</button>
        </div>
      )}

      {player.isGameOver && !player.gameWon && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(218, 54, 51, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, flexDirection: 'column'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>💀 GAME OVER</h1>
          <p>{player.message}</p>
          <button className="btn" style={{ marginTop: '2rem', background: 'white', color: 'black' }} onClick={() => { localStorage.clear(); window.location.reload(); }}>Try Again</button>
        </div>
      )}
    </>
  );
}

function App() {
  const [playerName, setPlayerName] = useState<string | null>(null);

  if (!playerName) {
    return <StartScreen onStart={setPlayerName} />;
  }

  return <Game playerName={playerName} />;
}

export default App;
