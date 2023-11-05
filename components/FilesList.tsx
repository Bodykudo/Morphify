'use client';

import { BiError } from 'react-icons/bi';
import { ImSpinner3 } from 'react-icons/im';
import { HiOutlineDownload } from 'react-icons/hi';
import { MdDone, MdClose } from 'react-icons/md';
import { extensions } from '@/lib/constants';
import { Skeleton } from './ui/skeleton';
import { bytesToSize, compressFileName } from '@/lib/utils';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import FileIcon from './FileIcon';

import { convertFile } from '@/lib/ffmpeg';
import { Action, REDUCER_ACTION_TYPE } from '@/types';

type Props = {
  actions: Action[];
  isLoaded: boolean;
  isDone: boolean;
  isReady: boolean;
  isConverting: boolean;
  ffmpegRef: any;
  dispatch: any;
};

export default function FilesList({
  actions,
  isLoaded,
  isDone,
  isReady,
  isConverting,
  ffmpegRef,
  dispatch,
}: Props) {
  const reset = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.RESET });
  };

  const updateAction = (fileName: string, to: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_ACTION_TO,
      payload: { fileName, to },
    });
  };

  const deleteAction = (action: Action) => {
    dispatch({ type: REDUCER_ACTION_TYPE.DELETE_ACTION, payload: action });
  };

  const handleDownloadAll = () => {
    for (let action of actions) {
      !action.isError && handleDownload(action);
    }
  };

  const handleDownload = (action: Action) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = action.url;
    a.download = action.output;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  const convert = async () => {
    let temp = actions.map((action) => ({
      ...action,
      isConverting: true,
    }));
    dispatch({ type: REDUCER_ACTION_TYPE.SET_ACTIONS, payload: temp });
    dispatch({ type: REDUCER_ACTION_TYPE.SET_CONVERTING, payload: true });
    for (let action of temp) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        temp = temp.map((currAction) =>
          currAction === action
            ? {
                ...currAction,
                isConverted: true,
                isConverting: false,
                url,
                output,
              }
            : currAction
        );
        dispatch({ type: REDUCER_ACTION_TYPE.SET_ACTIONS, payload: temp });
      } catch (error) {
        temp = temp.map((currAction) =>
          currAction === action
            ? {
                ...currAction,
                isConverted: false,
                isConverting: false,
                isError: true,
              }
            : currAction
        );
        dispatch({ type: REDUCER_ACTION_TYPE.SET_ACTIONS, payload: temp });
      }
    }
    dispatch({ type: REDUCER_ACTION_TYPE.SET_DONE, payload: true });
    dispatch({ type: REDUCER_ACTION_TYPE.SET_CONVERTING, payload: false });
  };

  return (
    <div className='space-y-6'>
      {actions.map((action: Action, i: number) => (
        <div
          key={i}
          className='w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between dark:bg-gray-800 dark:border-gray-700'
        >
          {!isLoaded && (
            <Skeleton className='h-full w-full -ml-10 cursor-progress absolute rounded-xl' />
          )}

          <div className='flex gap-4 items-center'>
            <span className='text-2xl text-sky-600'>
              {<FileIcon fileType={action.fileType} />}
            </span>
            <div className='flex items-center gap-1 w-96'>
              <span className='font-medium overflow-x-hidden dark:text-gray-100'>
                {compressFileName(action.fileName)}
              </span>
              <span className='text-gray-400 text-sm'>
                ({bytesToSize(action.fileSize)})
              </span>
            </div>
          </div>

          {action.isError ? (
            <Badge variant='destructive' className='flex gap-2'>
              <span>Error Converting File</span>
              <BiError />
            </Badge>
          ) : action.isConverted ? (
            <Badge variant='default' className='flex gap-2 bg-green-500'>
              <span>Done</span>
              <MdDone />
            </Badge>
          ) : action.isConverting ? (
            <Badge variant='default' className='flex gap-2'>
              <span>Converting</span>
              <span className='animate-spin'>
                <ImSpinner3 />
              </span>
            </Badge>
          ) : (
            <div className='text-gray-400 flex items-center gap-4'>
              <span>Convert to</span>
              <Select
                value={action.to?.toLowerCase() || ''}
                onValueChange={(value) => updateAction(action.fileName, value)}
              >
                <SelectTrigger className='w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 font-medium dark:bg-gray-900 dark:text-gray-50 dark:border-gray-900'>
                  <SelectValue placeholder='...' />
                </SelectTrigger>
                <SelectContent className='h-fit dark:bg-gray-900 dark:border-gray-900 dark:text-gray-50'>
                  {action.fileType.includes('image') && (
                    <div className='grid grid-cols-2 gap-2 w-ft'>
                      {extensions.image.map((ext: string) => (
                        <div key={ext} className='col-span-1 text-center'>
                          <SelectItem value={ext} className='mx-auto'>
                            {ext}
                          </SelectItem>
                        </div>
                      ))}
                    </div>
                  )}
                  {action.fileType.includes('video') && (
                    <Tabs defaultValue='video' className='w-full'>
                      <TabsList className='w-full'>
                        <TabsTrigger value='video' className='w-full'>
                          Video
                        </TabsTrigger>
                        <TabsTrigger value='audio' className='w-full'>
                          Audio
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value='video'>
                        <div className='grid grid-cols-3 gap-2 w-fit'>
                          {extensions.video.map((ext: string) => (
                            <div key={ext} className='col-span-1 text-center'>
                              <SelectItem value={ext} className='mx-auto'>
                                {ext}
                              </SelectItem>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value='audio'>
                        <div className='grid grid-cols-3 gap-2 w-fit'>
                          {extensions.audio.map((ext: string) => (
                            <div key={ext} className='col-span-1 text-center'>
                              <SelectItem value={ext} className='mx-auto'>
                                {ext}
                              </SelectItem>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                  {action.fileType.includes('audio') && (
                    <div className='grid grid-cols-2 gap-2 w-fit'>
                      {extensions.audio.map((ext: string) => (
                        <div key={ext} className='col-span-1 text-center'>
                          <SelectItem value={ext} className='mx-auto'>
                            {ext}
                          </SelectItem>
                        </div>
                      ))}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {action.isConverted ? (
            <Button variant='outline' onClick={() => handleDownload(action)}>
              Download
            </Button>
          ) : (
            <span
              onClick={() => deleteAction(action)}
              className='cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400 dark:hover:bg-gray-600 dark:text-gray-50'
            >
              <MdClose />
            </span>
          )}
        </div>
      ))}
      <div className='flex w-full justify-end'>
        {isDone ? (
          <div className='space-y-4 w-fit'>
            <Button
              size='lg'
              className='rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full'
              onClick={handleDownloadAll}
            >
              {actions.length > 1 ? 'Download All' : 'Download'}
              <HiOutlineDownload />
            </Button>
            <Button
              size='lg'
              onClick={reset}
              variant='outline'
              className='rounded-xl'
            >
              Convert Another File(s)
            </Button>
          </div>
        ) : (
          <Button
            size='lg'
            disabled={!isReady || isConverting}
            className='rounded-xl font-semibold relative py-4 flex items-center w-44'
            onClick={convert}
          >
            {isConverting ? (
              <span className='animate-spin text-lg'>
                <ImSpinner3 />
              </span>
            ) : (
              <span>Convert Now</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
