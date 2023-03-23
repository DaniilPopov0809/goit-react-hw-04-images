import axios from 'axios';
import { toast } from 'react-toastify';

 async function getDataImg(searchValue, page, per_page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const PARAMS = {
      params: {
        key: '33059287-a3adfd6fce60f5adf99857961',
        q: `${searchValue}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${page}`,
        per_page: `${per_page}`,
      },
    };
    const response = await axios.get(BASE_URL, PARAMS);
    const data = response.data;
    if (data.length === 0) {
      toast.error('Image or photo not found!');
    }
    return data;
  }

  export default getDataImg;