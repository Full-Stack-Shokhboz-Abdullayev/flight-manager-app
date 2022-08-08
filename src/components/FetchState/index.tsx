import { FC, memo } from 'react';

import { UseDateReturnType } from '../../typings/types/UseData.type';
import Error from '../Error';
import Loading from '../Loading';

const FetchState: FC<{
  fetchState: UseDateReturnType<any>;
  children: (data: any) => React.ReactNode;
}> = ({ fetchState: { data, error, loading }, children }) => {
  if (error) {
    return <Error message={error} />;
  } else if (!data || loading) {
    return <Loading />;
  }
  return <>{children(data)}</>;
};

export default memo(FetchState);
