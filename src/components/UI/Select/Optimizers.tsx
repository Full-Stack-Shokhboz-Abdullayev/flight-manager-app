import { MenuListProps } from 'react-select';
import { FixedSizeList } from 'react-window';
import { Option } from '../../../typings/types/Option.type';
import { OptionProps } from 'react-select';
import { components } from 'react-select';

export const optimizeSelect = {
  components: {
    MenuList: OptimizedMenuList,
    Option: OptimizedOption,
  },
};

function OptimizedMenuList(props: MenuListProps<Option>) {
  const { options, children, maxHeight, getValue } = props;
  if (!children || !Array.isArray(children)) return null;

  const height = 35;
  const selectedValues = getValue() as Option[];
  const initialOffset = selectedValues[0]
    ? options.indexOf(selectedValues[0]) * height
    : 0;

  return (
    <FixedSizeList
      width={''}
      itemSize={height}
      height={maxHeight}
      itemCount={children.length}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div className="option-wrapper" style={style}>
          {children[index]}
        </div>
      )}
    </FixedSizeList>
  );
}

function OptimizedOption(props: OptionProps<Option>) {
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;
  return <components.Option {...props}>{props.children}</components.Option>;
}
