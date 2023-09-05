import { AxiosInstance, AxiosResponse } from "axios";

interface DeleteButtonProps {
    baseAPI: AxiosInstance;
    petID: number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ baseAPI, petID }) => {
    async function handleClick() {
        try {
            const response: AxiosResponse = await baseAPI.delete(`/petAPI/delete-profile/${petID}`);
            const responseData = response.data;
            
            if (responseData.success === true) {
                alert('Pet profile deleted successfully');
                window.location.reload();
            } else {
                console.error('Error: ', responseData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <button onClick={handleClick}>Delete Pet Profile</button>
    );
};