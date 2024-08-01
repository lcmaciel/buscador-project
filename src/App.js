import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input === '') {
      alert("Preencha algum CEP!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert('Ops, erro ao buscar  :(');
      setInput("");
    }

  }

  return (
    <div className="container">
      <h1 className="title">Busca de CEP</h1>

    <div className="containerInput">
      <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
       />

       <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
       </button>
      </div> 

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Endereço: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>

      </main>
      )}



    </div>
  );
}

<script type="text/javascript">
(function(w,d,s,r,k,h,m){
	if(w.performance && w.performance.timing && w.performance.navigation) {
		w[r] = w[r] || function(){(w[r].q = w[r].q || []).push(arguments)};
		h=d.createElement('script');h.async=true;h.setAttribute('src',s+k);
		d.getElementsByTagName('head')[0].appendChild(h);
		(m = window.onerror),(window.onerror = function (b, c, d, f, g) {
		m && m(b, c, d, f, g),g || (g = new Error(b)),(w[r].q = w[r].q || []).push(["captureException",g]);})
	}
})(window,document,'http://OPM_PLUS-SERVER:7070/RUMScript.js?appKey=','apmr','FKVgncsKkMJg6vrUb8MfHSbLHtUZ1ajh10000268');
</script>

export default App;
