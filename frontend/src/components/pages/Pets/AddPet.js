import styles from './AddPet.module.css'

import api from '../../../utils/api'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

/* Components */
import PetForm from '../../form/PetForm'

export default function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()
  const history = useHistory()

  async function registerPet(pet) {
    let msgType = 'success'
    const formData = new FormData()

    await Object.keys(pet).forEach((key) => {
      if(key === 'images'){
        for(let i = 0; i < pet[key].length; i++){
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.post('pets/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data'
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
    
    if(msgType !== 'error'){
      history.push('/pets/mypets')
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>

      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet"/>

    </section>
  );
}

