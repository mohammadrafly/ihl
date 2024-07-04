import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const Mermaid = ({ content }) => {
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
        });
        mermaid.contentLoaded();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mermaid text-2xl">{content}</div>
        </div>
    );
};

export default Mermaid;
