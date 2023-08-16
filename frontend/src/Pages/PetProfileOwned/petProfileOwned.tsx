// import styles from './petProfileOwned.module.css'
// import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
// import { useEffect } from 'react';
// import axios from 'axios';



// export const PetProfileOwned = () => {
//     const petPage = 'PetProfileOwned';
//     const petID = 101;
//     const mockBlob = "<io_.BufferedWriter name='fjnsofs.JPG'>";

//     const blob = new Blob([mockBlob], { type: 'image/jpeg' })

//     const blobURL = URL.createObjectURL(blob);
    

//     // base url for api
// 	const client = axios.create({
// 		baseURL: "http://192.168.1.7"
// 		// baseURL: "https://jsonplaceholder.typicode.com/" 
// 	  });

//     /* POST */
    
//     useEffect(() => {
//   	client.post('/petAPI/pet/info-long/',{ petID })
//     .then((response) => {
//   		console.log(response)
//   	})
//     }, [])

//     return (
//         <div className={styles.bgContainer}>
//             <PetProfileFull 
//             page={petPage} 
            
//             ></PetProfileFull>
//         </div>
//     )
// }

import styles from './petProfileOwned.module.css'
import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
import { useEffect, useState } from 'react'; // Import useState
import axios from 'axios';

export const PetProfileOwned = () => {
    const petPage = 'PetProfileOwned';
    const petID = 101;

    const [images, setImages] = useState([]); // State to store images

    // base url for api
    const client = axios.create({
        baseURL: "http://192.168.1.7"
    });

    /* GET */
    
    useEffect(() => {
        client.get(`/image/pet/${petID}/`)
        .then((response) => {
            // Assuming the response.data is an array of image URLs
            setImages(response.data);
        })
        .catch((error) => {
            console.error("Error fetching images:", error);
        });
    }, []);

    return (
        <div className={styles.bgContainer}>
            <PetProfileFull
                page={petPage}
                images={images} // Pass the images to the PetProfileFull component
            ></PetProfileFull>
        </div>
    );
}