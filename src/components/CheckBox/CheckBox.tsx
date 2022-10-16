interface CheckBoxProps {
    label: string;
    value: boolean;
    onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({label, value, onChange}) => {
    return (
        <label style={{color: 'white'}}>
            <input style={{margin: '5px'}} type={'checkbox'} checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default CheckBox;