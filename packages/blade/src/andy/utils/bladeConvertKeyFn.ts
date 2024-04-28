export const ArrayToStringConvert = {
  convertValue: (value: any) => {
    // console.log("firstvalue", value, typeof value === "string");
    if (typeof value === "string") {
      return value.split(",");
    }

    return value;
  },
  transform: (value: any, namePath: string) => {
    // console.log("transform", Array.isArray(value));
    if (Array.isArray(value)) {
      return {
        [namePath]: value.join(","),
      };
    }
    return {
      [namePath]: value,
    };
  },
};
