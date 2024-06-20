import { useState, useEffect } from 'react';

const useForm = (validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });

        // Reset dependent fields when topic changes
        if (name === 'topic') {
        setValues((prevValues) => ({
            ...prevValues,
            language: '',
            experience: '',
            exerciseFrequency: '',
            dietPreference: '',
            qualification: '',
            fieldOfStudy: '',
        }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
        setValues((prevValues) => ({ ...prevValues, submitted: true }));
        }
    }, [errors, isSubmitting]);

    return {
        handleChange,
        values,
        handleSubmit,
        errors,
        handleSelectChange,
    };
};

export default useForm;
