import React from 'react';
import './SearchTextForm.css';

interface SearchTextFormProps {
  onSearch: (query: string) => void;
  inputValue: string; // Nueva prop para el valor del campo de entrada
  setInputValue: (value: string) => void; 
}

const SearchTextForm: React.FC<SearchTextFormProps> = ({ onSearch, inputValue, setInputValue }) => {
  //const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSearch(inputValue);
  };

  return (
    <div className="SearchTextForm">
        <h2 className='Title'>Sistema</h2>
        <p className='PromptText'>
            Para conseguir una respuesta adecuada a tus necesidades, escribe un prompt para el sistema.
        </p>
        <div className="InputContainer">
            <input
                type="text"
                placeholder="Openai...Escribe aquí...Clic...Nueva...Busqueda"
                className="InputField"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="SearchButton" onClick={handleSubmit}>
                <img src={require('../../assets/search-btn-send.png')} alt="Search" />
            </button>
        </div>
    </div>
  );
};

export default SearchTextForm;
