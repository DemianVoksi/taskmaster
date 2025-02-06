import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextProps = {
	test: string;
};

export const SiteContext = createContext<ContextProps | null>(null);

export const SiteContextProvider = ({ children }: { children: ReactNode }) => {
	const test = 'test';

	return (
		<SiteContext.Provider
			value={{
				test,
			}}
		>
			{children}
		</SiteContext.Provider>
	);
};

export const useSiteContext = () => {
	return useContext(SiteContext);
};
