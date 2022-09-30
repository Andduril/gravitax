import InputSlider from "react-input-slider"

interface SliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (event: {x: number, y: number}) => void;
}

const Slider: React.FC<SliderProps> = ({label, min, max, value, onChange}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>{label}</label>
            <InputSlider xmax={max} xmin={min} x={value} onChange={onChange} />
            <span>{value}</span>
        </div>
    );
};

export default Slider;