import styles from './petProfileOwned.module.css'
import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
import { useEffect } from 'react';
import axios from 'axios';



export const PetProfileOwned = () => {
    const petPage = 'PetProfileOwned';
    const petID = 101;
    const Data = { 
      petName: 'Tor',
      species: 'cat',
      breed: 'Meow meow',
      age: 2,
      gender: 'female', 
      weight: 5,
      color: null,
    }

    const mockBlob = "<io_.BufferedWriter name='fjnsofs.JPG'>";

    const blob = new Blob([mockBlob], { type: 'image/jpeg' })

    const blobURL = URL.createObjectURL(blob);

    // base url for api
	const client = axios.create({
		baseURL: "http://192.168.1.7"
		// baseURL: "https://jsonplaceholder.typicode.com/" 
	  });

    /* POST */

    useEffect(() => {
  	client.post('/petAPI/pet/info-long/',{ petID })
    .then((response) => {
  		console.log(response)
  	})
    }, [])

    return (
        <div className={styles.bgContainer}>
            <PetProfileFull 
            page={petPage}
            data= {Data} 
            ></PetProfileFull>
        </div>
    )
}

