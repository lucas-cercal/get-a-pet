import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

export default function MyPets() {
  const [pets, setPets] = useState([])

  return (
    <section>
      <div>
        <h1>MyPets</h1>
        <Link to="/pet/add">Cadastrar</Link>
      </div>
      <div>
        {pets.length > 0 ? <p>Meus pets cadastrados</p> : <p>Não há pets cadastrados</p>}
      </div>
    </section>
  );
}

