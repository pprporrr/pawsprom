import styles from './petProfileOwned.module.css'
import { PetProfileFull } from '../../Components/PetProfileFull/petProfileFull'
import { useEffect } from 'react';
import axios from 'axios';



export const PetProfileOwned = () => {
    const petPage = 'PetProfileOwned';
    const petID = 102;

    // base url for api
	const client = axios.create({
		baseURL: "http://192.168.1.7"
		// baseURL: "https://jsonplaceholder.typicode.com/" 
	  });

    /* GET */

    useEffect(() => {
  	client.get('/petAPI/pet/info-long/', { params: { petID: petID } })
    .then((response) => {
  		console.log(response)
  	})
    }, [])

    return (
        <div className={styles.bgContainer}>
            <PetProfileFull page={petPage} petID={petID}></PetProfileFull>
            {/* <div className={styles.cardBg}>
                <div className={styles.topContainer}>
                    <div className={styles.titleContainer}>
                        <h2>Pet Profile</h2>
                    </div>
                </div>
                <div className={styles.infoContainer1}>
                    <h1>Pet Profile</h1>
                </div>
                <div className={styles.infoContainer2}>
                    <h1>Pet Profile</h1>
                </div>
                <div className={styles.vaccineContainer}>
                    <h1>Pet Profile</h1>
                </div>
                <div className={styles.featuresContainer}>
                    <h1>Pet Profile</h1>
                </div>
                <div className={styles.bottomContainer}>
                    <h1>Pet Profile</h1>
                </div>
            </div> */}
        </div>
    )
}

