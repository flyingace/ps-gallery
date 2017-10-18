import React from 'react';
import './PhotoComponents.css';

export const PhotoViewer = (props) => {
    return (
        <div className="photo-viewer">
            {props.photoData.map((photo) => {
                    return <PhotoContainer imageUrl={photo.image} description={photo.description}
                                           tag={photo.tag} date={photo.date} key={photo.id} active={photo.active}/>
                }
            )}
        </div>
    );
};

export const PhotoContainer = (props) => {
    return (
        <div className='photo-container'>
            <img className='photo-image' src={props.imageUrl}/>
            <p className='photo-description'>{props.description}</p>
            <p className='photo-tag'>{props.tag}</p>
            <p className='photo-date'>{props.date}</p>
            <p className='photo-isActive'>Is Active?: {props.active}</p>
        </div>
    )
};

