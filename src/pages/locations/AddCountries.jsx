import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { masterClient } from '../../utils/httpClient'
import Loader from '../../components/Loader'
import { Country } from 'country-state-city';
import { toastWarning, toastSuccess, toastError } from '../../utils/toast';
const AddCountries = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [countries, setCountries] = useState([]);
    const [formError, setFormError] = useState({});
    const handleCountryChange = (e) => {
        const countryCode = countries.find(country => country.name === e.target.value).isoCode;
        const countryCodePrefix = countries.find(country => country.name === e.target.value).phonecode;
        setFormData({
            ...formData,
            country_name: e.target.value,
            country_code: countryCode,
            phone_code: `+${countryCodePrefix}`
        })
    }

    const validateForm = () => {
        let errors = {};
        if (formData.country_name == undefined || formData.country_name == 'default') {
            errors.country = 'Country is required';
            setFormError(errors);
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                const response = await masterClient.post('/country', formData);
                if (response?.data?.status) {
                    toastSuccess(response?.data?.message);
                    setFormData({});
                    setFormError({});
                }
            }
            catch (error) {
                toastError(error?.response?.data?.message);
            }
            finally {
                setLoading(false);
            }
        }
        else {
            console.log('error');
        }
    }

    useEffect(() => {
        setCountries(Country.getAllCountries())
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Add Countries</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <select className="form-select" name="country_name" required onChange={handleCountryChange}>
                                <option value="default">Select Country</option>
                                {countries.map((country) => (
                                    <option value={country.name}>{country.name}</option>
                                ))}
                            </select>
                            {formError.country && <p className="err">{formError.country}</p>}
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="text" id="country-name" className="form-control" name="country_code" placeholder="Enter Country Name"
                                    value={formData.country_code || ''}
                                    readOnly />
                                <label for="country-name" className="fw-normal">Country Code</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="text" id="country-code-prefix" className="form-control" name="phone_code" placeholder="Enter Country Name"
                                    value={formData.phone_code || ''}
                                    readOnly

                                />
                                <label for="country-code-prefix" className="fw-normal">Country Code Prefix</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCountries