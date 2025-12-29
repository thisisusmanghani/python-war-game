import { useState, useEffect } from 'react';
import { INITIAL_HYDRATION, MAX_HP } from './types';
import type { PlayerState, Item, Weapon, Direction } from './types';
import { NODES } from './world';
import type { GameNode } from './types';

const STORAGE_KEY = 'forest_adventure_save_v1';

export const useGame = (playerName: string) => {
    // Initialize from storage or default
    const [player, setPlayer] = useState<PlayerState>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.name === playerName) return parsed; // Only load if name matches to avoid conflicts
            } catch (e) {
                console.error("Failed to load save", e);
            }
        }
        return {
            name: playerName,
            currentPosId: 0,
            inventory: [],
            weapons: [],
            hydration: INITIAL_HYDRATION,
            hp: MAX_HP,
            isGameOver: false,
            gameWon: false,
            message: 'Welcome to the Forest Adventure! Prepare for war.',
        };
    });

    // Mutable world state (items can be removed from nodes)
    const [nodes, setNodes] = useState<Record<number, GameNode>>(() => {
        const saved = localStorage.getItem(STORAGE_KEY + '_nodes');
        return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(NODES));
    });

    // Save on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
        localStorage.setItem(STORAGE_KEY + '_nodes', JSON.stringify(nodes));
    }, [player, nodes]);

    const setFeedback = (msg: string) => setPlayer(p => ({ ...p, message: msg }));

    const move = (direction: Direction) => {
        if (player.isGameOver || player.gameWon) return;

        const currentNode = nodes[player.currentPosId];
        const nextNodeId = currentNode.connections[direction];

        if (nextNodeId === undefined) {
            setFeedback("You can't go that way.");
            return;
        }

        // Win condition check (War node is 99)
        if (nextNodeId === 99) {
            const hasSword = player.weapons.includes('sword');
            const hasCrossGuard = player.weapons.includes('cross-guard');
            const hasHelmet = player.weapons.includes('helmet');

            if (hasSword && hasCrossGuard && hasHelmet) {
                // Instead of winning immediately, we move them to 99 and the UI will trigger combat
                setPlayer(p => ({ ...p, currentPosId: 99, message: 'You encounter the Enemy General! Fight!' }));
                return;
            } else {
                setFeedback(`You need Sword, Cross Guard, and Helmet to enter War. missing: ${[!hasSword && 'Sword', !hasCrossGuard && 'Cross Guard', !hasHelmet && 'Helmet'].filter(Boolean).join(', ')
                    }`);
                return;
            }
        }

        const newHydration = player.hydration - 1;
        if (newHydration <= 0) {
            setPlayer(p => ({ ...p, hydration: 0, isGameOver: true, message: 'You died of dehydration.' }));
            return;
        }

        setPlayer(p => ({
            ...p,
            hydration: newHydration,
            currentPosId: nextNodeId,
            message: `Moved to ${nodes[nextNodeId].name}.`,
        }));
    };

    const pickUpItem = () => {
        const currentNode = nodes[player.currentPosId];
        if (currentNode.items.length === 0) {
            setFeedback("Nothing to pick up here.");
            return;
        }

        if (player.hydration < 5 && !currentNode.items.includes('water')) {
            setFeedback("Too dehydrated to pick up items (unless it's water).");
            return;
        }

        // Logic: player picks up everything at the node (based on python logic usually taking 'item' list)
        // Actually python code checks specifically.
        // map.py has lists, player.py appends item.
        // If water, it consumes immediately.

        // We'll pick the first item for simplicity or all? Python loops?
        // Python `if player.current_pos.item: ...` implies it takes the list or first?
        // `player.current_pos.item` is a list. `lookItems` prints them. `add_to_inventory` takes "item".
        // Let's implement taking all items one by one or just the first.
        // Let's take the first available item.

        const itemToPick = currentNode.items[0] as Item | undefined;
        if (!itemToPick) return;

        if (itemToPick === 'water') {
            setPlayer(p => ({ ...p, hydration: INITIAL_HYDRATION, message: 'You drank water. Hydration restored.' }));
            // Remove from node
            setNodes(prev => ({
                ...prev,
                [player.currentPosId]: { ...prev[player.currentPosId], items: [] }
            }));
            return;
        }

        if (player.inventory.length >= 5) {
            setFeedback("Inventory full.");
            return;
        }

        // Add to inv, remove from node
        setPlayer(p => ({
            ...p,
            inventory: [...p.inventory, itemToPick],
            message: `Picked up ${itemToPick}.`
        }));

        setNodes(prev => ({
            ...prev,
            [player.currentPosId]: { ...prev[player.currentPosId], items: prev[player.currentPosId].items.slice(1) }
        }));
    };

    const combine = (target: 'steel' | 'charcoal') => {
        if (target === 'steel') {
            if (player.inventory.includes('iron-ore') && player.inventory.includes('charcoal')) {
                setPlayer(p => {
                    const newInv = [...p.inventory];
                    newInv.splice(newInv.indexOf('iron-ore'), 1);
                    newInv.splice(newInv.indexOf('charcoal'), 1);
                    newInv.push('steel');
                    return { ...p, inventory: newInv, message: 'Crafted Steel!' };
                });
            } else {
                setFeedback("Need Iron Ore and Charcoal to make Steel.");
            }
        } else if (target === 'charcoal') {
            if (player.inventory.includes('rocks') && player.inventory.includes('wood')) {
                setPlayer(p => {
                    const newInv = [...p.inventory];
                    newInv.splice(newInv.indexOf('rocks'), 1);
                    newInv.splice(newInv.indexOf('wood'), 1);
                    newInv.push('charcoal');
                    return { ...p, inventory: newInv, message: 'Crafted Charcoal!' };
                });
            } else {
                setFeedback("Need Rocks and Wood to make Charcoal.");
            }
        }
    };

    const buy = (item: Weapon) => {
        // Check location
        if (nodes[player.currentPosId].name !== 'Shop') {
            setFeedback("You must be at the Shop.");
            return;
        }

        if (item === 'sword') {
            if (player.inventory.includes('steel') && player.inventory.includes('leather')) {
                setPlayer(p => {
                    const newInv = [...p.inventory];
                    newInv.splice(newInv.indexOf('steel'), 1);
                    newInv.splice(newInv.indexOf('leather'), 1);
                    return { ...p, inventory: newInv, weapons: [...p.weapons, 'sword'], message: 'Bought Sword!' };
                });
            } else setFeedback("Need Steel + Leather for Sword.");
        } else if (item === 'cross-guard') {
            // Python code discrepancy fixed: requires 1 steel
            if (player.inventory.includes('steel')) {
                setPlayer(p => {
                    const newInv = [...p.inventory];
                    newInv.splice(newInv.indexOf('steel'), 1);
                    return { ...p, inventory: newInv, weapons: [...p.weapons, 'cross-guard'], message: 'Bought Cross-Guard!' };
                });
            } else setFeedback("Need Steel for Cross-Guard.");
        } else if (item === 'helmet') {
            if (player.inventory.includes('steel') && player.inventory.includes('leather')) {
                setPlayer(p => {
                    const newInv = [...p.inventory];
                    newInv.splice(newInv.indexOf('steel'), 1);
                    newInv.splice(newInv.indexOf('leather'), 1);
                    return { ...p, inventory: newInv, weapons: [...p.weapons, 'helmet'], message: 'Bought Helmet!' };
                });
            } else setFeedback("Need Steel + Leather for Helmet.");
        }
    };

    const setHp = (hp: number) => setPlayer(p => ({ ...p, hp }));
    const setGameWon = () => setPlayer(p => ({ ...p, gameWon: true }));
    const setGameOver = (reason: string) => setPlayer(p => ({ ...p, isGameOver: true, message: reason }));

    return {
        player,
        currentNode: nodes[player.currentPosId],
        actions: { move, pickUpItem, combine, buy, setHp, setGameWon, setGameOver }
    };
};
