import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';


type SocketType = Socket | null;

const SocketContext = createContext<SocketType>(null);

export function useSocket(): SocketType {
  return useContext(SocketContext);
}

interface AdminSocketProviderProps {
  children: ReactNode;
}

export const AdminSocketProvider = ({ children }: AdminSocketProviderProps) => {
  const [socket, setSocket] = useState<SocketType>(null);

  useEffect(() => {
    const newSocket =io(import.meta.env.VITE_PUBLIC_API_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
