import { useContext } from "react";

import { DashboardContext } from "./DashboardLayout";

// Hook so that context values are accessible througout it the app
export const useDashboardContext = () => {
  // https://reacttraining.com/blog/react-context-with-typescript
  let context = useContext(DashboardContext);

  // If context is undefined, we know we used the component
  // outside of our provider so we can throw a more helpful
  // error!
  if (context === undefined) {
    throw Error(
      "item must be used inside of the provider, " +
        "otherwise it will not function correctly."
    );
  }

  // Because of TypeScript's type narrowing, if we make it past
  // the error the compiler knows that context is always defined
  // at this point, so we don't need to do any conditional
  // checking on its values when we use this hook!
  return context;
};
