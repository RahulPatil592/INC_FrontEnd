import React, { useState } from 'react'
import '../../Styles/Modal.css';
import closeimg from '../../assets/closeSVG.svg'
import PDFDownloadComponent from '../../Components/WillPDF/PDFDownloadComponent.jsx';
import axios from 'axios'

const Modal = ({ modalData, setModal, isverified, setIsVerified }) => {
    const [IPdata, setIPData] = useState(null);
    const getBlock = async () => {
        await axios.get(`/user/read${modalData.type}?id=${modalData.documentId}`)
            .then((res) => {
                setIPData(res.record);
            })
            .catch(() => {
                alert('something went wrong')
            })
    }

    return (
        <section id='modal_sec'>
            <div id='modal_clsbtn_div'>
                <button onClick={() => {
                    setModal(false);
                    setIsVerified(false);
                }}>
                    <img src={closeimg} alt="" />
                </button>
            </div>
            <div id='modal_div'>
                {
                    isverified &&
                    <p className='isverified_div'>Verified Document</p>
                }
                <p className='modal_title'>{modalData.title}</p>
                <p className='modal_id'>Block ID: <span className='modal_mnid'>{modalData.blockNumber}</span></p>
                <p className='modal_type'>Type : <span className='modal_mntype'>{modalData.type}</span></p>
                {/* <p className='modal_desc_title'>
                    Description<br />
                    <p className='modal_desc'>{modalData.newDescription}</p>
                </p> */}

                <p className='modal_btns'>
                    <button className='mdbtn' onClick={getBlock}>View Document</button>
                    
                    <PDFDownloadComponent data={IPdata} type={modalData.type} blockId={modalData.blockNumber} trxnHash={modalData.trxnHash} />
                </p>
            </div>
        </section>
    )
}

export default Modal