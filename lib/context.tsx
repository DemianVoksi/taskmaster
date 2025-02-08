'use client';

import React, { createContext, useContext, useState } from 'react';

interface GlobalState {
	data: Record<string, any>;
	updated: boolean;
}

interface GlobalStateContextType {
	helper: GlobalState;
	setHelper: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
	undefined
);

export const GlobalStateProvider: React.FC<{
	children: React.ReactNode;
	initialState?: GlobalState;
}> = ({ children, initialState }) => {
	const [helper, setHelper] = useState<GlobalState>({
		data: initialState?.data || {},
		updated: initialState?.updated || false,
	});

	return (
		<GlobalStateContext.Provider value={{ helper, setHelper }}>
			{children}
		</GlobalStateContext.Provider>
	);
};

export const useGlobalState = (): GlobalStateContextType => {
	const context = useContext(GlobalStateContext);
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalStateProvider');
	}
	return context;
};
