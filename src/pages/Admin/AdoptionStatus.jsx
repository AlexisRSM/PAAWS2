import { useState, useEffect } from "react";
import { useAPI } from '../Context/Context';
import { Row, Col, Button, Spinner } from "react-bootstrap";
import AdoptionStatusCard from "../../components/AdoptionStatusCard";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdoptionStatus() {
  const [adoptions, setAdoptions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingAdoptionId, setLoadingAdoptionId] = useState(null); // Track loading state for each adoption
  const { getAllAdoptions, updateAdoptionStatus } = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await getAllAdoptions();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add a delay to see if 401 problem is authentication or fetch
        setAdoptions(data);
        setError('');
      } catch (error) {
        setError(`Error fetching adoptions: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, [getAllAdoptions]);

  const handleUpdateStatus = async (adoptionId, status, animalId) => {
    setLoadingAdoptionId(adoptionId); // Set the loading state for the current adoption

    try {
      // Step 1: Update the adoption statuses in the backend
      await updateAdoptionStatus(animalId, adoptionId, status); // Pass both animalId and adoptionId

      // Step 2: Manually update the front-end state based on the logic in the backend
      setAdoptions(prevAdoptions =>
        prevAdoptions.map(adoption =>
          adoption.animal.id === animalId
            ? { ...adoption, adoption_status: adoption.id === adoptionId ? status : 'Rejected' }
            : adoption
        )
      );

      Swal.fire({
        title: "Success!",
        text: "Adoption status updated successfully.",
        icon: "success",
        confirmButtonColor: '#2AD897',
      });

    } catch (error) {
      setError(`Error updating status: ${error.message}`);
      Swal.fire({
        title: "Error!",
        text: `Error Updating Adoption Status! Error code: ${error.message}`,
        icon: "error",
        confirmButtonColor: '#2AD897',
      });
    } finally {
      setLoadingAdoptionId(null); // Clear the loading state after the update is done
    }
  };

  const handleViewForm = (adoptionId) => {
    navigate(`/adoptionform_adminview/${adoptionId}`);
  };

  return (
    <>
      <Row >
        {error && <p className="text-danger">{error}</p>}
        {loading ? (
          <div >
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          adoptions.map(adoption => (
            <Col lg="3" key={adoption.id} className="mt-3 d-flex justify-content-center">
              <AdoptionStatusCard
                adoption={adoption}
                onApprove={() => handleUpdateStatus(adoption.id, 'Approved', adoption.animal.id)} // Pass animalId
                onReject={() => handleUpdateStatus(adoption.id, 'Rejected', adoption.animal.id)} // Pass animalId
                onViewForm={() => handleViewForm(adoption.id)}
                isUpdating={loadingAdoptionId === adoption.id} // Pass loading state to the card
              />
            </Col>
          ))
        )}
      </Row>

      {!loading && (
        <div>
          <Button href='/adminpage' className=" mt-5 tertiaryButton">Return</Button>
        </div>
      )}
    </>
  );
}

export default AdoptionStatus;
