import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Header from './Header';  // Assuming you have a Header component
// import './assets/css/style.css'; // Adjust the path to your CSS files

const Dashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [agentsCount, setAgentsCount] = useState(0);
    const [buildersCount, setBuildersCount] = useState(0);
    const [propertiesCount, setPropertiesCount] = useState(0);
    const [apartmentsCount, setApartmentsCount] = useState(0);
    const [housesCount, setHousesCount] = useState(0);
    const [buildingsCount, setBuildingsCount] = useState(0);
    const [flatsCount, setFlatsCount] = useState(0);
    const [onSaleCount, setOnSaleCount] = useState(0);
    const [rentalsCount, setRentalsCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // Check session or authentication
        const user = localStorage.getItem('auser');
        if (!user) {
            navigate('/');  // Redirect to login if user is not authenticated
        }

        // Fetch the data from the backend API
        const fetchData = async () => {
            try {
                const usersRes = await axios.get('/api/users?utype=user');
                const agentsRes = await axios.get('/api/users?utype=agent');
                const buildersRes = await axios.get('/api/users?utype=builder');
                const propertiesRes = await axios.get('/api/properties');
                const apartmentsRes = await axios.get('/api/properties?type=apartment');
                const housesRes = await axios.get('/api/properties?type=house');
                const buildingsRes = await axios.get('/api/properties?type=building');
                const flatsRes = await axios.get('/api/properties?type=flat');
                const onSaleRes = await axios.get('/api/properties?stype=sale');
                const rentalsRes = await axios.get('/api/properties?stype=rent');

                setUsersCount(usersRes.data.length);
                setAgentsCount(agentsRes.data.length);
                setBuildersCount(buildersRes.data.length);
                setPropertiesCount(propertiesRes.data.length);
                setApartmentsCount(apartmentsRes.data.length);
                setHousesCount(housesRes.data.length);
                setBuildingsCount(buildingsRes.data.length);
                setFlatsCount(flatsRes.data.length);
                setOnSaleCount(onSaleRes.data.length);
                setRentalsCount(rentalsRes.data.length);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        // <div className="main-wrapper">
        //     <Header />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Welcome Admin!</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <DashboardWidget
                            iconClass="fe fe-users"
                            bgClass="bg-primary"
                            count={usersCount}
                            text="Registered Users"
                        />
                        <DashboardWidget
                            iconClass="fe fe-users"
                            bgClass="bg-success"
                            count={agentsCount}
                            text="Agents"
                        />
                        <DashboardWidget
                            iconClass="fe fe-user"
                            bgClass="bg-danger"
                            count={buildersCount}
                            text="Builder"
                        />
                        <DashboardWidget
                            iconClass="fe fe-home"
                            bgClass="bg-info"
                            count={propertiesCount}
                            text="Properties"
                        />
                    </div>

                    <div className="row">
                        <DashboardWidget
                            iconClass="fe fe-table"
                            bgClass="bg-warning"
                            count={apartmentsCount}
                            text="No. of Apartments"
                        />
                        <DashboardWidget
                            iconClass="fe fe-home"
                            bgClass="bg-info"
                            count={housesCount}
                            text="No. of Houses"
                        />
                        <DashboardWidget
                            iconClass="fe fe-building"
                            bgClass="bg-secondary"
                            count={buildingsCount}
                            text="No. of Buildings"
                        />
                        <DashboardWidget
                            iconClass="fe fe-tablet"
                            bgClass="bg-primary"
                            count={flatsCount}
                            text="No. of Flats"
                        />
                    </div>

                    <div className="row">
                        <DashboardWidget
                            iconClass="fe fe-quote-left"
                            bgClass="bg-success"
                            count={onSaleCount}
                            text="On Sale"
                        />
                        <DashboardWidget
                            iconClass="fe fe-quote-right"
                            bgClass="bg-info"
                            count={rentalsCount}
                            text="Rentals"
                        />
                    </div>
                </div>
            </div>
        
    );
};

const DashboardWidget = ({ iconClass, bgClass, count, text }) => (
    <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
            <div className="card-body">
                <div className="dash-widget-header">
                    <span className={`dash-widget-icon ${bgClass}`}>
                        <i className={iconClass}></i>
                    </span>
                </div>
                <div className="dash-widget-info">
                    <h3>{count}</h3>
                    <h6 className="text-muted">{text}</h6>
                    <div className="progress progress-sm">
                        <div className={`progress-bar ${bgClass} w-50`}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;
