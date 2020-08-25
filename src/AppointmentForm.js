import React, {useState} from 'react';

export const AppointmentForm = ({selectableServices = [], service, onSubmit}) => {

    const [selectedService, setService] = useState(service)

    const handleChange = ({ target }) => {
        setService( target.value);
    }

    return <form id="appointment" onSubmit={() => onSubmit(selectedService)}>
        <label htmlFor="service">Service</label>
        <select
            name="service"
            id={"service"}
            value={selectedService}
            onChange={handleChange}
        >
            <option />
            {selectableServices.map(s => (
                <option key={s}>{s}</option>
            ))}
        </select>

    </form>
};

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions']
};