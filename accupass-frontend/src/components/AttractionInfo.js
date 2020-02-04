import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AttractionInfo = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default AttractionInfo;
