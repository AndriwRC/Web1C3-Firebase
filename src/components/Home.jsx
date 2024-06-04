
function Home({ firebaseUser }) {
  return (
    <main style={{ minHeight: '64vh' }}>
      <div className="d-flex justify-content-center align-items-center flex-wrap mx-3">
        <div className="d-inline col-10 col-sm-5 col-md-4 col-xl-3 mt-4 mx-4">
          <h1 className="text-warning">Sé fuerte, sé <span className="text-warning fw-bold fst-italic">MEJOR</span></h1>
          <h6>Practicar un deporte puede ayudarte a mejorar tu memoria, atención, concentración y capacidad de resolver problemas. 🧠</h6>
          <h4 className="mb-0">¡Incorpora Athlete Arena en tu rutina diaria y alcanza tus metas!💪🏼</h4>
          <div className="d-flex justify-content-center mt-2">
            {
              firebaseUser
                ? <button className="btn btn-dark">Reservar</button>
                : <button className="btn btn-dark">Iniciar Sesión</button>
            }
          </div>
        </div>
        <div className="d-inline col-sm-5 col-md-4">
          <img src="https://www.shutterstock.com/image-vector/silhouettes-athletes-different-sports-600nw-2388423531.jpg" className="img-fluid small-image" alt="Imagen de Un Michi" />
        </div>
      </div>
    </main>
  )
}

export default Home