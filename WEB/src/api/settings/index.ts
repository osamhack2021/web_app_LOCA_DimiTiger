import useAxios from '../../hooks/useAxios';
import usePaginationQuery from '../../hooks/usePaginationQuery';
import Setting from '../../types/Setting';

export function useSettings() {
  return usePaginationQuery<Setting>('/settings');
}

export function useUploadFile(imageFile: FileList) {
  const axios = useAxios();
  return axios.post(`/files/upload`, imageFile);
}
