import React, { useState, useEffect } from 'react';
import './SearchHistoryForm.css';
import searchIcon from '../../assets/search-btn-history.png';
import trashIcon from '../../assets/search-btn-trash.png';
import timeIcon from '../../assets/search-btn-time-quarter.png';

interface SearchHistoryFormProps {
  searchHistory: string[];
  onSelectQuery: (query: string) => void; // Add this line
  children?: React.ReactNode;
}
  

  const SearchHistoryForm: React.FC<SearchHistoryFormProps> = ({ searchHistory, onSelectQuery }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);  
  //const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentTime(new Date());
    }, 5);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedItem(index === selectedItem ? null : index);
    setShowConfirmation(false); 
    if (onSelectQuery) {
      onSelectQuery(searchHistory[index]);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedItem(index);
    setShowConfirmation(true);
  };

  const renderTimeRemaining = (currentDate: Date) => { 
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 1);
    const timeRemaining = futureDate.getTime() - currentDate.getTime();
  
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    return `Hoy, quedan ${hoursRemaining} horas, ${minutesRemaining} minutos y ${secondsRemaining} segundos`;
  };
  

  return (
    <div className="SearchHistoryForm">
      <h2 className='Title'>Historial de Búsquedas</h2>
      <ul>
      {searchHistory.map((query, index) => (
  <li
    key={index}
    className={`SearchHistoryItem ${selectedItem === index ? 'Selected' : ''}`}
    onClick={() => handleItemClick(index)}
  >
    <div className="SearchHistoryItemContent">
      <div className="SearchIconAndInfo">
        <img src={searchIcon} alt="Search" className="SearchIcon" />
        <div className="InfoContainer">
          <span>{query}</span>
          <span className="TimeSpan">
            <img src={timeIcon} alt="Time" className="TimeIcon" />
            {renderTimeRemaining(new Date())}
          </span>
        </div>
      </div>
      {selectedItem === index && showConfirmation && (
        <div className="ConfirmationButtons">
          <button className="ConfirmButton">
            <img src={require('../../assets/search-btn-trash-check.png')} alt="Check" />
          </button>
          <button className="CancelButton" onClick={() => setShowConfirmation(false)}>
            <img src={require('../../assets/search-btn-trash-cancel.png')} alt="Cancel" />
          </button>
        </div>
      )}
      {!showConfirmation && (
        <img
          src={trashIcon}
          alt="Trash"
          className="TrashIcon"
          onClick={(e) => handleDeleteClick(e, index)}
        />
      )}
    </div>
  </li>
))}
      </ul>
    </div>
  );
};

export default SearchHistoryForm;
