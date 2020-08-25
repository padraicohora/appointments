import React, {useState} from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSubmit}) => {

    const [customer, setCustomer] = useState({firstName, lastName, phoneNumber})

    const handleChange = ({ target }) => {
        setCustomer(customer => ({
            ...customer,
            [target.name]: target.value
        }));
    }
    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First Name</label>
        <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={lastName}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
            value={phoneNumber}
        />
        <input type="submit" value="Add" />
    </form>
}
