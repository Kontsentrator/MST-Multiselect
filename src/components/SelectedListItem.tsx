import React, { memo } from 'react';
import { IItem } from 'interfaces/interfaces';

import delete_img from 'img/Clear.svg';

type SelectedListItemProps = {
    item: IItem | string,
    handleDeleteClick(id: number): void
}

const SelectedListItem: React.FC<SelectedListItemProps> = ({item, handleDeleteClick}) => {
    return(
        <li className="selected-item">
            <div className="selected-item__wrap">
                <span className="selected-item__text">
                    {typeof item === "string" ? item : item.title}
                </span>er
                
                <button className="button-clear" 
                    onClick={() => handleDeleteClick(typeof item === "string" ? item.indexOf(item) : item.id)}>
                    <img src={delete_img} alt="Убрать" />
                </button>
            </div>
        </li>
    );
}

export default memo(SelectedListItem);