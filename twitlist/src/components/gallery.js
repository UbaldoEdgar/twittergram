import React from 'react'
import { useState } from 'react';
import ChevronRight from '../icons/chevron-right.png'
import ChevronLeft from '../icons/chevron-left.png'
import DownloadIcon from '../icons/download.png'
import ExitIcon from '../icons/exit.png'
import {saveAs} from 'file-saver'
import AnisBruh from './anisbruh.png'

const Gallery = ({gallery}) => {

    const [openModal, setOpenModal] = useState(false);
    const [clickedImage, setClickedImage] = useState(0);

    const renderGallery = () => {

        const modalToggle = (index) => {
            setOpenModal(!openModal);
            setClickedImage(index);
        }
        if(gallery){
            const galleryObject = (
                gallery.map((img, index) => {

                    if(img.url){
                        return (
                            <div className='pic' key={index} onClick={() => modalToggle(index)}>
                                <img src={img.url} alt='twitter img' />
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className='pic' key={index} onClick={() => modalToggle(index)}>
                                <img src={AnisBruh} alt='twitter img' />
                            </div>
                        )
                    }
                })
            )
        return galleryObject;
        }
        return <div>No Images</div>
    }

    const renderModal = () => {
        const closeModal = () => {
            setOpenModal(false);
        }

        const showPrevImg = () => {
            if(clickedImage === 0){
                return;
            }
            setClickedImage(clickedImage -1);
        }

        const showNxtImg = () => {
            if(clickedImage === (gallery.length -1))
                return;
            setClickedImage(clickedImage +1);
        }

        const beginDownload = () => {
            saveAs(gallery[clickedImage].url, 'image.jpg')
        }
        return (
            <div className='popOutModal'>
                <img className='exitIcon' src={ExitIcon} alt='close' width='30' onClick={closeModal}/>
                <img className='leftIcon' src={ChevronLeft} alt='left' width='30' onClick={showPrevImg} />
                <img className='rightIcon' src={ChevronRight} alt='right' width='30' onClick={showNxtImg} />
                <img className='downloadIcon' src={DownloadIcon} alt='download' width='30' onClick={beginDownload} />
                <div className='popoutImg'>
                    <img src={gallery[clickedImage].url} alt='fullscreen img' />
                </div>
            </div>
        )
    }

  return (
    <div className='resultContainer'>
        {openModal && renderModal()}
        <div className='gallery'>
            {renderGallery()}
        </div>
    </div>
  )
}

export default Gallery