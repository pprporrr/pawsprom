import styles from '../PetProfileOwned/petProfileOwned.module.css'
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
    adoptionApplications: {
    [key:string] : {
        firstName: string,
        lastName: string,
        phoneNo: string,
        address: string,
    }
    }
}


export const PetProfileOthers = () => {

const petPage = 'PetProfileOthers';

// ! var for testing purpose ========================================
const shelterID = 503;
const username = 'Hello its me'
const petID = 103
const Data = { 
    petName: 'Torty',
    species: 'Raccoon',
    breed: 'Ameba hahaha',
    age: 2,
    gender: 'Male', 
    weight: 3,
    color: 'brown',
    dateofbirth: "2011",
    description: 'This delightful kitty is a true embodiment of everything you want in a feline companion. Whiskers is incredibly friendly and social, always seeking out attention and affection.',
    imageIDs: [1,2],
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
    vaccinationName: ["Feline Parvo Virus (FPV)",
    "Feline Callicivirus (FCV)",
    "Feline Herpesvirus (FHV-1) sgafagregvrevrfrgvfa",
    "Rabies Virus",
    "Chlamydophila felis"],
    vaccinationDate: ["2023-06-15",
    "2021-04-01", 
    "2023-06-15", 
    "2019-02-20",
    "2021-05-30"],
    phone: "+234567890",
    address: "789 Oak Rd, Village",
    adoptionApplications: {
        "202": {
            "firstName": "Nong",
            "lastName": "Foam",
            "phoneNo": "+9988776655",
            "address": "456 Maple Ave, Town"
            }
        }
}
    // ! ==============================================================

    // * the actual data to set after fetch from API
    const [data, setData] = useState()
    // * for adoption button by P'Porpor ======================================
    const [adoptiondata, setAdoptionData] = useState("");
    
    //* URL for API
    const baseAPI = axios.create({
		baseURL: "http://10.100.4.187"
		});

    // *---------------- POST to API ----------------* //
    useEffect(() => {
    baseAPI.post('/petAPI/info-long/',{ petID })
    .then((response) => {
        console.log('pass')
        console.log(response.data)
        setData(response.data.data) // two times
    });

      // baseAPI.post('/adoptionAPI/get-application/',{ shelterID })
      // .then((response) => {
      //   console.log('pass')
      //   console.log(response.data)
      //   setAdoptionData(response.data.data) // two times
      // });

    }, [])
     // *---------------- POST to API ----------------* //

    return (
        <div className={styles.bgContainer}>
            {/* { data != undefined && <PetProfileFull
            petID={petID} 
            page={petPage}
            data= {data}
            baseAPI={baseAPI} 
            ></PetProfileFull>
            } */}
            {/* //! for testing */}
            <PetProfileFull
            petID={petID} 
            page={petPage}
            data= {Data}
            baseAPI={baseAPI} 
            ></PetProfileFull>
        </div>
    )
}