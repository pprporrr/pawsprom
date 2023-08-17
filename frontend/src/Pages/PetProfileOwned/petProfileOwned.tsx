import styles from './petProfileOwned.module.css'
import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
import { useEffect, useState } from 'react';
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
      color: 'brown',
      dateofbirth: "2023-06-15",
      description: 'dsnvidhfdf',
      image: ['sdf'],
      features: {
          feature1: true,  // prefer true false than 0,1 => number
      },
      availabiltyStatus: 'Owned',
      vaccinationRecord: null,
      shelterID: 501,
      vaccinationName: ["vaccine1", "vaccine2"],
      vaccinationDate: ["2023-06-15", "2021-04-01"],
      address: 'njeenkfjn dsnfoidsdif',
    }

    const [data, setData] = useState({})

    const mockBlob = "<io_.BufferedWriter name='fjnsofs.JPG'>";

    const blob = new Blob([mockBlob], { type: 'image/jpeg' })

    const blobURL = URL.createObjectURL(blob);


    // Test purpose
    // const excludedKeys = ['image', 'features', 'address'];

    // base url for api
	const client = axios.create({
		baseURL: "http://10.100.7.51"
		// baseURL: "https://jsonplaceholder.typicode.com/" 
	  });

    /* POST */

    // useEffect(() => {
  	// client.post('/petAPI/pet/info-long/',{ petID })
    // .then((response) => {
  	// 	console.log(response.data)
    //   setData(response.data.data) // two times
  	// })
    // }, [])

    return (
        <div className={styles.bgContainer}>
            <PetProfileFull 
            page={petPage}
            data= {Data} 
            ></PetProfileFull>
        </div>
    )
}

