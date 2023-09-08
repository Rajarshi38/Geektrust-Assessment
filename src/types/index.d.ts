type UseFetchOptions = {
  queryKey: string | number | [];
  queryFn: () => Promise<T>;
};
