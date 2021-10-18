import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "components/Multiselect";
import { IItem } from "interfaces/interfaces";

const API_ENDPOINT = "https://api-rguide.admire.social/api";
const RESOURCE = "/products";

const members = [
  "Ануфриенко Н.",
  "Астафьев П.",
  "Участник 3",
  "Участник 4",
  "Участник 5",
];

const App: React.FC = () => {
  const [items, setItems] = useState<IItem[] | string[]>([]);
  const [error, setError] = useState<Error>();

  // Получение списка по ссылке
  useEffect(() => {
    axios
      .get<IItem[]>(API_ENDPOINT + RESOURCE)
      .then((response) => setItems(response.data))
      .catch((error) => setError(error));
  }, [setItems]);

  return (
    <>
      <Multiselect labelText="Выберите участников" items={members} />

      {error ? (
        <span className="error">{error.message}</span>
      ) : (
        <Multiselect labelText="Выберите устройства" items={items} />
      )}
    </>
  );
};

export default App;
