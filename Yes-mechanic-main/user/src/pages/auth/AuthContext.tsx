import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
// import { loginUser } from '../../features/auth';

type AuthContextType = {
	isAuthenticated: boolean;
	login: (data: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		setIsAuthenticated(!!token);
	}, []);

	const login = (data: string) => {
		try {
			localStorage.setItem('authToken', data);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
