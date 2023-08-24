import React, { useState } from 'react';
import './OdamaChatForm.css';
import OpenAI from 'openai';

interface OdamaChatFormProps {
  selectedQuery: string;
  inputValue: string; // Nueva prop para el valor del campo de entrada
}


const OdamaChatForm: React.FC<OdamaChatFormProps> = ({ selectedQuery, inputValue}) => {
  
  const [results, setResults] = useState<string[]>([]); // Aqui se almacenará los resultados de OdamaChat
  const [tokenCount, setTokenCount] = useState(0);
  const [inputValueText, setInputValueTex] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    
    // Calcular la cantidad de tokens en el nuevo texto
    const tokensInNewText = newText.split(' ').length;
    
    // Actualizar el estado del valor y el conteo de tokens
    setInputValueTex(newText);
    setTokenCount(tokensInNewText);
  };

// Función para renderizar el contenido del mensaje
const renderMessageContent = (content: string) => {
  if (content.startsWith('https://')) {
    // Si el contenido es una URL, mostrar una imagen
    return <img src={content} alt="Chat Content" />;
  } else if (content.startsWith('```')) {
    // Si el contenido es código, mostrarlo en un bloque de código
    const codeContent = content.slice(3, -3);
    return <pre>{codeContent}</pre>;
  } else {
    // En otros casos, mostrar el contenido como texto
    return <p>{content}</p>;
  }
};  

  const handleNewSearch = async () => {
    try {
      if (inputValue === null) {
        console.error('El valor de entrada es nulo.');
        return;
      }
  
      const openai = new OpenAI({
        apiKey: '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',
        organization: 'org-VFxdlkgWCk5cfhDct5bqKcX3',
        dangerouslyAllowBrowser: true,
      });
  
      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: inputValue }],
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
      });
  
      //console.log(response.choices);
      
      // Actualiza el estado de los resultados con la respuesta generada
      
      if (typeof response.choices[0].message.content === 'string') {
        setResults([...results, response.choices[0].message.content]);
      } else {
        console.error('Se recibió contenido nulo en la respuesta.');
      }
      
    } catch (error) {
      console.error('Error al generar la completación:', error);
    }
  };
  
  
  return (
    <div className="OdamaChatForm">
      {/* Header */}
      <div className="Header">
        <h2 className='Title2'>OdamaChat</h2>
        <button className="BtnNewSearch Text" onClick={handleNewSearch}>
            <img src={require('../../assets/search-btn-new.png')} alt="New Search" className='NewSearch'/> Nueva Búsqueda
        </button>
        </div>

      {/* Sección para escribir una petición */}
      <div className="RequestSection">
        <div className="UserInfo">
            <h3>Luis Gustavo Garcia Reyna</h3>
            <p>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
        </div>
        <div className='Vector'></div>
        <div className='TitleMessage'>{selectedQuery}</div>
      </div>

      {/* Sección para mostrar los resultados */}
      <div className="ResultsSection">
        <div className="ChatOdama">
        <h2 className='Title2'>OdamaChat</h2>
        <p>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
        </div>
        <div className='Vector'></div>
        {/* Muestra los resultados de OdamaChat aquí */}
        {results.map((result, index) => (
    <div key={index} className="ResultItem">
      {renderMessageContent(result)}
    </div>
  ))}
      </div>
      <div className='Footer'>
            <input
              style={{ width: '80%', marginLeft: '20px' }}
              type="text"
              placeholder="Tokens...Escribe aquí..."
              className="InputFieldPrompt"
              value={inputValueText}
              onChange={handleInputChange}
            />            
            <button className="SendButton">
                <img src={require('../../assets/search-btn-send.png')} alt="Search" />
            </button>
            <button className="EditButton">
                <img src={require('../../assets/edit-btn-prompt.png')} alt="Search" />
            </button>
            <p>Tokens restantes: {1000 - tokenCount}</p>
      </div>
    </div>
  );
};

export default OdamaChatForm;