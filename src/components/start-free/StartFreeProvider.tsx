"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { defaultPhoneCountry } from "@/data/phone";
import type { DomainStatus } from "@/lib/domainCheck";

export interface StartFreeState {
  domain: string;
  domainStatus: DomainStatus;
  selectedModules: string[];
  fullName: string;
  workEmail: string;
  phone: string;
  phoneCountry: string;
  jobTitle: string;
  companyName: string;
  companySize: string;
  inviteEmails: string[];
  termsAccepted: boolean;
}

const initialState: StartFreeState = {
  domain: "",
  domainStatus: "idle",
  selectedModules: [],
  fullName: "",
  workEmail: "",
  phone: "",
  phoneCountry: defaultPhoneCountry,
  jobTitle: "",
  companyName: "",
  companySize: "",
  inviteEmails: [],
  termsAccepted: false,
};

type Action =
  | { type: "setDomain"; domain: string }
  | { type: "setDomainStatus"; status: DomainStatus }
  | { type: "toggleModule"; slug: string; limit: number }
  | { type: "updateDetails"; patch: Partial<StartFreeState> }
  | { type: "addInviteEmail"; email: string }
  | { type: "removeInviteEmail"; email: string }
  | { type: "setTermsAccepted"; accepted: boolean }
  | { type: "restore"; state: StartFreeState };

const STORAGE_KEY = "sortboxs.startfree.v1";

function update(state: StartFreeState, action: Exclude<Action, { type: "restore" }>): StartFreeState {
  switch (action.type) {
    case "setDomain":
      return { ...state, domain: action.domain, domainStatus: "idle" };
    case "setDomainStatus":
      return { ...state, domainStatus: action.status };
    case "toggleModule": {
      const isSelected = state.selectedModules.includes(action.slug);
      if (isSelected) return { ...state, selectedModules: state.selectedModules.filter((slug) => slug !== action.slug) };
      if (state.selectedModules.length >= action.limit) return state;
      return { ...state, selectedModules: [...state.selectedModules, action.slug] };
    }
    case "updateDetails":
      return { ...state, ...action.patch };
    case "addInviteEmail":
      return state.inviteEmails.includes(action.email) ? state : { ...state, inviteEmails: [...state.inviteEmails, action.email] };
    case "removeInviteEmail":
      return { ...state, inviteEmails: state.inviteEmails.filter((email) => email !== action.email) };
    case "setTermsAccepted":
      return { ...state, termsAccepted: action.accepted };
  }
}

function reducer(state: StartFreeState, action: Action): StartFreeState {
  if (action.type === "restore") return action.state;
  return update(state, action);
}

function readStored(): StartFreeState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<StartFreeState>;
    // Consent is per submission, so it's never restored.
    return { ...initialState, ...saved, termsAccepted: false };
  } catch {
    return null;
  }
}

/** After a successful submission, the next visit starts fresh. */
export function clearSavedStartFree() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing saved, or storage blocked.
  }
}

interface StartFreeContextValue {
  state: StartFreeState;
  dispatch: Dispatch<Action>;
}

const StartFreeContext = createContext<StartFreeContextValue | null>(null);

/** Holds Start Free's state across both steps. Saved to sessionStorage so a refresh keeps it. */
export function StartFreeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = readStored();
    if (saved) dispatch({ type: "restore", state: saved });
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked: the flow still works for this page view.
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StartFreeContext.Provider value={value}>{children}</StartFreeContext.Provider>;
}

export function useStartFree() {
  const context = useContext(StartFreeContext);
  if (!context) throw new Error("useStartFree must be used inside <StartFreeProvider>");
  return context;
}
