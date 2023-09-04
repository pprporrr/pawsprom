import { AxiosInstance } from "axios"
import { useEffect, useState } from "react"
import { ConfirmDelete } from "./confirmDelete"
import { useNavigate } from "react-router-dom"

interface DeleteButtonProps { 
    onClick: () => void
    setTriggerDelete: (value:boolean) => void
    triggerDelete: boolean
    apiResponse: boolean | null

}

export const DeleteButton: React.FC<DeleteButtonProps>  = ({ onClick, setTriggerDelete, apiResponse }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [resultText, setResultText] = useState("")
    const navigate = useNavigate()

    // when click delete button
    const handleClick = () => {
        // console.log('trigger delete')
        setIsConfirmOpen(true)
    }

    // when click cancel delete
    const handleCancel = () => {
        setIsConfirmOpen(false)
    }

    const handleConfirm = () => {
        // console.log('confirm delete')
        // setIsConfirmOpen(false)
        setTriggerDelete(true)
        onClick()
        // start loading waiting from getting response from api
        setIsLoading(true)
    }

    // const handleCloseWindow = () => {

    // }

    useEffect(() => {

    // console.log('api response checking in button',apiResponse)
    // * show text according to response from api
    if (apiResponse !== null) {
        if (apiResponse === true) {
                setResultText("success")
            }
            else if (apiResponse === false) {
                setResultText("failed")
            }
        
        // show text for then reset ,close pop up and
        // go to previous page
        setTimeout(() => {
            // console.log('check check')
            setIsLoading(false)
            setTriggerDelete(false)
            setIsConfirmOpen(false)
            // console.log('fin timeout')
            // window.history.back()
            navigate(-1)
        }, 5000)}

    }
    , [apiResponse, isConfirmOpen])


    return (
        <div>
            <button onClick={handleClick}>deleteButton</button>
            <ConfirmDelete 
            isOpen={isConfirmOpen}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            isLoading={isLoading}
            apiResponse={apiResponse}
            resultText={resultText}
            />
        </div>
    )
}
