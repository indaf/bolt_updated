import { ContextType, createContext, useEffect, useState } from "react";

const ToolsContext = createContext<ContextType<any>>(undefined as any);

function ToolsProvider({ children }: any) {
  const [selectedExercise, setSelectedExercise] = useState<number>(-1);
  return (
    <ToolsContext.Provider
      value={{
        selectedExercise,
        setSelectedExercise,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
}
export { ToolsContext, ToolsProvider };
