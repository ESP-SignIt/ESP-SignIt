import React, { useState } from 'react';

interface Props {};

export const Traduction = ({}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <section className="page-content">Traduction</section>
    );
};

export default Traduction;