import React, { memo } from 'react';
import { IItem } from 'interfaces/interfaces';

import delete_img from 'img/Clear.svg';

type SelectedListItemProps = {
    item: IItem,
    handleDeleteClick(id: number): void
}

const SelectedListItem: React.FC<SelectedListItemProps> = ({item, handleDeleteClick}) => {
    return(
        <li className="selected-item">
            <span className="selected-item__text">{item.title}</span>
            <button className="button-clear" onClick={() => handleDeleteClick(item.id)}><img src={delete_img} alt="Убрать" /></button>
        </li>
    );
}

export default memo(SelectedListItem);