import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Login({ auth, db }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  const navigate = useNavigate();

  const signUp = useCallback(async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, pass);
      console.log(response);
      const user = await response.user;
      await db.collection('users').doc(user.email).set({
        id: user.uid,
        name: name,
        lastName: lastName,
        email: user.email
      })

      setName('');
      setLastName('');
      setEmail('');
      setPass('');
      setError(null);

      navigate('/');
    } catch (err) {
      console.error(err.code);

      if (err.code === 'auth/invalid-email') {
        setError('Email no válido!')
      }
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email ya existe!')
      }

    }
  }, [name, lastName, email, pass]);


  const login = useCallback(async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, pass);

      console.log(response);

      setEmail('');
      setPass('');
      setError(null);

      navigate('/');
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Email no válido!');
      }
      if (err.code === 'auth/user-not-found') {
        setError('Email no registrado!')
      }
      if (err.code === 'auth/wrong-password') {
        setError('Contraseña errada!')
      }
      if (err.code === 'auth/internal-error') {
        setError('Credenciales no válidas!')
      }
    }
  }, [email, pass, navigate]);


  function validateData(e) {
    e.preventDefault();

    if (!email) return setError('Ingrese un email válido');
    if (pass.length < 6) return setError('La contraseña debe ser mínimo de 6 caracteres!');

    setError(null);

    if (isSignUpMode) {
      signUp();
    } else {
      login();
    }
  }


  return (
    <main className="container col-lg-8 min-vh-100">
      {
        error && (<div className='alert alert-danger'>{error}</div>)
      }
      <form className="row mt-3 mb-5 g-3" onSubmit={validateData}>
        <h3 className="text-warning text-center text-opacity-75 fw-bold">{isSignUpMode ? 'Sign Up' : 'Login'}</h3>

        {isSignUpMode ? (
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                  </svg>
                </span>
                <input type="text"
                  placeholder="Ingresa tu Nombre"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                  </svg>
                </span>
                <input type="text"
                  placeholder="Ingresa tu Apellido"
                  className='form-control'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
              </span>
              <input type="email"
                placeholder="Ingresa tu email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </span>
              <input type="password"
                placeholder="Ingresa tu Contraseña"
                className='form-control'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 col-10 mx-auto">
          <button className='btn btn-dark fw-semibold' type='submit'>
            {isSignUpMode ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <a
          className="text-center text-decoration-none"
          href="#"
          type="button"
          onClick={() => setIsSignUpMode(!isSignUpMode)}
        >
          {isSignUpMode ? '¿Ya tienes una cuenta?😉' : '¿No tienes cuenta?😢'}
        </a>
      </form >
    </main>
  )
}

export default Login