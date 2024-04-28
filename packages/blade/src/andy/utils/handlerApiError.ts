import { message } from "antd";
import _ from "lodash";

export default (error: any) => {
  if (error.info && error.info.message) {
    message.error(_.values(error.info.message).join(""));
  }
};
