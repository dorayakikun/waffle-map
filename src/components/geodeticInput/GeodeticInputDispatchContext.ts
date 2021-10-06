import { createContext, useContext } from "react";

type State = {
  changeDatum: (datum: string) => void;
  changeUnit: (unit: string) => void;
};

export const GeodeticInputDispatchContext = createContext<State | {}>({});
export const useGeodeticInputDispatchContext = () => {
  return useContext(GeodeticInputDispatchContext) as State;
};
