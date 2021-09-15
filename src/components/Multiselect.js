import './Multiselect.css';

const massiv = ["Вариант 1", "Вариант 2", "Вариант 3"];
const options = massiv.map((option) => 
    <option key={option.id} value={option.id}>
        {option}
    </option>
);

function Multiselect() {
  return (
    <div className="form__item">
      <label htmlFor="multiselect_datasets" className="form__label">Датасеты</label>

      <select id="multiselect datasets" className="multiselect form__input" multiple="">
        {options}
      </select>
    </div>
  );
}

export default Multiselect;
