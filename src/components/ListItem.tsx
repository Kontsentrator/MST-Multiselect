import React, { memo } from "react";

type ListItemProps = {
  item: string;
  checked: boolean;
  onChange(e: React.FormEvent<HTMLInputElement>, id: number): void;
};

const ListItem: React.FC<ListItemProps> = ({ item, checked, onChange }) => {
  return (
    <li className="item">
      <label className="item__wrap">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e, item.indexOf(item))
          }
        />
        <span />

        {item}
      </label>
    </li>
  );
};

export default memo(ListItem);
