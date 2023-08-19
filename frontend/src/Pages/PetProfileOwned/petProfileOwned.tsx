import styles from './petProfileOwned.module.css'
import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
import { useEffect, useState } from 'react';
import axios from 'axios';

type PetData = {
  petName: string
		species: string | null
		breed: string | null
		age: number
		gender: string
		weight: number
		color: string | null
		dateofbirth: string
		description: string | null
		imageIDs: number[]
		features: {
				[key:string]: boolean
		}
		availabiltyStatus: string
		vaccinationRecord: null
		// shelterID: number
		vaccinationName: string[]
		vaccinationDate: string[]
		address: string
}


export const PetProfileOwned = () => {

    const petPage = 'PetProfileOwned';

    // ! var for testing purpose ========================================
    const petID = 102;
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
      imageIDs: [1, ],
      features: {
          feature1: true,
          feature2: true,
          feature3: false,
          feature4: false,
          feature5: true,
          feature6: true,
          feature7: true,
          feature8: true,
          feature9: true,
          feature10: true,  // prefer true false than 0,1 => number
      },
      availabiltyStatus: 'Owned',
      vaccinationRecord: null,
      // shelterID: 501,
      vaccinationName: ["vaccine1", "vaccine2", "vaccine3"],
      vaccinationDate: ["2023-06-15", "2021-04-01", "2023-06-15"],
      address: 'njeenkfjn dsnfoidsdif',
    }


    // TODO: display image from blob file (below is for testing)
    // const mockBlob = "<io_.BufferedWriter name='fjnsofs.JPG'>";
    // const blob = new Blob([mockBlob], { type: 'image/jpeg' })
    // const blobURL = URL.createObjectURL(blob);

    // ! ==============================================================


    // * the actual data to set after fetch from API
    const [data, setData] = useState<PetData>(Data)

    //* URL for API
    const baseAPI = axios.create({
		baseURL: "http://10.100.7.51"
		});

    const petID = 101;
    //const mockBlob = "<io_.BufferedWriter name='fjnsofs.JPG'>";

    //const blob = new Blob([mockBlob], { type: 'image/jpeg' })

    //const blobURL = URL.createObjectURL(blob);
    

    // *---------------- POST to API ----------------* //
    useEffect(() => {
      baseAPI.post('/petAPI/pet/info-long/',{ petID })
      .then((response) => {
        console.log('pass')
        console.log(response.data)
        setData(response.data.data) // two times
    })}, [])
     // *---------------- POST to API ----------------* //

    return (
        <div className={styles.bgContainer}>
            <PetProfileFull 
            page={petPage}
            data= {data}
            baseAPI={baseAPI} 
            ></PetProfileFull>
        </div>
    )
}