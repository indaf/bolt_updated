import { ContextType, createContext } from "react";

const SocketContext = createContext<ContextType<any>>(undefined as any);

function SocketProvider({ children }: any) {
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
}
export { SocketContext, SocketProvider };
