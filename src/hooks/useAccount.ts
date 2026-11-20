import { useCallback, useEffect, useState } from "react";
import {
  endSession,
  getSession,
  startDemoSession,
  type AccountSession,
} from "@/commerce/account";

type State =
  | { status: "loading" }
  | { status: "error" }
  | AccountSession;

/** Sesión de cuenta con sus estados de carga y error. */
export function useAccount() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    getSession()
      .then(setState)
      .catch(() => setState({ status: "error" }));
  }, []);

  useEffect(load, [load]);

  const startDemo = useCallback(() => {
    startDemoSession();
    load();
  }, [load]);

  const signOut = useCallback(() => {
    endSession();
    setState({ status: "signedOut" });
  }, []);

  return { state, retry: load, startDemo, signOut };
}
