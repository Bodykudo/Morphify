'use client';

import { useEffect, useReducer, useRef } from 'react';
import ReactDropzone from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { LuFileSymlink } from 'react-icons/lu';
import { loadFFmpeg } from '@/lib/ffmpeg';
import { acceptedFiles } from '@/lib/constants';
import { useToast } from './ui/use-toast';
import FilesList from './FilesList';
import {
  StateType,
  ReducerAction,
  REDUCER_ACTION_TYPE,
  Action,
  UpdateActionPayload,
} from '@/types';

const initialState: StateType = {
  isHover: false,
  actions: [],
  files: [],
  isReady: true,
  isLoaded: false,
  isConverting: false,
  isDone: false,
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_ACTIONS:
      return { ...state, actions: action.payload as Action[] };
    case REDUCER_ACTION_TYPE.SET_CONVERTING:
      return { ...state, isConverting: action.payload as boolean };
    case REDUCER_ACTION_TYPE.SET_DONE:
      return { ...state, isDone: action.payload as boolean };
    case REDUCER_ACTION_TYPE.SET_FILES:
      return { ...state, files: action.payload as any[] };
    case REDUCER_ACTION_TYPE.SET_HOVER:
      return { ...state, isHover: action.payload as boolean };
    case REDUCER_ACTION_TYPE.SET_READY:
      return { ...state, isReady: action.payload as boolean };
    case REDUCER_ACTION_TYPE.SET_LOADED:
      return { ...state, isLoaded: action.payload as boolean };
    case REDUCER_ACTION_TYPE.RESET:
      return { ...initialState, isLoaded: state.isLoaded };
    case REDUCER_ACTION_TYPE.UPDATE_ACTION_TO:
      const { fileName, to } = action.payload as UpdateActionPayload;
      return {
        ...state,
        actions: state.actions.map((currAction) => {
          if (currAction.fileName === fileName) {
            return {
              ...currAction,
              to,
            };
          }
          return currAction;
        }),
      };
    case REDUCER_ACTION_TYPE.DELETE_ACTION:
      const { fileName: name } = action.payload as Action;
      return {
        ...state,
        actions: state.actions.filter(
          (currAction) => currAction !== (action.payload as Action)
        ),
        files: state.files.filter((file) => file.name !== name),
      };
    default:
      throw new Error('Not supported action type');
  }
};

export default function Dropzone() {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(reducer, initialState);
  const ffmpegRef = useRef<any>(null);

  const handleLoad = async () => {
    const ffmpeg = await loadFFmpeg();
    ffmpegRef.current = ffmpeg;
    dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADED, payload: true });
  };

  useEffect(() => {
    handleLoad();
  }, []);
  const handleUpload = (data: any[]) => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_HOVER, payload: false });
    dispatch({ type: REDUCER_ACTION_TYPE.SET_FILES, payload: data });
    const temp: Action[] = [];
    data.forEach((file) => {
      const formData = new FormData();
      temp.push({
        fileName: file.name,
        fileSize: file.size,
        from: file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2),
        to: null,
        fileType: file.type,
        file,
        isConverted: false,
        isConverting: false,
        isError: false,
      });
    });
    dispatch({ type: REDUCER_ACTION_TYPE.SET_ACTIONS, payload: temp });
  };

  const handleError = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_HOVER, payload: false });
    toast({
      variant: 'destructive',
      title: 'Error uploading your file(s)',
      description: 'Allowed Files: Audio, Video and Images.',
      duration: 5000,
    });
  };

  useEffect(() => {
    if (state.actions.length === 0) {
      dispatch({ type: REDUCER_ACTION_TYPE.RESET });
    } else {
      let temp = true;
      state.actions.forEach((action: Action) => {
        if (!action.to) temp = false;
      });
      dispatch({ type: REDUCER_ACTION_TYPE.SET_READY, payload: temp });
    }
  }, [state.actions]);

  if (state.actions.length > 0) {
    return (
      <FilesList
        actions={state.actions}
        isConverting={state.isConverting}
        isLoaded={state.isLoaded}
        isDone={state.isDone}
        isReady={state.isReady}
        ffmpegRef={ffmpegRef}
        dispatch={dispatch}
      />
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      accept={acceptedFiles}
      onDragEnter={() =>
        dispatch({ type: REDUCER_ACTION_TYPE.SET_HOVER, payload: true })
      }
      onDragLeave={() =>
        dispatch({ type: REDUCER_ACTION_TYPE.SET_HOVER, payload: false })
      }
      onDropRejected={handleError}
      onError={handleError}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className='bg-gray-50 h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center dark:bg-gray-900 border-gray-400 dark:border-gray-600'
        >
          <input {...getInputProps()} />
          <div className='space-y-4 text-gray-500 dark:text-gray-200'>
            {state.isHover ? (
              <div className='flex flex-col gap-6'>
                <div className='justify-center flex text-6xl'>
                  <LuFileSymlink />
                </div>
                <h3 className='text-center font-medium text-2xl'>
                  Yes, right there
                </h3>
              </div>
            ) : (
              <div className='flex flex-col gap-6'>
                <div className='justify-center flex text-6xl'>
                  <FiUploadCloud />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-center font-medium text-2xl'>
                    Click, or drop your files here
                  </h3>
                  <p className='text-center font-medium text-sm'>
                    Allowed Files: Audio, Video and Images
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
}
