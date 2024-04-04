import React from 'react'
import '../../Styles/Modal.css';
import closeimg from '../../assets/closeSVG.svg'
import PDFDownloadComponent from '../../Components/WillPDF/PDFDownloadComponent.jsx'
const Modal = ({ modalData, setModal,isverified ,setIsVerified}) => {
    return (
        <section id='modal_sec'>
            <div id='modal_clsbtn_div'>
                <button onClick={()=>{
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
                <p className='modal_id'>Block ID: <span className='modal_mnid'>{modalData.blockId}</span></p>
                <p className='modal_type'>Type : <span className='modal_mntype'>{modalData.type}</span></p>
                <p className='modal_desc_title'>
                    Description<br />
                    <p className='modal_desc'>{modalData.description}</p>
                </p>

                <p className='modal_btns'>
                    <button className='mdbtn'>View Document</button>
                    {/* <button className='mdbtn'> */}
<PDFDownloadComponent data={{name:"rahul",digitalSignLink:"ewewrw",aadharNo:"232132"}} />
                    
                </p>
            </div>
        </section>
    )
}

export default Modal