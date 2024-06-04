import RoomCard from "./RoomCard";
import { useState, useEffect } from "react";

function Reservation({ db, firebaseUser }) {
  const [rooms, setRooms] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Rooms
  function filterRooms() {
    switch (filterOption) {
      case 'all':
        return rooms;
      case 'available':
        return rooms.filter(room => room.available);
      case 'reserved':
        return rooms.filter(room => room.reservedBy === firebaseUser.email);
    }
  }

  function searchRooms() {
    if (!searchQuery) {
      return filterRooms();
    }

    return filterRooms().filter(room =>
      room.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  // CRUD
  async function getRooms() {
    try {
      const collection = await db.collection('rooms').get();

      setRooms(
        collection
          .docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
      );


    } catch (error) {
      console.log(error);
    } console
  }

  async function makeReservation(room) {
    const name = room.name;
    const description = room.description;
    const capacity = room.capacity;
    const available = false;
    const reservedBy = firebaseUser.email;

    try {
      await db.collection('rooms').doc(room.id).update({
        name, description, capacity, available, reservedBy
      })

      getRooms();

    } catch (error) {
      console.log(error);
    }
  }

  async function cancelReservation(room) {
    const name = room.name;
    const description = room.description;
    const capacity = room.capacity;
    const available = true;
    const reservedBy = '';

    try {
      await db.collection('rooms').doc(room.id).update({
        name, description, capacity, available, reservedBy
      })

      getRooms();

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <main className="d-flex justify-content-center flex-wrap my-5 px-xl-5 min-width-100 mx-auto" style={{ maxWidth: "1440px" }}>

      <div className="form-floating col-9">
        <input className="form-control" type="text" id="searchInput" onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <label htmlFor="searchInput">Buscar Salas</label>
      </div>

      <div className="form-floating col-6 col-md-4 mt-3">
        <select className="form-select" id="floatingSelect" onChange={(e) => setFilterOption(e.target.value)} defaultValue="all">
          <option value="all">Todas</option>
          <option value="available">Disponibles</option>
          <option value="reserved">Mis Reservas</option>
        </select >
        <label htmlFor="floatingSelect">Filtrar Salas</label>
      </div>

      <div className="d-flex justify-content-center flex-wrap col-10 mt-4 mb-5 px-xl-5" id="cardsContainer" style={{ maxWidth: "1200px" }}>
        {
          searchRooms().map((room, index) => (
            <RoomCard
              key={index}
              room={room}
              userEmail={firebaseUser.email}
              makeReservation={makeReservation}
              cancelReservation={cancelReservation}
            />
          ))
        }
      </div>
    </main>
  )
}

export default Reservation;