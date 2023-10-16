import React, { useState, useEffect } from "react";

const App = () => {
  const [dataList, setDataLists] = useState([]);
  const [selectedDataList, setSelectedDataList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://64bbd2587b33a35a4446b57a.mockapi.io/Pizzas"
      );
      if (response.ok) {
        const result = await response.json();
        setDataLists(result);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    fetchData();
    loadSelectedDataFromLocalStorage();
  }, []);

  const loadSelectedDataFromLocalStorage = () => {
    const savedDataList = localStorage.getItem("selectedData");
    if (savedDataList) {
      setSelectedDataList(JSON.parse(savedDataList));
    }
  };

  const saveSelectedDataToLocalStorage = () => {
    if (selectedDataList.length > 0) {
      localStorage.setItem("selectedData", JSON.stringify(selectedDataList));
    }
  };

  useEffect(() => {
    saveSelectedDataToLocalStorage();
  }, [selectedDataList]);

  const addItemToLsit = (selectedItem) => {
    setSelectedDataList([...selectedDataList, selectedItem]);
  };

  const removeItemFromList = (index) => {
    const newData = [...selectedDataList];
    newData.splice(index, 1);
    setSelectedDataList(newData);
  };

  return (
    <div className="item-list">
      <div>
        <h1>Список данных</h1>
        <ul>
          {dataList.map((item, index) => (
            <li key={index}>
              🍕 {item.title}
              <button onClick={() => addItemToLsit(item)}>Выбрать</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Выбранные данные</h1>
        <ul>
          {selectedDataList.map((item, index) => (
            <li key={index}>
              😋 {item.title}
              <button onClick={() => removeItemFromList(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
