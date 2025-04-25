import React, { useState } from 'react';
import uploadimg from '../assets/uploadSVG.svg';
import '../Styles/CreateWill.css';
import DragAndDrop from '../Components/DragAndDrop/DragAndDrop';
import axios from 'axios';
import { ScrollRestoration } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWill = () => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const [exdigsign, setexDigSign] = useState('');
  const [tesdigsign, settesDigSign] = useState('');
  const [witdigsign, setwitDigSign] = useState('');

  const validateField = (name, value) => {
    if (!value || value.trim() === '') return `${name} is required.`;

    if (name.includes("Aadhar") && !/^\d{12}$/.test(value)) {
      return `${name} must be a 12-digit number.`;
    }

    if (name.includes("Phone") && !/^\d{10}$/.test(value)) {
      return `${name} must be a 10-digit number.`;
    }

    return null;
  };

  const validateForm = (form) => {
    const validations = [
      { name: 'Executor Name', value: form.newExecutorName.value },
      { name: 'Executor Aadhar', value: form.newExecutorIdProof.value },
      { name: 'Executor Digital Sign', value: form.newExecutorDigitalSign.files[0]?.name },
      { name: 'Testator Name', value: form.newTestatorName.value },
      { name: 'Testator Aadhar', value: form.newTestatorIdProof.value },
      { name: 'Testator Digital Sign', value: form.newTestatorDigitalSign.files[0]?.name },
      { name: 'Witness Name', value: form.newWitnessName.value },
      { name: 'Witness Aadhar', value: form.newWitnessIdProof.value },
      { name: 'Witness Digital Sign', value: form.newWitnessDigitalSign.files[0]?.name },
    ];

    for (let field of validations) {
      const error = validateField(field.name, field.value);
      if (error) {
        toast.error(error);
        return false;
      }
    }

    if (!form.tanc_chk.checked) {
      toast.error("Please accept the terms and conditions.");
      return false;
    }

    return true;
  };

  const submitIPForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!validateForm(form)) return;

    const toastId = toast.loading("Uploading Will...");

    const itemFormData = new FormData();

    itemFormData.append('willDocs', form.newExecutorDigitalSign.files[0]);
    itemFormData.append('willDocs', form.newTestatorDigitalSign.files[0]);
    itemFormData.append('willDocs', form.newWitnessDigitalSign.files[0]);

    selectedfile.forEach(file => itemFormData.append('willDocs', file));

    itemFormData.append("newExecutorName", form.newExecutorName.value);
    itemFormData.append("newExecutorIdProof", form.newExecutorIdProof.value);

    itemFormData.append("newTestatorName", form.newTestatorName.value);
    itemFormData.append("newTestatorIdProof", form.newTestatorIdProof.value);

    itemFormData.append("newWitnessName", form.newWitnessName.value);
    itemFormData.append("newWitnessIdProof", form.newWitnessIdProof.value);

    const config = {
      headers: { 'Content-Type': "multipart/form-data" },
    };

    try {
      await axios.post('/user/uploadWill', itemFormData, config);
      toast.update(toastId, {
        render: "Will successfully uploaded!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

      form.reset();
      SetSelectedFile([]);
      setexDigSign('');
      settesDigSign('');
      setwitDigSign('');

    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error uploading will!";
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
      console.error("Upload error:", err);
    }
  };

  return (
    <section id='create_ip_sec'>
      <ToastContainer />
      <p id='create_ip_title'>Create Will</p>
      <form onSubmit={submitIPForm}>
        {/* Executor */}
        <div id='owner_det_div'>
          <p className='create_titles'>Executor Details</p>
          <div id='owner_det_inpt_div'>
            <div className='inps'>
              <input type="text" name='newExecutorName' placeholder='Name' />
            </div>
            <div className='inps inp1'>
              {exdigsign && exdigsign}
              Upload Digital Sign
              <input type="file" name='newExecutorDigitalSign' onChange={(e) => setexDigSign(e.target.value)} />
              <img src={uploadimg} alt="" />
            </div>
            <div className='inps'>
              <input type="text" placeholder='Aadhar no.' name='newExecutorIdProof' />
            </div>
          </div>
        </div>

        {/* Testator */}
        <div id='owner_det_div_cover'>
          <div id='owner_det_div'>
            <p className='create_titles'>Testator Details</p>
            <div id='owner_det_inpt_div'>
              <div className='inps'>
                <input type="text" name='newTestatorName' placeholder='Name' />
              </div>
              <div className='inps inp1'>
                {tesdigsign && tesdigsign}
                Upload Digital Sign
                <input type="file" name='newTestatorDigitalSign' onChange={(e) => settesDigSign(e.target.value)} />
                <img src={uploadimg} alt="" />
              </div>
              <div className='inps'>
                <input type="text" placeholder='Aadhar no.' name='newTestatorIdProof' />
              </div>
            </div>
          </div>
        </div>

        {/* Witness */}
        <div id='owner_det_div'>
          <p className='create_titles'>Witness Details</p>
          <div id='owner_det_inpt_div'>
            <div className='inps'>
              <input type="text" name='newWitnessName' placeholder='Name' />
            </div>
            <div className='inps inp1'>
              {witdigsign && witdigsign}
              Upload Digital Sign
              <input type="file" name='newWitnessDigitalSign' onChange={(e) => setwitDigSign(e.target.value)} />
              <img src={uploadimg} alt="" />
            </div>
            <div className='inps'>
              <input type="text" placeholder='Aadhar no.' name='newWitnessIdProof' />
            </div>
          </div>
        </div>

        {/* Drag & Drop */}
        <div id='owner_det_div_cover'>
          <div id='owner_det_div'>
            <DragAndDrop selectedfile={selectedfile} SetSelectedFile={SetSelectedFile} />
          </div>
        </div>

        {/* Terms */}
        <p id='agree_chk_div'>
          <input type="checkbox" name='tanc_chk' />
          &nbsp;I acknowledge that I own the rights to the submitted document and
          agree to the <a href='https://www.w3schools.com' id='tc_text'>terms and conditions.</a>
        </p>

        {/* Submit */}
        <p id='createip_btns_div'>
          <button className='sbt_btn'>Submit</button>
        </p>
      </form>
      <ScrollRestoration />
    </section>
  );
};

export default CreateWill;
