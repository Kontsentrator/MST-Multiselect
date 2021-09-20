import React from 'react';
import {IItem} from 'interfaces/interfaces';

type ListItemProps = {
    item: IItem,
    checked: boolean
    onChange(e: React.FormEvent<HTMLInputElement>, id: number): void
}

const ListItem: React.FC<ListItemProps> = ({item, checked, onChange}) => {
    return(
        <li className="item">
            <label className="item__wrap">
                <input type="checkbox" checked={checked} onChange={(e) => onChange(e, item.id)}></input>
                {item.title}
            </label>
        </li>
    );
}

export default ListItem;