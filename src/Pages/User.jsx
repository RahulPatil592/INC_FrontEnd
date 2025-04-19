import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/User.css';

import userimg from '../assets/userSVG.svg';
import crimg from '../assets/createImg.svg';
import vrimg from '../assets/verifyImg.svg';
import arrowimg from '../assets/arrowUpSVG.svg';

import Modal from '../Components/Modal/Modal.jsx';
import axios from 'axios';

const User = () => {
  const [showModal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/user/getuser')
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        alert('Please Login first');
        navigate('/login');
      });
  }, [navigate]);

  const renderPoFUCard = (item, title = null, index) => (
    <div className='ip_div' key={index}>
      <p className='ip_title'>{title || item.title}</p>
      <p className='ip_id'>{item.blockNumber}</p>
      <p className='ip_vmore'>
        <button
          onClick={() => {
            setModal(true);
            setModalData(item);
          }}
          className='ipvlink'
        >
          View More <img src={arrowimg} alt='' />
        </button>
      </p>
    </div>
  );

  const totalIPs = user.userIP?.length || 0;
  const totalWills = user.userWill?.length || 0;

  return (
    <>
      <section id='user_sec1'>
        <div id='user_panel'>
          <div id='user_detail_div'>
            <div id='user_imgdiv'>
              <img src={userimg} alt='' />
            </div>
            <div id='user_details_div'>
              <p id='username'>{user?.name}</p>
              <p id='useremail'>{user?.email}</p>
              <p id='userphone'>{user?.phone}</p>
            </div>
          </div>
          <div id='user_work_div'>
            <p id='r1'>POFU's created by you</p>
            <div id='r2'>
              <div id='total_cnt'>{totalIPs + totalWills}</div>
              <div id='ips'>{totalIPs}<br />IP's</div>
              <div id='wills'>{totalWills}<br />Will's</div>
            </div>
          </div>
        </div>

        <div id='creat_and_verify_div'>
          <div className='aanv_div'>
            <div className='aanv_imgdiv'>
              <img src={crimg} alt='' />
            </div>
            <div className='aanv_btndiv'>
              <Link to='/create' className='aanv_btn'>Create Now</Link>
            </div>
          </div>

          <div className='aanv_div'>
            <div className='aanv_imgdiv'>
              <img src={vrimg} alt='' />
            </div>
            <div className='aanv_btndiv'>
              <Link to='/verify' className='aanv_btn'>Verify Doc</Link>
            </div>
          </div>
        </div>
      </section>

      <section id='user_sec2'>
        <div id='user_sec2title'>Your PoFU's</div>
        <div id='user_ips_div'>
          {(totalIPs > 0 || totalWills > 0) ? (
            <>
              {user.userIP?.map((ip, idx) => renderPoFUCard(ip, null, `ip-${idx}`))}
              {user.userWill?.map((will, idx) => renderPoFUCard(will, 'Will', `will-${idx}`))}
            </>
          ) : (
            <div id='noip_div'>You Have No IP's</div>
          )}
        </div>
      </section>

      {showModal && (
        <Modal
          modalData={modalData}
          setModal={setModal}
          isverified={isVerified}
          setIsVerified={setIsVerified}
        />
      )}
    </>
  );
};

export default User;
