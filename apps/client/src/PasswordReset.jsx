import { useState } from 'react';
import juniorLandiaLogo from './assets/images/juniolandia-logo.svg';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-68px)] items-center justify-center px-6 md:px-12'>
      <div className='max-w-[1200px] w-full flex gap-10 flex-col md:flex-row items-center justify-center'>
        <div className='w-full md:w-1/2 gap-2 text-center md:text-left flex flex-col items-center md:items-start'>
          <div className='flex justify-center w-full mb-8'>
            <img src={juniorLandiaLogo} alt='Juniorlandia Logo' className='h-12' />
          </div>
          <h2 style={{font: 'var(--h1)'}} className='text-3xl font-bold text-gray-900 mb-6'>¿Olvidaste tu contraseña?</h2>
          <p style={{font: 'var(--h3)'}} className='text-gray-700'>No te preocupes, te enviaremos un código a tu correo electrónico</p>
        </div>
        <div className='w-full md:w-1/2 max-w-md'>
          <form onSubmit={handleSubmit}>
            <label className='block text-sm font-medium mb-2' htmlFor='email'>
              Ingresa tu correo electrónico aquí
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--purple)]'
              placeholder='Correo electrónico'
              required
            />
            <button
              type='submit'
              className='w-full bg-[var(--purple)] text-white py-3 rounded-lg font-medium hover:bg-[var(--purple-hover)] cursor-pointer'
            >
              Recuperar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;