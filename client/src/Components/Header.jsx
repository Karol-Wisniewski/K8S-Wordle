import '../App.scss';
import { Link } from 'react-router-dom';
import plus from '../Utils/plus.png';
import polishFlag from '../Utils/polishFlag.png';
import statistics from '../Utils/statistics.png';
import question from '../Utils/question.png';
import refresh from '../Utils/refresh.png';
import logoutImg from '../Utils/logout.png';

function Header({currentUser, logout}) {
  return (
    <div className="Header">
      <div className="header-left">
        <button disabled={true}>
            <img src={polishFlag} alt="pl-flag" />
        </button>
        <button disabled={true}>
            <img src={plus} alt="plus" />
        </button>
        <button>
          <Link className="link" to="/game">
            <img src={refresh} alt="refresh" />
          </Link>
        </button>
      </div>
      <div className="header-mid">
        <button>
          <Link className="link" to="/game">Wordle</Link>
        </button>
      </div>
      <div className="header-right">
        <button>
          <Link className="link" to="/profile">
            <img src={statistics} alt="statistics" />
          </Link>
        </button>
        <button>
          <Link className="link" to="/game/rules">
            <img src={question} alt="question" />
          </Link>
        </button>
        <button onClick={logout}>
          <Link className="link">
            <img src={logoutImg} alt="logout" />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
