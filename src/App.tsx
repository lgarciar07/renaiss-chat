import React, { useState } from 'react'; 
import './App.css';

import Body from './components/Body/Body';
import NavigatorBar from './components/NavigatorBar/NavigatorBar';
import BackButton from './components/BackButton/BackButton';
import SidebarButton from './components/SidebarButton/SidebarButton';
import SettingsButton from './components/SettingsButton/SettingsButton';
import SearchTextForm from './components/Forms/SearchTextForm';
import SearchHistoryForm from './components/Forms/SearchHistoryForm';
import OdamaChatForm from './components/Forms/OdamaChatForm';

function App() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (query: string) => {
    setSearchHistory(prevHistory => [...prevHistory, query]);
  };
  const handleSelectQuery = (query: string) => {
    setSelectedQuery(query);
  };

  return (
    <div className="App">
      <Body>
        <div className="TopRow">
          <NavigatorBar>
            <BackButton onClick={() => console.log('Back button clicked')}>
              &lt; Atras
            </BackButton>
            <SidebarButton onClick={() => console.log('Sidebar button clicked')}>
              <img src={require('./assets/sidebar-btn-sidebar.png')} alt="Sidebar Button" />
            </SidebarButton>
            <SettingsButton onClick={() => console.log('Settings button clicked')}>
              <img src={require('./assets/sidebar-btn-settings.png')} alt="Settings Button" />
            </SettingsButton>
          </NavigatorBar>
        </div>
        <div className="MiddleRow">
          <div className="Column1">
            <SearchTextForm onSearch={handleSearch} inputValue={inputValue} setInputValue={setInputValue} />
            <SearchHistoryForm searchHistory={searchHistory} onSelectQuery={handleSelectQuery} />
          </div>
          <div className="Column2">
          <OdamaChatForm selectedQuery={selectedQuery} inputValue={inputValue} />
          </div>
        </div>
      </Body>
    </div>
  );
}

export default App;
