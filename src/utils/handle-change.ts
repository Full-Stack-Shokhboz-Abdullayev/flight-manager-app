import { Option } from '../typings/types/Option.type';

export const handleChange =
  (
    setter: (value: ((prev: any) => any) | any) => void,
    querySetter: (value: ((prev: any) => any) | any) => void,
    searchString: string,
    prev: Record<string, string> = {},
  ) =>
  (option: Option) => {
    setter(option);
    querySetter({
      ...prev,
      [searchString]: option.value,
    });
  };
