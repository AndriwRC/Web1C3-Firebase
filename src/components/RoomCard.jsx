function RoomCard({ room, userEmail, makeReservation, cancelReservation }) {
  return (
    <div
      className={room.available ? "card m-2 shadow" : "card my-2 m-sm-2"}
      style={{ width: "264px" }}
    >
      <div className="card-body">
        <h3 className="text-center">{room.name}</h3>
        <h5 className="text-body-secondary">{room.description}</h5>
        <h5 className="text-body-secondary">Capacidad: {room.capacity}</h5>
        <h5 className="text-body-secondary">
          {room.available ? 'Disponible' : 'No disponible'}
        </h5>
        <div className="d-flex justify-content-center flex-wrap">
          {
            (room.available)
              ? <button type="button" className="btn btn-warning mt-2" onClick={() => makeReservation(room)}>Reservar</button>
              : <button type="button" className="btn btn-warning mt-2" disabled>Reservar</button>
          }
          {
            room.reservedBy
            && (room.reservedBy === userEmail
              || userEmail === 'admin@mail.com'
            ) && <button
              type="button"
              className="btn btn-dark mt-2"
              onClick={() => cancelReservation(room)}
            >Finalizar Reserva</button>
          }
        </div>
      </div>
    </div>
  )
}

export default RoomCard