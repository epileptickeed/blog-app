import { useQuery } from 'react-query';
import GetProfileData from '../utils/GetProfileData';

export default function useGetProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: GetProfileData,
  });
}
