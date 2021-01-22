import { useEffect, useState } from 'react';
import { useProfileQuery } from '../types/generated-types-and-hooks';

type LocalUser = {
  username: string;
  carIds: string[];
};

const useUser = () => {
  const [user, setUser] = useState<LocalUser | null>(null);

  const { data } = useProfileQuery({ errorPolicy: 'all' });

  useEffect(() => {
    const profile = data?.profile;
    setUser(
      profile
        ? {
            username: profile.username,
            carIds: profile.cars.map((c) => c.id),
          }
        : null,
    );
  }, [data]);

  return {
    user,
  };
};

export default useUser;
