import React, { useState } from 'react';
import '../Styles/CreateIp.css';
import uploadimg from '../assets/uploadSVG.svg';
import DragAndDrop from '../Components/DragAndDrop/DragAndDrop';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateIP = () => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const [digsign, setDigSign] = useState('');

  const validateField = (name, value) => {
    if (!value || value.trim() === '') return `${name} is required.`;

    if (name.includes("Aadhar") && !/^\d{12}$/.test(value)) {
      return `${name} must be a 12-digit number.`;
    }

    if (name.includes("Phone") && !/^[6-9]\d{9}$/.test(value)) {
      return `${name} must be a 10-digit number starting with 6-9.`;
    }

    if (name.includes("External Link") && value && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(value)) {
      return `${name} must be a valid URL.`;
    }

    return null;
  };

  const validateForm = (form) => {
    const validations = [
      { name: 'Owner Name', value: form.newOwnerName?.value },
      { name: 'Owner Aadhar', value: form.newOwnerProofIdentifier?.value },
      { name: 'Owner Phone', value: form.newOwnerPhone?.value },
      { name: 'Title', value: form.newTitle?.value },
      { name: 'IP Type', value: form.newIpType?.value },
      { name: 'Description', value: form.newDescription?.value },
      { name: 'External Link', value: form.stnewLinks?.value },
    ];

    for (let field of validations) {
      const error = validateField(field.name, field.value);
      if (error) {
        toast.error(error);
        return false;
      }
    }

    if (!form.termsChecked?.checked) {
      toast.error("You must agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  const submitIPForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!validateForm(form)) return;

    const toastId = toast.loading("Submitting your form...");

    const itemFormData = new FormData();

    itemFormData.append('docs', form.newOwnerDigitalSign?.files[0] || null);
    selectedfile.forEach(file => itemFormData.append('docs', file));

    itemFormData.append("newOwnerName", form.newOwnerName?.value || "");
    itemFormData.append("newOwnerProofIdentifier", form.newOwnerProofIdentifier?.value || "");
    itemFormData.append("newOwnerPhone", form.newOwnerPhone?.value || "");
    itemFormData.append("newTitle", form.newTitle?.value || "");
    itemFormData.append("newIpType", form.newIpType?.value || "");
    itemFormData.append("newDescription", form.newDescription?.value || "");
    itemFormData.append("newLinks", form.stnewLinks?.value || "");
    itemFormData.append("newLicenseType", form.newLicenseType?.value || "");
    itemFormData.append("termsChecked", form.termsChecked?.checked || false);
    itemFormData.append("newExtraInfo", form.newExtrainfo?.value || "");

    const config = {
      headers: { 'Content-Type': "multipart/form-data" },
    };

    try {
      await axios.post('/user/upload', itemFormData, config);
      toast.update(toastId, {
        render: "Item added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      form.reset();
      SetSelectedFile([]);
      setDigSign('');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error occurred while uploading.";
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Upload error:", err);
    }
  };

  return (
    <section id="create_ip_sec">
      <ToastContainer />
      <p id="create_ip_title">Create IP</p>
      <form onSubmit={submitIPForm}>
        <div id="owner_det_div">
          <p className="create_titles">Owner Details</p>
          <div id="owner_det_inpt_div">
            <div className="inps">
              <input type="text" name="newOwnerName" placeholder="Name" />
            </div>
            <div className="inps inp1">
              {digsign.length > 0 ? `${digsign.slice(0, 30)} ...` : "Upload Digital Sign"}
              <input
                type="file"
                name="newOwnerDigitalSign"
                onChange={(e) => setDigSign(e.target.value)}
              />
              <img src={uploadimg} alt="upload" />
            </div>
            <div className="inps">
              <input type="text" name="newOwnerProofIdentifier" placeholder="Aadhar no." />
            </div>
            <div className="inps">
              <input type="text" name="newOwnerPhone" placeholder="Phone no." />
            </div>
          </div>
        </div>

        <div id="ip_det_div_back">
          <div id="ip_det_div">
            <p className="create_titles">IP Details</p>
            <div id="ip_det_cr1">
              <div className="inps">
                <input type="text" name="newTitle" placeholder="Title" />
              </div>
              <div className="inps">
                <input type="text" name="newIpType" placeholder="Type" />
              </div>
            </div>
            <div id="ip_det_cr2">
              <div className="inps">
                <textarea name="newDescription" placeholder="Description" />
              </div>
            </div>
            <DragAndDrop selectedfile={selectedfile} SetSelectedFile={SetSelectedFile} />
            <div id="ip_det_cr4">
              <div className="inps">
                <input type="text" name="stnewLinks" placeholder="External Link" />
              </div>
            </div>
            <div id="ip_det_cr5">
              <div className="inps">
                <input type="text" name="newExtrainfo" placeholder="Additional Information" />
              </div>
            </div>
          </div>
        </div>

        <p id="agree_chk_div">
          <input type="checkbox" name="termsChecked" />
          &nbsp;I acknowledge that I own the rights to the submitted document and agree to the{" "}
          <a href="https://www.w3schools.com" id="tc_text">
            terms and conditions.
          </a>
        </p>

        <p id="createip_btns_div">
          <button className="sbt_btn">Submit</button>
        </p>
      </form>
    </section>
  );
};

export default CreateIP;