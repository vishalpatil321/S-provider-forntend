import { useNavigate } from "react-router-dom";
import './ServiceProvider.css';

const ServiceProvider = ({data}) => {
    const navigate = useNavigate();
    return(
        <>
        <div className="card serviceP"style={{cursor:'pointer'}} onClick={() => {
            navigate(`/serviceP/booking/${data._id}`);
        }}>
            <div className="card-header">
              <h3>Mr.{data.firstName} {data.lastName}</h3>
            </div>
        <div className="card-body">
            <p>
                <b>Specialization</b> {data.specialization}
            </p>
            <p>
                <b>Experience</b> {data.experience}
            </p>
            <p>
                <b>Fees Per Work</b> {data.feesPerService}
            </p>
        </div>
        </div>
        </>
    );
};

export default ServiceProvider;