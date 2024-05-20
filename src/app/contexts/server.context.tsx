import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ServerContextProps {
  serverStatus: boolean;
  startServer: () => void;
  stopServer: () => void;
  checkServerStatus: () => void;
  logs: Array<any>;
}

const ServerContext = createContext<ServerContextProps | undefined>(undefined);

export const useServer = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};

export const ServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [logs, setLogs] = useState<Array<any>>([]);

  useEffect(() => {
    const handleServerStatus = (_event: any, status: string) => {
      setServerStatus(status === 'started');
    };

    const handleLog = (_event: any, log: any) => {
      const newLog = { children: log, key: Date.now().toString() };
      setLogs((prevLogs) => [...prevLogs, newLog]);
    };

    window.electronAPI.onServerStatus(handleServerStatus);
    window.electronAPI.onLog(handleLog);

    // Initial server status check
    checkServerStatus();
  }, []);

  const startServer = () => {
    window.electronAPI.startServer();
  };

  const stopServer = () => {
    window.electronAPI.stopServer();
  };

  const checkServerStatus = async () => {
    const status = await window.electronAPI.getServerStatus();
    setServerStatus(status);
  };

  return (
    <ServerContext.Provider value={{ serverStatus, startServer, stopServer, checkServerStatus, logs }}>
      {children}
    </ServerContext.Provider>
  );
};
