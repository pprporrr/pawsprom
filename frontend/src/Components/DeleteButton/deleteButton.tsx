import { AxiosInstance } from "axios"

interface DeleteButtonProps {
    baseAPI: AxiosInstance;
    petID: number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ baseAPI, petID }) => {
    async function handleClick() {
        try {
        await baseAPI.delete(`/petAPI/delete-profile/${petID}`);
        alert('Pet profile deleted successfully');
        window.location.reload();
        } catch (error) {
        console.error('Error deleting pet profile:', error);
        }
    }
    return (
        <button onClick={handleClick}>Delete Pet Profile</button>
    );
};