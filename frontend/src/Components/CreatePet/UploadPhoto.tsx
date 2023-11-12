import styles from './UploadPhoto.module.css'
// import upload_icon from '../../../public/camera-symbol.svg'
import {useEffect, useState} from 'react'

type UploadPhotoProps = {
  id: string
}

export const UploadPhoto: React.FC<UploadPhotoProps> = ({id}) => {
  // const iconRef = useRef<HTMLInputElement>(null!);
  // const [previewImage, setPreviewImage] = useState(null)
  const [file, setFile] = useState<string>();

  const handleFileChange = (event: any) => {
    let blob = new Blob([event.target.files[0]])
    if (blob.size > 9) {
    setFile(URL.createObjectURL(blob))}
  }


  useEffect(() => {
    const inputElement = document.getElementById('photoUpload1') as HTMLInputElement;
    if (inputElement) {
      inputElement.addEventListener('change', function () {
        if (this.value) {
          this.required = true;
        } else {
          this.required = false;
        }
      })}
    })

  return (
    <>
    <div className={styles.cameraWrapper}>
      <label className={styles.photo_form} htmlFor={id}>
        {file !== undefined && 
        (<img src={file}
        className={styles.previewImg}/>)}
      </label>
      <input  type='file' id={id}
      onChange={handleFileChange}
      accept="image/*"
      hidden/>
      </div>
    </>
    
  )
}
