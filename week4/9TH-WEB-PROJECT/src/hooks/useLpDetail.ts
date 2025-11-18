import { useQuery } from '@tanstack/react-query'; 
import type { UseQueryResult } from '@tanstack/react-query'; 
import { getLpDetail, type Lp } from '../apis/lp';

export const useLpDetail = (lpid: string | undefined): UseQueryResult<Lp, Error> => {
  const idAsNumber = lpid ? parseInt(lpid, 10) : undefined;
  
  const enabled = idAsNumber !== undefined && !isNaN(idAsNumber);

  return useQuery<Lp, Error>({
    queryKey: ['lp', lpid], 
    queryFn: () => getLpDetail(idAsNumber!), 
    
    enabled: enabled,
  });
};