import { useEffect, useState } from "react";
import { database } from '../services/firebase';

type Room = {
  name: string;
  createdAt: string;
}

export default function Room() {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState<Room[]>([
    {
      name: 'Room 1',
      createdAt: 'hoje'
    },
    {
      name: 'Room 2',
      createdAt: 'hoje'
    },
    {
      name: 'Room 3',
      createdAt: 'hoje'
    }
  ]);

  useEffect(() => {    
    database.ref('rooms').on('value', (_rooms) => {
      const firebaseRooms = _rooms.val();


      Object.entries(firebaseRooms).map(([key, value]:any) => {
        console.log(key, value);
        const sala = {
          name: value.name,
          createdAt: value.createdAt
        }

        setRooms([...rooms, sala])        
        
      })
    });

    return () => {}
  })

  async function criarSala(e:any) {
    e.preventDefault();
    var data = new Date();
    const newRoom = {
      name: name,
      createdAt: `${String(data.getDate()).padStart(2, '0')}-${String(data.getMonth() + 1).padStart(2, '0')}-${data.getFullYear()}`,
    }

    database.ref('rooms').push(newRoom)
    setName('')
    
  }

  return (
    <>
      <h1>Página de Salas</h1>
      <form onSubmit={(e) => criarSala(e)}>
        <fieldset>
          <legend>Criar nova sala</legend>
          <label htmlFor="name">Digite o nome da sala</label>
          <input onChange={(e) => {setName(e.target.value); }} type="text" id="name" value={name} />          
          <button type="submit">salvar</button>
        </fieldset>
      </form>
      <h2>Salas Cadastradas</h2>
      <ul>
        {
          rooms.map((room) => {
            return (
              <li>{room.name}</li>
            )
          })
        }
      </ul>
    </>
  )
}