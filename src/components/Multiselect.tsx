import './Multiselect.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {IItem} from 'interfaces/interfaces';
import { memo } from 'react';

import ListItem from './ListItem';
import SelectedListItem from './SelectedListItem';

import triangle_img from 'img/Triangle.svg';
import clear_img from 'img/Clear.svg';

type ItemsListProps = {
  items?: (IItem | string)[]
  label_text?: string
}

const Multiselect: React.FC<ItemsListProps> = ({items, label_text}) => {
  const [listIsOpen, setListIsOpen] = useState<boolean>(false); // Список открыт?
  const [labelText, setLabelText] = useState<string>(''); // Текст для <label>
  const [allItems, setAllItems] = useState<(IItem | string)[]>([]); // Все элементы
  const [selectedItems, setSelectedItems] = useState<(IItem | string)[]>([]); // Выбранные элементы
  const wrapRef = useRef<HTMLDivElement>(null);

  // -------------- Эффекты -------------

  useEffect(() => {
    if(items === undefined) {
      let array: string[] = ["Элемент 1", "Элемент 2", "Элемент 3"];
      setAllItems(array);
    } else {
      setAllItems(items);
    }

    return () => {
      setAllItems([]);
    }
  }, [items]);

  useEffect(() => {
    if(label_text === undefined) {
      setLabelText("Выберите элементы");
    } else {
      setLabelText(label_text);
    }
    
    return () => {
      setLabelText('');
    }
  }, [label_text]);

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

  // -------------- Методы -------------

  // Проверка, что массив строчный
  const isArrayOfString = useCallback((array: (IItem | string)[]): boolean => {
    return array.every(item => typeof item === "string");
  }, []);

  // Нахождение выбранного элемента в массиве всех элементов. Возвр. нужный элемент
  const findSelectedItem = useCallback((id: number) => {
    let selectedItem: IItem | string;
    if(!isArrayOfString(allItems)) {
      selectedItem = (allItems as IItem[]).find(item => item.id === id)!;
    } else {
      selectedItem = (allItems as string[])[id];
    }
    return selectedItem;
  }, [isArrayOfString, allItems]);

  // -------------- Обработчики -------------

  // Удаление всего списка выбранных элементов
  const handleСlearClick = useCallback(() => {
    setSelectedItems([]);
  }, []);

  // Открытие / закрытие списка
  const handleOpenCloseListClick = useCallback(() => {
    setListIsOpen(prev => {return !prev});
  }, []);

  // Обработка изменений чекбокса
  const handleCheckBoxChange = useCallback((e: React.FormEvent<HTMLInputElement>, id: number) => { 
    let selectedItem: IItem | string = findSelectedItem(id);
    if(e.currentTarget.checked) {
      setSelectedItems(prev => [...prev, selectedItem]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== selectedItem));
    }
  }, [findSelectedItem]);

  // Удаление выбранного элемента в массиве выбранных элементов
  const handleDeleteClick = useCallback((id: number) => {
    let selectedItem: IItem | string = findSelectedItem(id);
    setSelectedItems(prev => prev.filter(item => item !== selectedItem));
  }, [findSelectedItem]);

  return (
    <div className="form__item">
      <label htmlFor="multiselect__datasets" className="label">{labelText}</label>

      <div id="multiselect__datasets" className="multiselect" ref={wrapRef}>
        <div className="multiselect__selected-items">
          <ul className="multiselect__selected-items-list">
            {selectedItems.map((item, index) =>
              <SelectedListItem 
                key={index} 
                item={item} 
                handleDeleteClick={() => handleDeleteClick(typeof item === "string" ? allItems.indexOf(item) : item.id)} 
              />
            )}
          </ul>
          <div className="multiselect__console">
            <button className="button-clear" onClick={handleСlearClick}>
              <img src={clear_img} alt="Очистить" />
            </button>

            <div className="gate" />

            <button className={listIsOpen ? "button-close" : "button-open"} onClick={handleOpenCloseListClick}>
              <img src={triangle_img} alt="Открыть" />
            </button>
          </div>
        </div>

        <div className={listIsOpen ? "multiselect__items_active" : "multiselect__items"}>
          <ul className="multiselect__items-list">
            {allItems.map((item, index) =>
              <ListItem 
                key={index} 
                item={item} 
                checked={selectedItems.includes(item)}
                onChange={(e) => handleCheckBoxChange(e, typeof item === "string" ? allItems.indexOf(item) : item.id)} 
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(Multiselect);