interface Window {
    ethereum?: {
      request: ({ method }: { method: string, params?: any[] }) => Promise<any>;
    };
  }