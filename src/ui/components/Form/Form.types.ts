export interface FormEntry {
    name: string;
    placeholder: string;
    // TODO: Defined a suitable type for extra props
    // This type should cover all different of attribute types
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
    label: string;
    loading: boolean;
    formEntries: FormEntry[];
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText: string;
}