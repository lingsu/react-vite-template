export default (params: any) => {
  if ("pageSize" in params) {
    params.size = params.pageSize;
    delete params.pageSize;
  }

  return params;
};
