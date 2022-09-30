interface CheckBoxProps {
    label: string;
    value: boolean;
    onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({label, value, onChange}) => {
    return (
        <label>
            <input type={'checkbox'} checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default CheckBox;