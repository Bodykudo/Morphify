import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { getFileExtension, removeFileExtension } from './utils';
import { Action } from '@/types';

export const loadFFmpeg = async (): Promise<FFmpeg> => {
  const ffmpeg = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  return ffmpeg;
};

export const convertFile = async (
  ffmpeg: FFmpeg,
  action: Action
): Promise<{ url: string; output: string }> => {
  const { file, to, fileName, fileType } = action;
  const input = getFileExtension(fileName);
  const output = removeFileExtension(fileName) + '.' + to;
  ffmpeg.writeFile(input, await fetchFile(file));

  let ffmpedCMD = [];
  if (to === '3gp')
    ffmpedCMD = [
      '-i',
      input,
      '-r',
      '20',
      '-s',
      '352x288',
      '-vb',
      '400k',
      '-acodec',
      'aac',
      '-strict',
      'experimental',
      '-ac',
      '1',
      '-ar',
      '8000',
      '-ab',
      '24k',
      output,
    ];
  else ffmpedCMD = ['-i', input, output];

  // Excude FFmpeg CMD
  await ffmpeg.exec(ffmpedCMD);

  const data = await ffmpeg.readFile(output);
  const blob = new Blob([data], { type: fileType.split('/')[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
};
