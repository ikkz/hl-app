import { createModel } from 'hox';
import { useEffect, useState } from 'react';

export const useVideoInfo = createModel(() => {
  const [fileUri, setFileUri] = useState('file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.1.103-hl-mobile/Camera/3ed86b71-48f3-423a-a35b-e1548415a50d.mp4');

  useEffect(() => {
    console.log('video uri', fileUri);
  }, [fileUri]);

  return { fileUri, setFileUri };
});
