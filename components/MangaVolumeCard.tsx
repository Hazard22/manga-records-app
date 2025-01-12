import { db } from '@/services/firebaseConfig';
import { useMangaDetailsStore } from '@/store/useMangaDetailsStore';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Card, IconButton } from 'react-native-paper'

type Volume = {
    volumenId: string;
    imageUrl: string;
    available: boolean;
    bought: boolean;
}

export default function MangaVolumeCard({ volumenId, imageUrl, available, bought } : Volume) {

    const { updateVolume } = useMangaDetailsStore()

    const [availableState, setAvaliableState] = useState<boolean>(available)
    const [boughtState, setBoughtState] = useState<boolean>(bought)
    const [loadingAvailable, setLoadingAvailable] = useState<boolean>(false)
    const [loadingBought, setLoadingBought] = useState<boolean>(false)


    const handleAvailable = async () => {  
        setLoadingAvailable(true)
        try {
            const documentRef = doc(db, "volume", volumenId);
            const newAvailable = !availableState
            if(!availableState){
                await updateDoc(documentRef, {
                    available: !availableState,
                });
            }
            else{
                await updateDoc(documentRef, {
                    available: !availableState,
                    bought: false
                });
                setBoughtState(false)
                updateVolume(volumenId, { available: newAvailable, bought: false })
            }
            setAvaliableState(!availableState)
        } catch (error) {
            console.error("Error actualizando el documento:", error);
        }
        setLoadingAvailable(false)
    }

    const handleBought = async () => {  
        setLoadingBought(true)
        try {
            const newBought = !boughtState
            const documentRef = doc(db, "volume", volumenId);
            await updateDoc(documentRef, {
                bought: !boughtState,
            });
            setBoughtState(!boughtState)
            updateVolume(volumenId, { bought: newBought })
        } catch (error) {
            console.error("Error actualizando el documento:", error);
        }
        setLoadingBought(false)
    }

    return (
        <Card style={styles.card}>
            <Card.Cover source={{uri: imageUrl}} style={!availableState && styles.grayFilter}/>
            <Card.Actions style={styles.cardActions}>
                <IconButton 
                disabled={!availableState}
                icon='check-decagram' 
                iconColor={boughtState ? '#4CAF50' : '#000000'}
                onPress={handleBought} 
                loading={loadingBought}/>
                <IconButton 
                icon='book-check' 
                iconColor={availableState ? '#4CAF50' : '#000000'}
                onPress={handleAvailable} 
                loading={loadingAvailable}/>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 130,
        height: 180,
        borderRadius: 8,
        marginBottom: 5,
    },
    grayFilter: {
        tintColor: 'gray'
    },
    cardActions: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    }
})