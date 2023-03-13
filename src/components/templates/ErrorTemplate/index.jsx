import React from 'react';

import { TemplateHolder, ContentHolder } from './ErrorTemplate.styles';

function ErrorTemplate({ children }) {
  return (
    <>
      <TemplateHolder>
        <ContentHolder>{children}</ContentHolder>
      </TemplateHolder>
    </>
  );
}

export default ErrorTemplate;
