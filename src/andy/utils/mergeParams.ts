import _ from "lodash";

export default (object: any, sources: any) => {
  return _.mergeWith(object, sources, (objValue, srcValue) => {
    // console.log(objValue, srcValue);
    if (srcValue) {
      return srcValue;
    }
    return objValue;
  });
};
