export interface RadioProps {
    id: string;
    name: string;
    value?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
}
