import RoomCard from "./RoomCard";
import { useState, useEffect } from "react";

function Reservation({ db, firebaseUser }) {
  const [rooms, setRooms] = useState([]);
  const [filterOption, setFilterOption] = useState('all');

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
    }
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
    <>
      <div className="form-floating w-50">
        <select className="form-select" id="floatingSelect" onChange={(e) => setFilterOption(e.target.value)} defaultValue="all">
          <option value="all">Todas</option>
          <option value="available">Disponibles</option>
          <option value="reserved">Mis Reservas</option>
        </select >
        <label htmlFor="floatingSelect">Filtrar Salas</label>

      </div>
      <div className="d-flex justify-content-center flex-wrap my-5 px-xl-5" id="cardsContainer" style={{ maxWidth: "1200px" }}>
        {
          (filterOption === 'all')
            ? (
              rooms.map((room, index) => (
                <RoomCard
                  key={index}
                  room={room}
                  userEmail={firebaseUser.email}
                  makeReservation={makeReservation}
                  cancelReservation={cancelReservation} />
              ))
            )
            : (filterOption === 'available')
              ? (
                rooms
                  .filter(room => room.available)
                  .map((room, index) => (
                    <RoomCard
                      key={index}
                      room={room}
                      userEmail={firebaseUser.email}
                      makeReservation={makeReservation}
                      cancelReservation={cancelReservation} />
                  ))
              )
              : (
                rooms
                  .filter(room => room.reservedBy === firebaseUser.email)
                  .map((room, index) => (
                    <RoomCard
                      key={index}
                      room={room}
                      userEmail={firebaseUser.email}
                      makeReservation={makeReservation}
                      cancelReservation={cancelReservation} />
                  ))
              )


        }
      </div>
    </>
  )
}

export default Reservation;