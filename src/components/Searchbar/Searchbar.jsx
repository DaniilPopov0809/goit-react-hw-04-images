import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import { Header, Input, Button, Form } from './Searchbar.styled';

export default function SearchForm({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = event => {
    const currentInputValue = event.currentTarget.value.toLowerCase();
    setSearchValue(currentInputValue);
  };

  const handleSumbitForm = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.info('Enter search image or photo!');
      return;
    }
    onSubmit(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSumbitForm}>
        <Button type="submit" className="button">
          <span className="button-label">
            <BsSearch style={{ width: 20, height: 20 }} />
          </span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={searchValue}
        />
      </Form>
    </Header>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
