import React, { memo } from "react";

type SelectedListItemProps = {
  item: string;
  handleDeleteClick(id: number): void;
};

const SelectedListItem: React.FC<SelectedListItemProps> = ({
  item,
  handleDeleteClick,
}) => {
  return (
    <li className="selected-item">
      <div className="selected-item__wrap">
        <span className="selected-item__text">{item}</span>

        <button
          className="button-clear"
          onClick={() => handleDeleteClick(item.indexOf(item))}
        />
      </div>
    </li>
  );
};

export default memo(SelectedListItem);
