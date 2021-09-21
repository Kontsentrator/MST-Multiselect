import React, { memo } from 'react';
import { IItem } from 'interfaces/interfaces';

type ListItemProps = {
    item: IItem | string,
    checked: boolean
    onChange(e: React.FormEvent<HTMLInputElement>, id: number): void
}

const ListItem: React.FC<ListItemProps> = ({item, checked, onChange}) => {
    return(
        <li className="item">
            <label className="item__wrap">
                <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={(e) => onChange(e, typeof item === "string" ? item.indexOf(item) : item.id)}>
                </input>
                
                {typeof item === "string" ? item : item.title}
            </label>
        </li>
    );
}

export default memo(ListItem);