import React, { useEffect, useState } from "react";
import "../../Styles/Modal.css";
import closeimg from "../../assets/closeSVG.svg";
import PDFDownloadComponent from "../../Components/WillPDF/PDFDownloadComponent.jsx";
import axios from "axios";


const Modal = ({ modalData, setModal, isverified, setIsVerified }) => {
  const [IPdata, setIPData] = useState(null);

  return (
    <section id="modal_sec">
      <div id="modal_clsbtn_div">
        <button
          onClick={() => {
            setModal(false);
            setIsVerified(false);
          }}
        >
          <img src={closeimg} alt="" />
        </button>
      </div>
      <div id="modal_div">
        {isverified && <p className="isverified_div">Verified Document</p>}
        {!isverified && <p className="isverified_div">Unverified Document</p>}

        <p className="modal_btns">
          {
            isverified && modalData &&
            <a
              href={`https://ipfs.io/ipfs/${modalData?.willDocument}`}
              className="mdbtn">
              View Document
            </a>
          }


          {
            isverified &&
            <PDFDownloadComponent
              data={modalData}
              type={modalData?.ipType ? 'ip' : 'will'}
              blockId={modalData?.blockNumber}
              trxnHash={modalData?.trxnHash}
              documentId={modalData?.documentId}
            />
          }
        </p>
      </div>
    </section>
  );
};

export default Modal;