import { createModel } from 'hox';
import { useState } from 'react';

export const useAuth = createModel(() => {
  const [loginned, setLoginned] = useState(false);

  return { loginned };
});
