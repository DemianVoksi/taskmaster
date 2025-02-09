'use client';

import { FetchedTask } from '@/types/types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextType = {
	currentTasks: FetchedTask[] | null;
	setCurrentTasks: React.Dispatch<React.SetStateAction<FetchedTask[] | null>>;
};

export const StateContext = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentTasks, setCurrentTasks] = useState<FetchedTask[] | null>(null);

	return (
		<StateContext.Provider value={{ currentTasks, setCurrentTasks }}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = (): ContextType => {
	const context = useContext(StateContext);
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalStateProvider');
	}
	return context;
};
