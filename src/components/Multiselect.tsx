import "./Multiselect.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IItem } from "interfaces/interfaces";
import { memo } from "react";

import ListItem from "./ListItem";
import SelectedListItem from "./SelectedListItem";

type ItemsListProps = {
  items: (IItem | string)[];
  labelText?: string;
};

const Multiselect: React.FC<ItemsListProps> = ({ items, labelText }) => {
  const [listIsOpen, setListIsOpen] = useState(false); // Список открыт?
  const [selectedItems, setSelectedItems] = useState<(IItem | string)[]>([]); // Выбранные элементы
  const wrapRef = useRef<HTMLDivElement>(null);

  // -------------- Эффекты -------------

  // Закрытие списка при клике мимо него
  useEffect(() => {
    function handleOutOfListClick(e: Event) {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target as HTMLElement)
      ) {
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
    return array.every((item) => typeof item === "string");
  }, []);

  // Нахождение выбранного элемента в массиве. Возвр. нужный элемент
  const findSelectedItem = useCallback(
    (id: number) => {
      let selectedItem: IItem | string;
      if (!isArrayOfString(items)) {
        selectedItem = (items as IItem[]).find((item) => item.id === id)!;
      } else {
        selectedItem = (items as string[])[id];
      }
      return selectedItem;
    },
    [isArrayOfString, items]
  );

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
      let selectedItem: IItem | string = findSelectedItem(id);
      if (e.currentTarget.checked) {
        setSelectedItems((prev) => [...prev, selectedItem]);
      } else {
        setSelectedItems((prev) =>
          prev.filter((item) => item !== selectedItem)
        );
      }
    },
    [findSelectedItem]
  );

  // Удаление выбранного элемента в массиве выбранных элементов
  const handleDeleteClick = useCallback(
    (id: number) => {
      let selectedItem: IItem | string = findSelectedItem(id);
      setSelectedItems((prev) => prev.filter((item) => item !== selectedItem));
    },
    [findSelectedItem]
  );

  return (
    <div className="form__item">
      <label htmlFor="multiselect__datasets" className="label">
        {labelText ? labelText : "Выберите элементы"}
      </label>

      <div id="multiselect__datasets" className="multiselect" ref={wrapRef}>
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
                handleDeleteClick={() =>
                  handleDeleteClick(
                    typeof item === "string" ? items.indexOf(item) : item.id
                  )
                }
              />
            ))}
          </ul>
          <div className="multiselect__console">
            <button className="button-clear" onClick={handleСlearClick} />

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
                item={item}
                checked={selectedItems.includes(item)}
                onChange={(e) =>
                  handleCheckBoxChange(
                    e,
                    typeof item === "string" ? items.indexOf(item) : item.id
                  )
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Multiselect);
