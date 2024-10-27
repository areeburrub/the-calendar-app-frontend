import {useState} from "react";
import {Input} from "@/components/ui/input";

export const TimeInput = ({value, onChange}: { value: string, onChange: (value: string) => void }) => {
    const [hours, setHours] = useState(value.split(':')[0] || '12');
    const [minutes, setMinutes] = useState(value.split(':')[1]?.split(' ')[0] || '00');
    const [ampm, setAmpm] = useState(value.split(' ')[1] || 'AM');

    const handleChange = (newHours: string, newMinutes: string, newAmpm: string) => {
        const formattedHours = newHours.padStart(2, '0');
        const formattedMinutes = newMinutes.padStart(2, '0');
        onChange(`${formattedHours}:${formattedMinutes} ${newAmpm}`);
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="number"
                min="1"
                max="12"
                value={hours}
                onChange={(e) => {
                    setHours(e.target.value);
                    handleChange(e.target.value, minutes, ampm);
                }}
                className="w-16"
            />
            <span>:</span>
            <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => {
                    setMinutes(e.target.value);
                    handleChange(hours, e.target.value, ampm);
                }}
                className="w-16"
            />
            <select
                value={ampm}
                onChange={(e) => {
                    setAmpm(e.target.value);
                    handleChange(hours, minutes, e.target.value);
                }}
                className="w-20"
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    );
};

