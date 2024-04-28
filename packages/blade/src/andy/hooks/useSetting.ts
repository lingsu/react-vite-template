import { useSWRImmutableFetcher } from "./useSWRFetcher";
type ParaTable = {
  project_category: SelectType;
  project_label: SelectType;
  data_flip: SelectType;
  data_scale: SelectType;
  data_translation: SelectType;
  data_rotation: SelectType;
  data_crop: SelectType;
  data_noise: SelectType;
  optim_func: SelectType;
  loss_func: SelectType;
  label_type: SelectType;
  data_type: SelectType;
  share_type: SelectType;
};
type SelectType = {
  description: string;
  type: string;
  option?: string[];
  default: null | string | number;
  page: string;
};

// type NumberType = {
//   description: string;
//   type: string;
//   default: number;
// };

const useSetting = (key: keyof ParaTable) => {
  const { data } = useSWRImmutableFetcher<ParaTable>(`/config/para_table`);
  // console.log("data", data);

  if (data) {
    // var option: { default: any; option: { value: string; label: string }[] } = ;
    return {
      default: data[key].default,
      option: data[key].option?.map((key) => ({ value: key, label: key })),
    };
  }

  return null;
};
export const useSettings = (keys?: (keyof ParaTable)[]) => {
  const { data } = useSWRImmutableFetcher<ParaTable>(`/config/para_table`);
  // console.log("data", data);

  if (data) {
    // var option: { default: any; option: { value: string; label: string }[] } = ;
    if (!keys) {
      keys = Object.keys(data) as any;
    }
    return [
      keys!.reduce((acc, key) => {
        acc[key] = data[key].default;
        return acc;
      }, {} as Record<string, any>),
      keys!.reduce(
        (acc, key) => {
          acc[key] = {
            default: data[key].default,
            option: data[key].option?.map((key) => ({
              value: key,
              label: key,
            })),
          };
          return acc;
        },
        {} as Record<
          string,
          {
            default: string | number | null;
            option:
              | {
                  value: string;
                  label: string;
                }[]
              | undefined;
          }
        >
      ),
    ];
  }

  return [null,null];
};
// const useSettingOption = (
//   key: keyof Pick<ParaTable, "project_category" | "project_label" | "data_flip" |"data_translation">
// ) => {
//   const data = useSetting(key) as SelectType;

//   if (data) {
//     // var option: { default: any; option: { value: string; label: string }[] } = ;
//     return {
//       default: data.default,
//       option: data.option.map((key) => ({ value: key, label: key })),
//     };
//   }
//   return null;
// };

export default useSetting;
// export { useSettingOption };
