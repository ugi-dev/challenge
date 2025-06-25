import React from 'react';

interface FormFields {
    [key: string]: string;
}

export const useFormFields = (initialFields: FormFields) => {
    const [fields, setFields] = React.useState<FormFields>(initialFields);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const clearFields = React.useCallback(() => {
        setFields(initialFields);
    }, [initialFields]);

    const setField = React.useCallback((name: string, value: string) => {
        setFields(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    return {
        fields,
        handleChange,
        clearFields,
        setField
    };
};