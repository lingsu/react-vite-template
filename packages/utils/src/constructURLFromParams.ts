export default (
    url: string,
    params: Record<string, string>,
  ) => {
    if (!url) return "";
    try {
      const newURL = new URL(url);
      for (const [key, value] of Object.entries(params)) {
        if (value === "") {
          newURL.searchParams.delete(key);
        } else {
          newURL.searchParams.set(key, value);
        }
      }
      return newURL.toString();
    } catch (e) {
      return "";
    }
  };