import { db } from '@/services/firebaseConfig';
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

    const [availableState, setAvaliableState] = useState<boolean>(available)
    const [boughtState, setBoughtState] = useState<boolean>(bought)
    const [loadingAvailable, setLoadingAvailable] = useState<boolean>(false)
    const [loadingBought, setLoadingBought] = useState<boolean>(false)


    const handleAvailable = async () => {  
        setLoadingAvailable(true)
        try {
            const documentRef = doc(db, "volume", volumenId);
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
            }
            setAvaliableState(!availableState)
            console.log("Documento actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando el documento:", error);
        }
        setLoadingAvailable(false)
    }

    const handleBought = async () => {  
        setLoadingBought(true)
        try {
            const documentRef = doc(db, "volume", volumenId);
            await updateDoc(documentRef, {
                bought: !boughtState,
            });
            setBoughtState(!boughtState)
            console.log("Documento actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando el documento:", error);
        }
        setLoadingBought(false)
    }

    return (
        <Card style={styles.card}>
            <Card.Cover source={{uri: imageUrl}}/>
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
        width: 160,
        height: 200,
        borderRadius: 8,
        marginBottom: 5,
    },
    cardActions: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    }
})