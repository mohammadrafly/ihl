import React from 'react';
import htmlTruncate from 'html-truncate';

const TruncateContent = ({ content, length }) => {
    const truncatedContent = htmlTruncate(content, length, { ellipsis: '...' });

    return (
        <span dangerouslySetInnerHTML={{ __html: truncatedContent }}></span>
    );
};

export default TruncateContent;
