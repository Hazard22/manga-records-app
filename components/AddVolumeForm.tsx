import { db } from '@/services/firebaseConfig';
import { addDoc, collection, doc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal, Switch, TextInput } from 'react-native-paper'

type ModalProps = {
    mangaId: string;
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddVolumeForm({ mangaId, visible, setVisible } : ModalProps ) {

    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [volume, setVolume] = useState("")
    const [bought, setBought] = useState(false)
    const [available, setAvailable] = useState(false)
    const [creating, setCreating] = useState<boolean>(false)
    

    const sendDataToInsert = async () => {  
        setCreating(true)
        try {
            const mangaDocRef = doc(db, "manga", mangaId);
            await addDoc(collection(db, "volume"), {
                mangaId: mangaDocRef,
                title,
                imageUrl,
                volume,
                bought,
                available
            })
        } catch (error) {
            console.log(error);
        }
        setCreating(false)
    }

    return (
        <Portal
        >
            <Modal 
            visible={visible} 
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.content}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Agregar nuevo volumen</Text>
                    <TextInput
                    label="Titulo"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.input}
                    />
                    <TextInput
                    label="URL de la portada"
                    value={imageUrl}
                    keyboardType='url'
                    onChangeText={text => setImageUrl(text)}
                    style={styles.input}
                    />
                    <TextInput
                    label="Volumen"
                    value={volume}
                    keyboardType='number-pad'
                    onChangeText={text => setVolume(text)}
                    style={styles.input}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Comprado</Text>
                        <Switch value={bought} onValueChange={() => setBought(!bought)} />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Disponible</Text>
                        <Switch value={available} onValueChange={() => setAvailable(!available)} />
                    </View>
                    <Button 
                    icon="book-plus" 
                    mode="contained" 
                    style={styles.sendButton}
                    loading={creating}
                    onPress={sendDataToInsert}>
                        Añadir
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    content: {
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',       
        justifyContent: 'center',      
        marginTop: '30%',           
        alignSelf: 'center',    
    },
    formContainer: {
        width: "90%", 
    },
    formTitle: {
        fontSize: 32,
        marginBottom: 15,
    },
    input: {
        marginBottom: 15, 
        width: "100%", 
    },
    switchContainer: {
        flexDirection: 'row',      
        justifyContent: 'center',   
        alignItems: 'center',        
        marginBottom: 10,            
    },
    switchLabel: {
        marginRight: 10,            
    },
    sendButton: {
        width: '50%',
        margin: 'auto'
    }
})
