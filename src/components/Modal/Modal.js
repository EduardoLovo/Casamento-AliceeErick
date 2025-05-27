// src/components/Modal.jsx
import React from 'react';
import './Modal.css'; // estilize conforme necessário

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
