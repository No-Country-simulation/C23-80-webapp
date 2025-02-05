import { useState } from 'react';
import coverLogin from './assets/images/coverLogin.webp';
import juniorLandiaLogo from './assets/images/juniolandia-logo.svg';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return(
    <div className='flex flex-col h-[calc(100vh-68px)] lg:flex-row'>
      <div
        className='relative w-full lg:w-1/2 h-48 lg:h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${coverLogin})` }}
      >
        <div className='absolute top-4 right-4 px-2 lg:hidden'>
          <h1 className='text-white font-bold text-center text-2xl leading-tight sm:text-3xl sm:leading-tight md:text-4xl md:leading-normal'>
            Recursos en<br className='sm:hidden' /> un solo lugar
          </h1>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center lg:w-1/2 w-full p-6'>
        <div className='max-w-sm w-full'>
          <div className='flex justify-center mb-16'>
            <img src={juniorLandiaLogo} alt='Juniorlandia Logo' className='h-12' />
          </div>

          <h2 style={{font: 'var(--h2)'}} className='text-3xl font-bold mb-8 text-center'>Iniciar sesión</h2>
          <form>
            <label style={{font: 'var(--h3)'}} className='block text-sm font-medium mb-2' htmlFor='email'>
              Correo electrónico
            </label>
            <input
              id='email'
              type='email'
              className='w-full p-3 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-[var(--purple)]'
              placeholder='Correo electrónico'
            />

            <label style={{font: 'var(--h3)'}} className='block text-sm font-medium mb-2' htmlFor='password'>
              Contraseña
            </label>
            <div className='relative mb-2'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--purple)] pr-10'
                placeholder='Contraseña'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <a
              href='/password-reset'
              style={{color: 'var(--grey10)'}}
              className='text-sm hover:underline mb-6 inline-block'
            >
              ¿Olvidaste tu contraseña?
            </a>

            <button
              type='submit'
              className='w-full bg-[var(--purple)] text-white py-3 rounded-lg font-medium hover:bg-[var(--purple-hover)] cursor-pointer'
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;