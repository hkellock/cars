import { useReactiveVar } from '@apollo/client';
import { userVar } from '../client';
import { useProfileQuery } from '../types/generated-types-and-hooks';

const useUser = () => {
  useProfileQuery();
  return useReactiveVar(userVar);
};

export default useUser;
