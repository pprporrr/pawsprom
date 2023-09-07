import styles from './petProfileOwned.module.css'
import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
import { useEffect, useState } from 'react';
import axios from 'axios';

type PetData = {
  petName: string
		species: string | null
		breed: string | null
		age: number | null
		gender: string
		weight: number
		color: string | null
		dateofbirth: string
		description: string | null
		imageIDs: number[]
		features: {
      feature1: boolean | null,
      feature2: boolean | null,
      feature3: boolean | null,
      feature4: boolean | null,
      feature5: boolean | null,
      feature6: boolean | null,
      feature7: boolean | null,
      feature8: boolean | null,
      feature9: boolean | null,
      feature10: boolean | null,
		}
		availabilityStatus: string
		vaccinationRecord: null
		// shelterID: number
		vaccinationName: string[]
		vaccinationDate: string[]
		address: string
}


export const PetProfileOwned = () => {

    const petPage = 'PetProfileOwned';

    // ! var for testing purpose ========================================
    const shelterID = 503;
    const petID = 102
    const Data = { 
      petName: 'Torty',
      species: 'Raccoon',
      breed: 'Ameba hahaha',
      age: 2,
      gender: 'Male', 
      weight: 3,
      color: 'brown',
      dateofbirth: "",
      description: 'This delightful kitty is a true embodiment of everything you want in a feline companion. Whiskers is incredibly friendly and social, always seeking out attention and affection.',
      imageIDs: [1,2,3],
      features: {
          feature1: true,
          feature2: true,
          feature3: true,
          feature4: true,
          feature5: true,
          feature6: true,
          feature7: true,
          feature8: true,
          feature9: true,
          feature10: true,
          // feature11: false,  // prefer true false than 0,1 => number
      },
      availabilityStatus: 'Owned',
      vaccinationRecord: null,
      // shelterID: 501,
      vaccinationName: ["vaccine1", "vaccine2", "vaccine3"],
      vaccinationDate: ["2023-06-15", "2021-04-01", "2023-06-15"],
      address: 'njeenkfjn dsnfoidsdif',
    }

    // ! ==============================================================

    // * the actual data to set after fetch from API
    const [data, setData] = useState()
    // * for adoption button by P'Porpor ======================================
    const [adoptiondata, setAdoptionData] = useState("");
    
    //* URL for API
    const baseAPI = axios.create({
		baseURL: "http://192.168.1.7"
		});

    //const mockBlob = "<io_.BufferedWriter name='fjnsofs.JPG'>";

    //const blob = new Blob([mockBlob], { type: 'image/jpeg' })

    //const blobURL = URL.createObjectURL(blob);
    

    // *---------------- POST to API ----------------* //
    useEffect(() => {
      baseAPI.post('/petAPI/info-long/',{ petID })
      .then((response) => {
        console.log('pass')
        console.log(response.data)
        setData(response.data.data) // two times
      });
      
      baseAPI.post('/adoptionAPI/get-application/',{ shelterID })
      .then((response) => {
        console.log('pass')
        console.log(response.data)
        setAdoptionData(response.data.data) // two times
      });
    }, [])
     // *---------------- POST to API ----------------* //

    return (
      <div className={styles.main_container}>
        <section className={styles.header}>header</section>
          <div className={styles.bgContainer}>
            { data != undefined && <PetProfileFull
            petID={petID} 
            page={petPage}
            data= {data}
            baseAPI={baseAPI} 
            ></PetProfileFull>
            }
            {/* //! for testing */}
            <PetProfileFull
            petID={petID} 
            page={petPage}
            data= {Data}
            baseAPI={baseAPI} 
            ></PetProfileFull>
          </div>
        <section className={styles.bottom}>bottom</section>
      </div>
    )
}