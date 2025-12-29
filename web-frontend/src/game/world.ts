import type { GameNode } from './types';


// Helper to create nodes easily
const createNode = (id: number, name: string, description: string, items: string[] = []): GameNode => ({
    id,
    name,
    description,
    items: items as any[],
    connections: {},
});

/*
Python Map:
initial_pos (0) -> fwd:1
pos1 (1, Rocks) -> fwd:4, back:0, left:2, right:3
pos2 (2, Cave, iron-ore) -> fwd:6, right:1
pos3 (3, Tree, wood) -> fwd:5, left:1
pos4 (4, Dead Animals, leather) -> fwd:7, back:1, left:6, right:5
pos5 (5, Shop, [sword, cross-guard, helmet]) -> back:3, left:4, fwd:11
pos6 (6, Trees, wood) -> right:4, back:2
pos7 (7, River, water) -> fwd:8, back:4, right:11
pos8 (8, Cave, iron-ore) -> fwd:9, back:7
pos9 (9, Dried Carcasses, leather) -> fwd:Final(War), left:10, back:8
pos10 (10, Cave, iron-ore) -> right:9
pos11 (11, Trees, wood) -> left:7, back:5
Final (War) -> Dest
*/

export const NODES: Record<number, GameNode> = {
    0: createNode(0, 'Start', 'You are at the initial position.'),
    1: createNode(1, 'Rocks', 'A rocky area with uneven terrain.', ['rocks']),
    2: createNode(2, 'Cave', 'A dark and quiet cave.', ['iron-ore']),
    3: createNode(3, 'Tree', 'A tall tree with thick branches.', ['wood']),
    4: createNode(4, 'Dead Animals', 'The remains of dried, lifeless animals are scattered here.', ['leather']),
    5: createNode(5, 'Shop', 'A small shop with useful supplies.', []), // Items handled by shop logic, not pickup
    6: createNode(6, 'Trees', 'A cluster of dense trees.', ['wood']),
    7: createNode(7, 'River', 'A calm river flows gently.', ['water']),
    8: createNode(8, 'Cave', 'Another dark cave looms ahead.', ['iron-ore']),
    9: createNode(9, 'Dried Carcasses', 'The bones and dried remains of animals lie here.', ['leather']),
    10: createNode(10, 'Cave', 'A small, cramped cave.', ['iron-ore']),
    11: createNode(11, 'Trees', 'A cluster of dense trees.', ['wood']),
    99: createNode(99, 'War', 'You have reached your destination.'),
};

// Define connections
NODES[0].connections = { forward: 1 };
NODES[1].connections = { forward: 4, backward: 0, left: 2, right: 3 };
NODES[2].connections = { forward: 6, right: 1 };
NODES[3].connections = { forward: 5, left: 1 };
NODES[4].connections = { forward: 7, backward: 1, left: 6, right: 5 };
NODES[5].connections = { backward: 3, left: 4, forward: 11 };
NODES[6].connections = { right: 4, backward: 2 };
NODES[7].connections = { forward: 8, backward: 4, right: 11 };
NODES[8].connections = { forward: 9, backward: 7 };
NODES[9].connections = { forward: 99, left: 10, backward: 8 };
NODES[10].connections = { right: 9 };
NODES[11].connections = { left: 7, backward: 5 };
