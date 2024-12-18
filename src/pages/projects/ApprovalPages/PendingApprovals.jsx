import React, { useState, useEffect } from 'react'
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { projectClient } from '../../../utils/httpClient';
const PendingApprovals = () => {

    const userData = useSelector((state) => state.user.userData);

    const [loading, setLoading] = useState(false);
    const [pendingProjects, setPendingProjects] = useState([]);

    const getPendingProjects = async () => {
        setLoading(true)
        let res;
        try {
            res = await projectClient.get(`PendingProjects/${userData.city_code}`);
            if (res?.data?.status && res?.data?.data.length > 0) {
                setPendingProjects(res?.data?.data);
            }
            console.log(res?.data?.data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPendingProjects();
    })

    return (
        <>

        </>
    )
}

export default PendingApprovals
