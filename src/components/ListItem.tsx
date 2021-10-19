import React, { memo } from "react";

type ListItemProps = {
  item: string;
  id: number
  checked: boolean;
  onChange(e: React.FormEvent<HTMLInputElement>, id: number): void;
};

const ListItem: React.FC<ListItemProps> = ({ item, id, checked, onChange }) => {
  return (
    <li className="item">
      <label className="item__wrap">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e, id)
          }
        />
        <span />

        {item}
      </label>
    </li>
  );
};

export default memo(ListItem);
