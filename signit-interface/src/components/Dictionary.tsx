import React, { useState } from 'react';

interface Props {};

export const Dictionary = ({}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <section className="page-content">Dictionary</section>
    );
};

export default Dictionary;