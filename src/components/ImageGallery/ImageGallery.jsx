import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { useState } from 'react';
import ModalWindow from 'components/Modal';

export default function ImageGallery({ galery }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const onHadnleClickImg = event => {
    const searchImg = galery.filter(
      elem => elem.webformatURL === event.target.src
    );
    setIsOpenModal(true);
    setModalImg(searchImg);
  };

  const onCloseModal = state => {
    setIsOpenModal(state);
  };

  return (
    <>
      {galery && (
        <List onClick={onHadnleClickImg}>
          {galery.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem key={id} webformatURL={webformatURL} alt={tags} />
          ))}
        </List>
      )}
      {isOpenModal && (
        <ModalWindow modalImg={modalImg} closeModal={onCloseModal} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  galery: PropTypes.array,
};
