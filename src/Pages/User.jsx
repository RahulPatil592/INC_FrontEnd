import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../Styles/User.css';
import '../Styles/Modal.css';

import userimg from '../assets/userSVG.svg';
import crimg from '../assets/createImg.svg';
import vrimg from '../assets/verifyImg.svg';
import arrowimg from '../assets/arrowUpSVG.svg';
import closeimg from '../assets/closeSVG.svg';

import PDFDownloadComponent from '../Components/WillPDF/PDFDownloadComponent.jsx';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const [showModal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalIPData, setModalIPData] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(true); // State for skeleton loading
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/user/getuser')
      .then(res => {
        setUser(res.data);
        setLoading(false); // Stop skeleton animation after data is fetched
      })
      .catch(() => {
        toast.error('Please Login first'); // Show toast notification
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after showing toast
        }, 2000); // Delay for 2 seconds
      });
  }, [navigate]);

  const handleViewMore = async (item) => {
    setModal(true);
    setModalLoading(true);
    setModalData(item);
    try {
      const res = await axios.get(`/user/read${item.type ? 'ip' : 'will'}?id=${item.documentId}`);
      setModalIPData(res.data.record);
    } catch (e) {
      toast.error("Something went wrong"); // Replace alert with toast
    }
    setModalLoading(false);
  };

  const renderPoFUCard = (item, title = null, index) => (
    <div className='ip_div' key={index}>
      <p className='ip_title'>{title || item.title}</p>
      <p className='ip_id'>{item.blockNumber}</p>
      <p className='ip_vmore'>
        <button
          onClick={() => handleViewMore(item)}
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
      <ToastContainer />
      {loading ? ( // Show skeleton animation while loading
        <section id='user_sec1'>
          <div id='user_panel'>
            <div id='user_detail_div'>
              <div id='user_imgdiv'><Skeleton circle={true} height={100} width={100} /></div>
              <div id='user_details_div'>
                <p id='username'><Skeleton width={150} /></p>
                <p id='useremail'><Skeleton width={200} /></p>
                <p id='userphone'><Skeleton width={100} /></p>
              </div>
            </div>
            <div id='user_work_div'>
              <p id='r1'><Skeleton width={200} /></p>
              <div id='r2'>
                <div id='total_cnt'><Skeleton width={50} height={50} /></div>
                <div id='ips'><Skeleton width={50} /></div>
                <div id='wills'><Skeleton width={50} /></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="fade-in">
          <section id='user_sec1'>
            <div id='user_panel'>
              <div id='user_detail_div'>
                <div id='user_imgdiv'><img src={userimg} alt='' /></div>
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
                <div className='aanv_imgdiv'><img src={crimg} alt='' /></div>
                <div className='aanv_btndiv'><Link to='/create' className='aanv_btn'>Create Now</Link></div>
              </div>
              <div className='aanv_div'>
                <div className='aanv_imgdiv'><img src={vrimg} alt='' /></div>
                <div className='aanv_btndiv'><Link to='/verify' className='aanv_btn'>Verify Doc</Link></div>
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
        </div>
      )}

      {showModal && (
        <section id="modal_sec">
          <div id="modal_clsbtn_div">
            <button onClick={() => {
              setModal(false);
              setIsVerified(false);
              setModalIPData(null);
              setModalData(null);
            }}>
              <img src={closeimg} alt="close" />
            </button>
          </div>
          <div id="modal_div">
            {modalLoading ? (
              <div className="loader_container">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="fade-in">
                {isVerified && <p className="isverified_div">Verified Document</p>}
                {!isVerified && <p className="modal_title">{modalIPData?.title}</p>}
                {!isVerified && <p className="modal_type">Type : <span className="modal_mntype">{modalData?.type}</span></p>}
                {!isVerified && <p className="modal_id">Block ID: <span className="modal_mnid">{modalData?.blockNumber}</span></p>}
                {!isVerified && <p className="modal_id">Document ID: <span className="modal_mnid">{modalData?.documentId}</span></p>}
                <p className="modal_btns">
                  {modalIPData && (
                    <a href={`https://ipfs.io/ipfs/${modalIPData.proofs[0]}`} className="mdbtn" target='_blank' rel='noreferrer'>
                      View Document
                    </a>
                  )}
                  {isVerified && modalData && (
                    <a href={`https://ipfs.io/ipfs/${modalData?.willDocument}`} className="mdbtn" target='_blank' rel='noreferrer'>
                      View Document
                    </a>
                  )}
                  {modalIPData && (
                    <PDFDownloadComponent
                      data={modalIPData}
                      type={modalData?.type ? 'ip' : 'will'}
                      blockId={modalData?.blockNumber}
                      trxnHash={modalData?.trxnHash}
                      documentId={modalData?.documentId}
                    />
                  )}
                  {isVerified && (
                    <PDFDownloadComponent
                      data={modalData}
                      type={modalData?.type ? 'ip' : 'will'}
                      blockId={modalData?.blockNumber}
                      trxnHash={modalData?.trxnHash}
                      documentId={modalData?.documentId}
                    />
                  )}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default User;