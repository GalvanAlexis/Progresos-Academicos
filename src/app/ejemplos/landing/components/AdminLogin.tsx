'use client';

import { useState } from 'react';
interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLogin({ open, onClose, onSuccess }: Props) {
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') {
      setError('');
      setUser('');
      setPass('');
      onSuccess();
    } else {
      setError('Usuario o contrasena incorrectos');
    }
  };

  const handleClose = () => {
    setError('');
    setUser('');
    setPass('');
    onClose();
  };

  return (
    <>
      {open && (
        <>
          <div key="login-overlay" onClick={handleClose} />
          <div>
            <form key="login-dialog" onSubmit={handleSubmit} >
              <button type="button" onClick={handleClose} aria-label="Cerrar" >
                &times;
              </button>
              <h2>Acceso administrativo</h2>
              <p>
                Ingresa con tus credenciales
              </p>
              <div>
                <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)}
                  
                  autoFocus
                />
                <input type="password" placeholder="Contrasena" value={pass} onChange={(e) => setPass(e.target.value)}
                  
                />
                {error && (
                  <p>{error}</p>
                )}
                <button type="submit" className="lum-btn lum-btn-primary" >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
