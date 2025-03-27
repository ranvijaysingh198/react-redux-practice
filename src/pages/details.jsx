import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.data.items.find((item) => item.id === Number(id)));

  if (!item) return <p>Item not found</p>;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.body}</p>
    </div>
  );
};

export default Details;