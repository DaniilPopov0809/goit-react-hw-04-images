import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SearchForm from './Searchbar';
import ImageGallery from './ImageGallery';
import getDataImg from 'utils/API';
import Loader from 'components/Loader/';
import LoadMore from 'components/Button';

import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import * as Scroll from 'react-scroll';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [galery, setGalery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const per_page = 12;

  useEffect(() => {
    const renderGallery = async () => {
      setLoading(true);
      setButton(false);

      try {
        const { hits, totalHits } = await getDataImg(
          searchValue,
          page,
          per_page
        );
        setTotalHits(totalHits);
        if (hits.length === 0) {
          toast.error('Image or photo not found!');
        }

        setGalery(prevState => [...prevState, ...hits]);
      } catch {
        toast.error('Oops, something went wrong!');
        setButton(true);
      } finally {
        scrollDown();
        setLoading(false);
        setButton(true);
      }
    };

    if (searchValue || page > 1) {
      renderGallery();
    }
  }, [searchValue, page]);

  const formSumbit = search => {
    if(search === searchValue) {
      return;
    }
    setGalery([]);
    setPage(1);
    setSearchValue(search);
  };

  const onIncrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  const scrollDown = () => {
    let scroll = Scroll.animateScroll;
    scroll.scrollToBottom();
  };

  const limitImgLoad = galery.length > totalHits;

  return (
    <>
      <SearchForm onSubmit={formSumbit} />
      <ImageGallery galery={galery} />
      {loading && <Loader />}
      {button && !limitImgLoad && <LoadMore currentPage={onIncrementPage} />}

      <ToastContainer autoClose={1000} />
    </>
  );
}
