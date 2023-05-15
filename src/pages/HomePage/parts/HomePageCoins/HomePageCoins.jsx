import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePageCoins.css';
import { Image, ProgressBar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { searchContract, setNullInfoContract } from '../../../store/actions/userActions';
import { formatNumbers } from '../../../services/formatNumbers';

function HomePageCoins({ name, img, marketCap, difVolume, segurityPoints, num, address, createdAt }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowProject = async (e) => {
    e.preventDefault();
    await dispatch(searchContract(e.target.id));
    await dispatch(setNullInfoContract());
    navigate('/contract');
  };

  return (
    <tr>
      <td>{num + 1}</td>
      <td>
        <div>
          <Image src={img === 'https://ethplorer.io/undefined' ? 'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg' : img || 'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'} fluid style={{ borderRadius: '50px', width: '28px', height: '28px' }} />
          <p onClick={(e) => handleShowProject(e)} style={{ cursor: 'pointer' }} id={address}>
            {name}
          </p>
        </div>
      </td>
      <td>
        <div className='ProgressBar_Center'>
          <p>{Math.round(segurityPoints)} security points</p>
          <ProgressBar variant={segurityPoints < 40 ? 'danger' : segurityPoints < 70 ? 'warning' : 'success'} now={segurityPoints} />
        </div>
      </td>
      <td>
        <div className='td_Center'>
          <div className='MarketCap_Div'>
            <p>{formatNumbers(marketCap || 0)}</p>
          </div>
          <div>
            <p className={Math.sign(difVolume || 0) === -1 ? 'td_Negative' : 'td_Positive'}>{difVolume ? `${difVolume}%` : `${0}%`}</p>
          </div>
        </div>
      </td>
      <td>
        <div>
          <p>{dayjs(createdAt).format('MMMM DD, YYYY ')}</p>
        </div>
      </td>
    </tr>
  );
}

export default HomePageCoins;
