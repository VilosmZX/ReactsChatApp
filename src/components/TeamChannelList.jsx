import React, { Children } from 'react';
import { AddChannel } from '../assets';

const TeamChannelList = ({setToggleContainer, children, error=false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing}) => {
    if(error){
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Koneksi Error
                </p>

            </div>
        ) : null
    }

    if(loading){
        return (
            <div className='team-channel-list'>
                <p className='team-channel-list__message loading'>
                    Memuat {type === 'team' ? 'Channels' : 'Pesan'}...
                </p>

            </div>
        )
    }
    return (

        <div className='team-channel-list'>
            <div className='team-channel-list__header'>
                <p className='team-channel-list__header__title'>{type === 'team' ? 'Channels' : 'Pesan Langsung'}</p>
                <AddChannel 
                    isCreating={isCreating} 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    type={type === 'team' ? 'team' : 'messaging'}
                    setToggleContainer={setToggleContainer}
                />
            </div>
            {children} 
        </div>
    )
};


export default TeamChannelList
