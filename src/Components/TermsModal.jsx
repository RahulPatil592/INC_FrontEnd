// Components/TermsModal.jsx
import React from "react";
import "../Styles/TermsModal.css";

const TermsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Terms and Conditions</h2>
        <div className="terms-body">
          <ol>
            <li>
              <strong>Acceptance of Terms:</strong> By using the Unchained IP
              platform (the “Platform”), including all services provided via our
              web application, you acknowledge that you have read, understood,
              and agree to be legally bound by these Terms and Conditions, along
              with our Privacy Policy.
            </li>
            <li>
              <strong>Services Provided:</strong> Unchained IP offers
              blockchain-based solutions that allow users to create immutable
              records of Intellectual Property (IP) documents, Wills, and
              Probates. The services include
            </li>
            <li>
              <strong>Eligibility:</strong> To use our services, you must be at
              least 18 years of age and capable of forming a binding contract
              under Indian law or the applicable law in your jurisdiction.
            </li>
            <li>
              <strong>Proof of First Use:</strong> Unchained IP provides a
              blockchain-based timestamp and record of the document submitted.
              However, we do not validate the originality or authorship of the
              content. The platform serves as a tool to support your claim in
              legal contexts by offering an immutable record.
            </li>
            <li>
              <strong>Intellectual Property Rights:</strong> All content,
              branding, and software on the platform are the intellectual
              property of Unchained IP and its creators: Darshan, Pratik,
              Gaurav, and Rahul. You may not copy, distribute, or
              reverse-engineer any part of the platform without explicit written
              permission.
            </li>
            <li>
              <strong>Data Privacy and Security:</strong> We prioritize user
              privacy and data security. Information provided is stored securely
              and only the cryptographic hash of documents is stored on the
              blockchain. Personal details are handled in accordance with our
              Privacy Policy.
            </li>
            <li>
              <strong>Limitation of Liability:</strong> Unchained IP, its team,
              and affiliates shall not be liable for any damages, legal
              consequences, or losses arising from the use or inability to use
              our platform, or reliance on the blockchain records created
              through it.
            </li>
            <li>
              <strong>Modifications to Terms:</strong> We reserve the right to
              update or modify these Terms at any time. Continued use of the
              platform after changes implies your acceptance of the revised
              Terms.
            </li>
            <li>
              <strong>Governing Law:</strong> These Terms shall be governed by
              and construed in accordance with the laws of India. Any disputes
              arising out of or in connection with these Terms shall be subject
              to the exclusive jurisdiction of the courts in Pune, Maharashtra.
            </li>
          </ol>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
