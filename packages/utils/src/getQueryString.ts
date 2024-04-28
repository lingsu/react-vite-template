export default (
    query: any,
    opts?: Record<string, string>,
  ) => {
    const queryString = new URLSearchParams({
      ...(query as Record<string, string>),
      ...opts,
    }).toString();
    return `${queryString ? "?" : ""}${queryString}`;
  };