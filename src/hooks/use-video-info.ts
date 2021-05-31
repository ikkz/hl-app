import { createModel } from 'hox';
import { useEffect, useState } from 'react';

export const useVideoInfo = createModel(() => {
  const [fileUri, setFileUri] = useState('');

  useEffect(() => {
    console.log('video uri', fileUri);
  }, [fileUri]);

  return { fileUri, setFileUri };
});
