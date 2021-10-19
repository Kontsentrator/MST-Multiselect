import "./Multiselect.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { memo } from "react";

import ListItem from "./ListItem";
import SelectedListItem from "./SelectedListItem";

type ItemsListProps = {
  items: string[];
  labelText?: string;
};

const Multiselect: React.FC<ItemsListProps> = ({ items, labelText }) => {
  const [listIsOpen, setListIsOpen] = useState(false); // Список открыт?
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Выбранные элементы
  const multiselectRef = useRef<HTMLDivElement>(null);

  // -------------- Эффекты -------------

  // Закрытие списка при клике мимо него
  useEffect(() => {
    function handleOutOfListClick(e: Event) {
      if (!multiselectRef.current?.contains(e.target as HTMLElement)) {
        setListIsOpen(false);
      }
    }
    window.addEventListener("mouseup", handleOutOfListClick);

    return () => {
      window.removeEventListener("mouseup", handleOutOfListClick);
    };
  });

  // -------------- Методы -------------

  // -------------- Обработчики -------------

  // Удаление всего списка выбранных элементов
  const handleСlearClick = useCallback(() => {
    setSelectedItems([]);
  }, []);

  // Открытие / закрытие списка
  const handleOpenCloseListClick = useCallback(() => {
    setListIsOpen((prev) => {
      return !prev;
    });
  }, []);

  // Обработка изменений чекбокса
  const handleCheckBoxChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>, id: number) => {
      let selectedItem: string = items[id];
      if (e.currentTarget.checked) {
        setSelectedItems((prev) => [...prev, selectedItem]);
      } else {
        setSelectedItems((prev) =>
          prev.filter((item) => item !== selectedItem)
        );
      }
    },
    [items]
  );

  // Удаление выбранного элемента в массиве выбранных элементов
  const handleDeleteClick = useCallback(
    (id: number) => {
      let selectedItem = items[id];
      setSelectedItems((prev) => prev.filter((item) => item !== selectedItem));
    },
    [items]
  );

  return (
    <div className="form__item">
      <label htmlFor="multiselect__datasets" className="label">
        {labelText ?? "Выберите элементы"}
      </label>

      <div
        id="multiselect__datasets"
        className="multiselect"
        ref={multiselectRef}
      >
        <div
          className={
            selectedItems.length === 0
              ? "multiselect__selected-items_empty"
              : "multiselect__selected-items"
          }
        >
          <ul className="multiselect__selected-items-list">
            <li property="height: 100%;"></li>
            {selectedItems.map((item, index) => (
              <SelectedListItem
                key={index}
                item={item}
                handleDeleteClick={() => handleDeleteClick(items.indexOf(item))}
              />
            ))}
          </ul>
          <div className="multiselect__console">
            {selectedItems.length <= 0 || <button className="button-clear" onClick={handleСlearClick} />}
            

            <div className="gate" />

            <button
              className={listIsOpen ? "button-close" : "button-open"}
              onClick={handleOpenCloseListClick}
            />
          </div>
        </div>

        <div
          className={
            listIsOpen ? "multiselect__items_active" : "multiselect__items"
          }
        >
          <ul className="multiselect__items-list">
            {items.map((item, index) => (
              <ListItem
                key={index}
                id={index}
                item={item}
                checked={selectedItems.includes(item)}
                onChange={handleCheckBoxChange}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Multiselect);
