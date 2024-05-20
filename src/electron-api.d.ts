export interface ElectronAPI {
    startServer: () => void;
    stopServer: () => void;
    onServerStatus: (callback: (event: any, status: string) => void) => void;
    onLog: (callback: (event: any, log: string) => void) => void;
    runGcloudCommand: (command: string) => Promise<string>;
    runGcloudAuth: () => Promise<string>;
    checkGcloudAuth: () => Promise<boolean>;
    revokeGcloudAuth: () => Promise<boolean>;
    getServerStatus: () => Promise<boolean>;
    runGcloudAuthDefaultApp: () => Promise<string>;
    checkGcloudAuthDefaultApp: () => Promise<boolean>;
    revokeGcloudAuthDefaultApp: () => Promise<boolean>;
  }
  
  declare global {
    interface Window {
      electronAPI: ElectronAPI;
    }
  }
  