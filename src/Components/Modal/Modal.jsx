import React, { useEffect, useState } from "react";
import "../../Styles/Modal.css";
import closeimg from "../../assets/closeSVG.svg";
import PDFDownloadComponent from "../../Components/WillPDF/PDFDownloadComponent.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ modalData, setModal, isverified, setIsVerified }) => {
  const [IPdata, setIPData] = useState(null);

  const showDoc = () => {};

  useEffect(() => {
    getBlock();
  }, []);

  const getBlock = async () => {
    try {
      const res = await axios.get(
        `/user/read${modalData.type ? "ip" : "will"}?id=${modalData.documentId}`
      );
      setIPData(res.data.record);
      console.log("res", res.data);
    } catch (e) {
      console.log(e);
      toast.error("Error while fetching details!");
    }
  };

  return (
    <>
      <ToastContainer /> {}
      <section id="modal_sec">
        <div id="modal_clsbtn_div">
          <button
            onClick={() => {
              setModal(false); 
              setIsVerified(false); 
            }}
          >
            <img src={closeimg} alt="Close" />
          </button>
        </div>
        <div id="modal_div">
          {isverified && <p className="isverified_div">Verified Document</p>}
          {!isverified && <p className="modal_title">{IPdata?.title}</p>}
          {!isverified && (
            <p className="modal_type">
              Type : <span className="modal_mntype">{modalData?.type}</span>
            </p>
          )}
          {!isverified && (
            <p className="modal_id">
              Block ID:{" "}
              <span className="modal_mnid">{modalData?.blockNumber}</span>
            </p>
          )}
          {!isverified && (
            <p className="modal_id">
              Document ID:{" "}
              <span className="modal_mnid">{modalData?.documentId}</span>
            </p>
          )}

          <p className="modal_btns">
            {IPdata && (
              <a
                href={`https://ipfs.io/ipfs/${IPdata.proofs[0]}`}
                className="mdbtn"
                onClick={showDoc}
              >
                View Document
              </a>
            )}
            {isverified && modalData && (
              <a
                href={`https://ipfs.io/ipfs/${modalData?.willDocument}`}
                className="mdbtn"
                onClick={showDoc}
              >
                View Document
              </a>
            )}

            {IPdata && (
              <PDFDownloadComponent
                data={IPdata ? IPdata : {}}
                type={modalData?.type ? "ip" : "will"}
                blockId={modalData?.blockNumber}
                trxnHash={modalData?.trxnHash}
                documentId={modalData?.documentId}
              />
            )}
            {isverified && (
              <PDFDownloadComponent
                data={modalData}
                type={modalData?.type ? "ip" : "will"}
                blockId={modalData?.blockNumber}
                trxnHash={modalData?.trxnHash}
                documentId={modalData?.documentId}
              />
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default Modal;
