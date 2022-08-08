import './Select.style.scss';

import { FC, memo } from 'react';
import Select, { createFilter } from 'react-select';

import { Option } from '../../../typings/types/Option.type';
import { optimizeSelect } from './Optimizers';

const UISelect: FC<{
  name?: string;
  id?: string;
  value: Option;
  className?: string;
  onChange: (e: any) => void;
  options: Option[];
}> = ({ id, name, value, onChange, options, className }) => {
  return (
    <Select<Option>
      className={`select-dropdown ${className}`}
      id={id}
      value={value.value ? value : null}
      onChange={onChange}
      name={name}
      components={optimizeSelect.components}
      filterOption={createFilter({ ignoreAccents: false })}
      options={options as any}
      styles={{
        option: (styles, state) => ({
          ...styles,
          backgroundColor: state.isSelected ? '#0080ff' : '#fff',
          '&:hover': {
            backgroundColor: state.isSelected ? '#0080ff' : '#BCDDE6',
          },
        }),
      }}
    />
  );
};

export default memo(UISelect);
