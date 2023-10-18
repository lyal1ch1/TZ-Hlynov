import React, { useState, useEffect } from "react";
import useStickyState from "./useStickyState";
import DataList from "./components/DataList";
import SelectedDataList from "./components/SelectedDataList";

const App = () => {
  const [dataList, setDataLists] = useState([]);
  const [selectedDataList, setSelectedDataList] = useStickyState(
    [],
    "selectedData"
  );

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
  }, []);

  const addItemToLsit = (selectedItem) => {
    const index = selectedDataList.findIndex(
      (item) => item.id === selectedItem.id
    );

    if (index === -1) {
      setSelectedDataList([...selectedDataList, { ...selectedItem, count: 1 }]);
    } else {
      const newDataList = [...selectedDataList];
      newDataList[index].count++;
      setSelectedDataList(newDataList);
    }
  };

  const removeItemFromList = (index) => {
    const newDataList = [...selectedDataList];
    if (newDataList[index].count !== 1) {
      newDataList[index].count--;
    } else {
      newDataList.splice(index, 1);
    }
    setSelectedDataList(newDataList);
  };

  return (
    <div className="item-list">
      <DataList dataList={dataList} addItemToLsit={addItemToLsit} />
      <SelectedDataList
        selectedDataList={selectedDataList}
        removeItemFromList={removeItemFromList}
      />
    </div>
  );
};

export default App;
