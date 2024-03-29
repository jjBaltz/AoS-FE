/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMemory } from '../../utils/data/memoryData';

const initialState = {
  activityId: 0,
  description: '',
};

function MemoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);

    initialState.activityId = router.query.id;
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      (formInput)
        .then(() => router.push('/memories'));
    } else {
      const payload = { ...formInput, userId: user.userId };
      createMemory(payload)
        .then(() => {
          router.push('/memories');
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Description INPUT  */}
      <FloatingLabel id="memory-desc" controlId="floatingTextArea" label="Description" className="mb-3">
        <Form.Control
          type="textarea"
          placeholder="Description of Memory"
          style={{ height: '300px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit" className="createMemory">{obj.id ? '' : 'Create'} +</Button>
    </Form>
  );
}

MemoryForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    activityId: PropTypes.number,
  }),
};

MemoryForm.defaultProps = {
  obj: initialState,
};

export default MemoryForm;
