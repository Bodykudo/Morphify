export type Action = {
  file: any;
  fileName: string;
  fileSize: number;
  from: string;
  to: String | null;
  fileType: string;
  isConverting?: boolean;
  isConverted?: boolean;
  isError?: boolean;
  url?: any;
  output?: any;
};

export type StateType = {
  isHover: boolean;
  actions: Action[];
  files: any[];
  isReady: boolean;
  isLoaded: boolean;
  isConverting: boolean;
  isDone: boolean;
};

export enum REDUCER_ACTION_TYPE {
  RESET,
  SET_ACTIONS,
  SET_CONVERTING,
  SET_DONE,
  SET_FILES,
  SET_HOVER,
  SET_READY,
  SET_LOADED,
  UPDATE_ACTION_TO,
  DELETE_ACTION,
}

export type UpdateActionPayload = {
  fileName: string;
  to: string;
};

export type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: boolean | any[] | Action[] | UpdateActionPayload | Action;
};
