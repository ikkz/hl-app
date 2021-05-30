import { createModel } from 'hox';
import { useEffect, useState } from 'react';

export const useVideoInfo = createModel(() => {
  const [fileUri, setFileUri] = useState(
    'file:///data/user/0/hl.ketra.fun/cache/Camera/38da2b4c-9874-41af-928f-fe9d03b8aa56.mp4'
  );

  useEffect(() => {
    console.log('video uri', fileUri);
  }, [fileUri]);

  return { fileUri, setFileUri };
});
