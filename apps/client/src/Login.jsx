import { useState, useTransition } from 'react';
import coverLogin from './assets/images/coverLogin.webp';
import juniorLandiaLogo from './assets/images/juniolandia-logo.svg';
import { Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { fetchData } from './utils/api';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from './provider';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { setToken, token } = useAuth();

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    startTransition(async() => {
      try {
        const response = await fetchData({path: '/auth/login', method: 'POST', body: input});
        
        if(response?.access_token) {
          localStorage.setItem('access_token', response.access_token);
          setToken(response.access_token);
          navigate('/');
        }
        setError("Correo electrónico o contraseña incorrectos");
      } catch (error) {
        setError("Correo electrónico o contraseña incorrectos");
      }
    })
  }

  return token? <Navigate to={'/'} />: (
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
          <form onSubmit={onSubmit}>
            <label style={{font: 'var(--h3)'}} className='block text-sm font-medium mb-2' htmlFor='email'>
              Correo electrónico
            </label>
            <input
              id='email'
              value={input.email}
              type='email'
              onChange={(e) => setInput({...input, email: e.target.value})}
              className='w-full p-3 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-[var(--purple)]'
              placeholder='Correo electrónico'
              disabled={isPending}
            />

            <label style={{font: 'var(--h3)'}} className='block text-sm font-medium mb-2' htmlFor='password'>
              Contraseña
            </label>
            <div className='relative mb-2'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={input.password}
                onChange={(e) => setInput({...input, password: e.target.value})}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--purple)] pr-10'
                placeholder='Contraseña'
                disabled={isPending}
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

            {error && <p className='text-red-500 text-xs mb-6'>
              <TriangleAlert size={16} className='inline-block mr-2' />
              {error}
              </p>}

            <button
              type='submit'
              className='w-full bg-[var(--purple)] text-white py-3 rounded-lg font-medium hover:bg-[var(--purple-hover)] cursor-pointer'
              disabled={isPending}
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