// src/components/Modal.jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    const modalRef = useRef();

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
        // eslint-disable-next-line
    }, []);

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                {children}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
