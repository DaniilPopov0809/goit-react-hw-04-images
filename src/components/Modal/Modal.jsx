import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function ModalWindow({ modalImg, closeModal }) {
  const [isOpenModal, setIsOpenModal] = useState(null);

  const onCloseModal = () => {
    setIsOpenModal(false);
    closeModal(isOpenModal);
  };

  const onKeyCloseModal = event => {
    if (event.code === 'Escape') {
      setIsOpenModal(false);
      closeModal(isOpenModal);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyCloseModal);

    return () => {
      window.removeEventListener('keydown', onKeyCloseModal);
    };
  });

  return createPortal(
    <>
      <Overlay onClick={onCloseModal}>
        <Modal>
          <img src={modalImg[0].largeImageURL} alt={modalImg[0].tags} />
        </Modal>
      </Overlay>
    </>,
    modalRoot
  );
}

ModalWindow.propTypes = {
  closeModal: PropTypes.func,
  modalImg: PropTypes.arrayOf(PropTypes.object),
};
