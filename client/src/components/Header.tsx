import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'

const Header = () => {

    return (
        <div className="flex gap-4 items-center justify-center">
        <a href="https://vite.dev" >
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    );
};

export default Header;