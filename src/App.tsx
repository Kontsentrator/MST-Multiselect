import React, {useState, useEffect} from "react";
import axios from "axios";
import Multiselect from "components/Multiselect";
import { IItem } from 'interfaces/interfaces';

const App: React.FC = () => {
    const [items, setItems] = useState<IItem[] | string[]>([]);
    // Получение списка по ссылке
    useEffect(() => {
        axios.get<IItem[]>("https://api-rguide.admire.social/api/products")
        .then(function(response) {
            setItems(response.data);
        })
    }, [setItems]);

    return(
        <>
            <Multiselect label_text="Выберите участников" items={["Ануфриенко Н.", "Астафьев П.", "Участник 3", "Участник 4", "Участник 5"]} />
            <Multiselect label_text="Выберите устройства" items={items} />
        </>
    );
}

export default App;