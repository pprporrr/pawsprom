import { AxiosInstance, AxiosResponse } from "axios";

interface AdoptionButtonProps {
    baseAPI: AxiosInstance;
    petID: number;
    userID: number;
}

export const AdoptionButton: React.FC<AdoptionButtonProps> = ({ baseAPI, petID, userID }) => {
    async function handleClick() {
        try {
            const dateofapplication = new Date();
            const year = dateofapplication.getFullYear();
            const month = String(dateofapplication.getMonth() + 1).padStart(2, '0');
            const day = String(dateofapplication.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            const response: AxiosResponse = await baseAPI.post(`/adoptionAPI/create-application/`, { petID, userID, dateofapplication: formattedDate });
            const responseData = response.data;
            
            if (responseData.success === true) {
                alert('Adoption Application Created');
                window.location.reload();
            } else {
                console.error('Error: ', responseData.error);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }
    
    return (
        <button onClick={handleClick}>Create Adoption Application</button>
    );
};