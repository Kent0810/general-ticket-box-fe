import generatePicker from "antd/es/date-picker/generatePicker";
import type { Moment } from "moment";
import momentGenerateConfig from "rc-picker/lib/generate/moment";

const CDatePicker = generatePicker<Moment>(momentGenerateConfig);

export default CDatePicker;
