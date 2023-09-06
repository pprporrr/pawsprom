import { AxiosInstance } from "axios"
import { useEffect, useState } from "react"
import { ConfirmAdoption } from "./confirmAdoption"
import { useNavigate } from "react-router-dom"

interface AdoptionButtonProps { 
    onClick: () => void
    apiResponse: boolean | null

}

export const AdoptionButton: React.FC<AdoptionButtonProps>  = ({ onClick, apiResponse }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [resultText, setResultText] = useState("")
    const navigate = useNavigate()

    //* when click delete button
    const handleClick = () => {
        // open pop up
        setIsConfirmOpen(true)
    }

    //* when click cancel delete
    const handleCancel = () => {
        // close pop up
        setIsConfirmOpen(false)
    }

    // * when click confirm delete
    const handleConfirm = () => {
        onClick()
        // start loading waiting from getting response from api
        setIsLoading(true)
    }

    // * reset var
    useEffect(() => {
        setIsLoading(false)
        setIsConfirmOpen(false)
        setResultText("")
    }, []);

    useEffect(() => {

    // * show text according to response from api
    if (apiResponse !== null) {
        
        if (apiResponse === true) {
                setResultText("success")
                setTimeout(() => {
                    // go back to previous page
                    navigate(-1)
                }, 5000)
            }
            else if (apiResponse === false) {
                setResultText("failed")
                setTimeout(() => {} , 5000)
            }
        
        }

    }
    , [apiResponse, isConfirmOpen])


    return (
        <div>
            <button onClick={handleClick}>adoptionButton</button>
            <ConfirmAdoption 
            isOpen={isConfirmOpen}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            isLoading={isLoading}
            resultText={resultText}
            />
        </div>
    )
}