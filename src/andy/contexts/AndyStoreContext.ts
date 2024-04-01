import { createContext } from 'react';

import { useBearStore } from '../store';

const StoreContext = createContext<typeof useBearStore | null>(null);

export const Provider = StoreContext.Provider;
export default StoreContext;
