interface Hit {
  view: boolean;
  result: string;
  gameOver: boolean;
}

export interface PuzzleMemoryState {
  asertions: Hit;
  reset: boolean;
}

interface HitView {
  name: string;
  id: number;
}
interface PuzzleMemoryStateReducer {
  reset: boolean;
  memoryHit: number[];
  cacheHit: number[];
  cacheMemory: HitView[];
  newGame: Hit;
}
export const INITIAL_STATE_GAME: Hit = {
  view: false,
  result: '',
  gameOver: false,
};
export type PuzzleMemoryActionReducer =
  | {
      type: '@memory/gameover';
      payload: Hit;
    }
  | {
      type: '@memory/cache';
      payload: HitView;
    }
  | {
      type: '@memory/hit';
    }
  | {
      type: '@memory/newgame';
    };
export const INITIAL_STATE: PuzzleMemoryStateReducer = {
  reset: false,
  memoryHit: [],
  cacheHit: [],
  cacheMemory: [],
  newGame: INITIAL_STATE_GAME,
};

export function reducerPuzzleMemory(
  state: PuzzleMemoryStateReducer,
  action: PuzzleMemoryActionReducer
) {
  switch (action.type) {
    case '@memory/cache': {
      console.log(state.cacheMemory.length, `LONGITUD`);

      if (state.cacheMemory.length <= 1) {
        const includePokeMemoryHit: boolean = state.memoryHit.includes(
          action.payload.id
        );
        const includePokeCacheHit: boolean = state.cacheHit.includes(
          action.payload.id
        );
        if (includePokeMemoryHit || includePokeCacheHit)
          return {
            ...state,
          };

        if (state.cacheMemory.length === 1) {
          state.cacheMemory[0].id !== action.payload.id &&
            (state = {
              ...state,
              cacheMemory: [...state.cacheMemory, action.payload],
            });

          return {
            ...state,
            cacheHit: [...state.cacheHit, action.payload.id],
          };
        } else {
          return {
            ...state,
            cacheMemory: [action.payload],
            cacheHit: [action.payload.id],
          };
        }
      }
      console.log({ state });
      return state;
    }

    case '@memory/gameover': {
      return {
        ...state,
        newGame: action.payload,
      };
    }

    case '@memory/hit': {
      console.log(`SOY IGUAL A DOS`);

      return state.cacheMemory[0].name === state.cacheMemory[1].name
        ? (state = {
            ...state,
            memoryHit: [
              ...state.memoryHit,
              state.cacheMemory[0].id,
              state.cacheMemory[1].id,
            ],
            cacheMemory: [],
            cacheHit: [],
          })
        : (state = {
            ...state,
            cacheMemory: [],
            cacheHit: [],
          });
    }

    case '@memory/newgame': {
      state = INITIAL_STATE;
      return {
        ...state,
        // reset: !state.reset,
      };
    }

    default:
      return state;
  }
}
