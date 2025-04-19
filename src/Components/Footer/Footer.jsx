import React, { useState } from 'react';
import { socialMediaData } from './data.js';
import '../../Styles/Footer.css';
import { Link } from 'react-router-dom';
import TermsModal from '../TermsModal'; // Import your TermsModal component

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  // Function to handle opening the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id='footer_sec'>
      <div id='footer_inline'>
        <div id='footer_seclogo'>OriginMark</div>
        <div id='footer_links'>
          <Link to='/about' className='flinks'>
            About us
          </Link>
          {/* Update the "Terms & Privacy Policy" link to open the modal */}
          <span className='flinks' onClick={openModal}>
            Terms & Privacy Policy
          </span>
        </div>
        <p id='cprt'>© 2025 OriginMark</p>
      </div>

      {/* Render TermsModal component */}
      <TermsModal show={showModal} onClose={closeModal} />
    </section>
  );
};

export default Footer;
