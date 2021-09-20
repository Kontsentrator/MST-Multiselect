import './Multiselect.css';
import React, {useState, useEffect, useRef} from 'react';
import {IItem} from 'interfaces/interfaces';

import ListItem from './ListItem';
import SelectedListItem from './SelectedListItem';

import triangle_img from 'img/Triangle.svg';
import clear_img from 'img/Clear.svg';

type ItemsListProps = {
  items: IItem[]
}

const Multiselect: React.FC<ItemsListProps> = ({items}) => {
  const [listIsOpen, setListIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Закрытие списка при клике мимо него
  useEffect(() => {
    function handleOutOfListClick(e: Event) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as HTMLElement)) {
        setListIsOpen(false);
      }
    }

    window.addEventListener("mouseup", handleOutOfListClick);
    return () => {
      window.removeEventListener("mouseup", handleOutOfListClick);
    };
  });

  function handleСlearClick() {
    setSelectedItems([]);
  }

  function handleOpenCloseListClick() {
    setListIsOpen(prev => {return !prev});
  }

  function handleCheckBoxChange(e: React.FormEvent<HTMLInputElement>, id: number) {   
    if(e.currentTarget.checked) {
      var listItem = items.find(item => item.id === id)!;
      setSelectedItems(prev => [listItem, ...prev]);
    } else {
      setSelectedItems(prev => prev.filter(item => item.id !== id));
    }
  }

  function handleDeleteClick(id: number) {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="form__item">
      <label htmlFor="multiselect__datasets" className="label">Датасеты</label>

      <div id="multiselect__datasets" className="multiselect" ref={wrapRef}>
        <div className="multiselect__selected-items">
          <ul className="multiselect__selected-items-list">
            {selectedItems.map((item) =>
              <SelectedListItem 
                key={item.id} 
                item={item} 
                handleDeleteClick={() => handleDeleteClick(item.id)} 
              />
            )}
          </ul>
        
          <div className="multiselect__console">
            <button className="button-clear" onClick={handleСlearClick}><img src={clear_img} alt="Очистить" /></button>
            <div className="gate" />
            <button className={listIsOpen ? "button-close" : "button-open"} onClick={handleOpenCloseListClick}><img src={triangle_img} alt="Открыть" /></button>
          </div>
        </div>

        <div className={listIsOpen ? "multiselect__items_active" : "multiselect__items"}>
          <ul className="multiselect__items-list">
            {items.map((item) =>
              <ListItem 
                key={item.id} 
                item={item} 
                checked={selectedItems.includes(item)} 
                onChange={(e) => handleCheckBoxChange(e, item.id)} 
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Multiselect;