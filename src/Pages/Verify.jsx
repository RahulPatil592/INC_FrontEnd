import React, { useState } from "react";
import "../Styles/Verify.css";
import Modal from "../Components/Modal/Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [showModal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [valid, setValid] = useState(true);
  const [isverified, setIsVerified] = useState(false);
  const [docid, setDocId] = useState("");
  const [doctype, setDocType] = useState("");
  const [loading, setLoading] = useState(false);

  const validSubmit = async (event) => {
    event.preventDefault();
    const docid = event.target.docid.value;

    if (docid === "" || doctype === "") {
      setValid(false);
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    const toastId = toast.info("Fetching details...", { autoClose: false });
    try {
      const res = await axios.get(`/user/read${doctype}?id=${docid}`);
      if (res) {
        const data = res.data.record;
        setModalData(data);
        toast.success("Document verified successfully!");
        setModal(true);
      } else {
        setValid(false);
        toast.error("Invalid Document ID!");
      }
    } catch (error) {
      toast.error("An error occurred while verifying the document.");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    setIsVerified(false);
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <section id="verify_sec">
        <div id="verify_main_div">
          <p id="verify_title">Verify Document</p>
          <form action="" onSubmit={validSubmit}>
            <div id="verify_id_div">
              <select
                name="doctype"
                value={doctype}
                onChange={(e) => setDocType(e.target.value)}
              >
                <option value="" disabled>
                  Select Document Type
                </option>
                <option value="ip">IP</option>
                <option value="will">WILL</option>
              </select>
            </div>
            <div id="verify_id_div">
              <input
                type="text"
                placeholder="Enter Document ID"
                name="docid"
                onChange={(e) => setDocId(e.target.value)}
              />
            </div>
            {!valid && <p id="valid_verify">Enter Valid ID</p>}
            <div id="verify_sub_div">
              <button disabled={docid === "" || doctype === "" || loading}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      {modalData && showModal && (
        <Modal
          modalData={modalData}
          setModal={handleCloseModal}
          isverified={true}
          setIsVerified={setIsVerified}
        />
      )}
    </>
  );
};

export default Verify;
