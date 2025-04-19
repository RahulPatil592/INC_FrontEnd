import React, { useState } from 'react';
import '../Styles/CreateIp.css';
import uploadimg from '../assets/uploadSVG.svg';
import DragAndDrop from '../Components/DragAndDrop/DragAndDrop';
import axios from 'axios';
import { ScrollRestoration } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import TermsModal from '../Components/TermsModal';
toast.success("Submitted successfully!")
toast.error("Something went wrong!")

const CreateIP = () => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const [digsign, setDigSign] = useState('');
  const [progress, setProgress] = useState(0);
  const [showTerms, setShowTerms] = useState(false);

  const submitIPForm = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newOwnerName = form.newOwnerName.value.trim();
    const newOwnerProofIdentifier = form.newOwnerProofIdentifier.value.trim();
    const newTitle = form.newTitle.value.trim();
    const newIpType = form.newIpType.value.trim();
    const newDescription = form.newDescription.value.trim();
    const newLinks = form.stnewLinks.value.trim();
    const newLicenseType = form.newLicenseType.value.trim();
    const newExtraInfo = form.newExtrainfo.value.trim();
    const termsChecked = form.termsChecked.checked;
    const digitalSignFile = form.newOwnerDigitalSign.files[0];

    if (
      !newOwnerName ||
      !newOwnerProofIdentifier ||
      !newTitle ||
      !newIpType ||
      !newDescription ||
      !newLinks ||
      !newLicenseType ||
      !digitalSignFile ||
      !termsChecked
    ) {
      toast.error('Please fill all required fields and agree to terms.', { position: 'top-center' });
      return;
    }

    let itemFormData = new FormData();
    setProgress(30);

    itemFormData.append('docs', digitalSignFile);
    for (let i = 0; i < selectedfile.length; i++) {
      itemFormData.append('docs', selectedfile[i]);
    }

    itemFormData.append('newOwnerName', newOwnerName);
    itemFormData.append('newOwnerProofIdentifier', newOwnerProofIdentifier);
    itemFormData.append('newTitle', newTitle);
    itemFormData.append('newIpType', newIpType);
    itemFormData.append('newDescription', newDescription);
    itemFormData.append('newLinks', newLinks);
    itemFormData.append('newLicenseType', newLicenseType);
    itemFormData.append('termsChecked', termsChecked);
    itemFormData.append('newExtraInfo', newExtraInfo);

    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await axios.post('/user/upload', itemFormData, axiosConfig);
      toast.success('IP successfully created!', { position: 'top-center' });
      form.reset();
      SetSelectedFile([]);
      setDigSign('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create IP. Please try again.', { position: 'top-center' });
    } finally {
      setProgress(100);
    }
  };

  return (
    <section id='create_ip_sec'>
      <LoadingBar color='#007bff' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <p id='create_ip_title'>Create IP</p>
      <form onSubmit={submitIPForm}>
        <div id='owner_det_div'>
          <p className='create_titles'>Owner Details</p>
          <div id='owner_det_inpt_div'>
            <div className='inps'>
              <input type='text' name='newOwnerName' placeholder='Name' required />
            </div>
            <div className='inps inp1'>
              {digsign.length > 0 ? `${digsign.slice(0, 30)}...` : 'Upload Digital Sign'}
              <input type='file' name='newOwnerDigitalSign' onChange={(e) => setDigSign(e.target.value)} required />
              <img src={uploadimg} alt='Upload Icon' />
            </div>
            <div className='inps'>
              <input type='text' placeholder='Aadhar no.' name='newOwnerProofIdentifier' required />
            </div>
          </div>
        </div>

        <div id='ip_det_div_back'>
          <div id='ip_det_div'>
            <p className='create_titles'>IP Details</p>
            <div id='ip_det_cr1'>
              <div className='inps'>
                <input type='text' name='newTitle' placeholder='Title' required />
              </div>
              <div className='inps'>
                <input type='text' name='newIpType' placeholder='Type' required />
              </div>
            </div>
            <div id='ip_det_cr2'>
              <div className='inps'>
                <textarea name='newDescription' placeholder='Description' required />
              </div>
            </div>
            <DragAndDrop selectedfile={selectedfile} SetSelectedFile={SetSelectedFile} />
            <div id='ip_det_cr4'>
              <div className='inps'>
                <input type='text' name='stnewLinks' placeholder='External Link' required />
              </div>
              <div className='inps'>
                <input type='text' name='newLicenseType' placeholder='License Type' required />
              </div>
            </div>
            <div id='ip_det_cr5'>
              <div className='inps'>
                <input type='text' name='newExtrainfo' placeholder='Additional Information' />
              </div>
            </div>
          </div>
        </div>

        <p id='agree_chk_div'>
  <input type='checkbox' name='termsChecked' />&nbsp;
  I acknowledge that I own the rights to the submitted document and
  agree to the <span id='tc_text' style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => setShowTerms(true)}>terms and conditions</span>.
</p>
<TermsModal show={showTerms} onClose={() => setShowTerms(false)} />

        <p id='createip_btns_div'>
          <button className='sbt_btn' type='submit'>Submit</button>
        </p>
      </form>
      <ScrollRestoration />
    </section>
  );
};

export default CreateIP;
