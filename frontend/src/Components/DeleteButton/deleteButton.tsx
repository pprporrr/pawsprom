import { AxiosInstance } from "axios"

interface DeleteButtonProps {
    baseAPI: AxiosInstance
}

export const DeleteButton: React.FC<DeleteButtonProps>  = ({baseAPI}) => {

    function handleClick() {
        // baseAPI.delete
    }

    return (
        <div>deleteButton</div>
    )
}
