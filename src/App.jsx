import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  // Функция для загрузки данных с API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://64bbd2587b33a35a4446b57a.mockapi.io/Pizzas"
      );
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  // Функция для сохранения выбранных данных в Local Storage
  const saveSelectedDataToLocalStorage = () => {
    localStorage.setItem("selectedData", JSON.stringify(selectedData));
  };

  // Функция для загрузки выбранных данных из Local Storage
  const loadSelectedDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("selectedData");
    if (savedData) {
      setSelectedData(JSON.parse(savedData));
    }
  };

  // Загрузка данных с API при монтировании компонента
  useEffect(() => {
    fetchData();
    loadSelectedDataFromLocalStorage();
  }, []);

  // Обработчик для выбора данных
  const handleSelectData = (selectedItem) => {
    setSelectedData([...selectedData, selectedItem]);
    // saveSelectedDataToLocalStorage();
  };

  // Обработчик для удаления выбранного элемента
  const handleRemoveData = (index) => {
    const newData = [...selectedData];
    newData.splice(index, 1);
    setSelectedData(newData);
    // saveSelectedDataToLocalStorage();
  };

  return (
    <div>
      <h1>Список данных</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.title}
            <button onClick={() => handleSelectData(item)}>Выбрать</button>
          </li>
        ))}
      </ul>
      <h2>Выбранные данные</h2>
      <ul>
        {selectedData.map((item, index) => (
          <li key={index}>
            {item.title}
            <button onClick={() => handleRemoveData(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
