
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/p")
    }

    return (
        <button onClick={handleClick}>Click me!</button>
    )
}