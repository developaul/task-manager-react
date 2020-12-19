import { useState } from 'react';

const useForm = initialState => {

    const [values, setvalues] = useState(initialState);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setvalues({
            ...values,
            [name]: value
        });
    };

    const handleInputReset = () => setvalues(initialState);

    return [values, handleInputChange, handleInputReset];
};

export default useForm;