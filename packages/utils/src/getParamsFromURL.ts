export default (url: string) => {
    if (!url) return {};
    try {
      const params = new URL(url).searchParams;
      const paramsObj: Record<string, string> = {};
      for (const [key, value] of params.entries()) {
        if (value && value !== "") {
          paramsObj[key] = value;
        }
      }
      return paramsObj;
    } catch (e) {
      return {};
    }
  };