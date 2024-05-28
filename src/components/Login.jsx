import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Login({ auth, db }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

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
    <>
      {
        error && (<div className='alert alert-danger'>{error}</div>)
      }
      <form className="row mt-3 mb-5 g-3" onSubmit={validateData}>
        <label className="text-danger text-opacity-75 fw-bold">{isSignUpMode ? 'Sign Up' : 'Login'}</label>

        {isSignUpMode ? (
          <>
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
          </>
        ) : null}


        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
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

        <div className="d-grid gap-2">
          <button className='btn btn-danger fw-semibold' type='submit'>
            {isSignUpMode ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <a
          href="#"
          type="button"
          onClick={() => setIsSignUpMode(!isSignUpMode)}
        >
          {isSignUpMode ? '¿Ya estás registrado?' : '¿No tienes cuenta?'}
        </a>
      </form >
    </>
  )
}

export default Login