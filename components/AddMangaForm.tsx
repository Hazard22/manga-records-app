import { db } from '@/services/firebaseConfig';
import { useMangaStore } from '@/store/useMangaStore';
import { addDoc, collection } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'

interface Manga {
    id: string;
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
    coverImageUrl: string;
    bannerImgUrl: string;
  }

type ModalProps = {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddMangaForm({ visible, setVisible } : ModalProps ) {

    const { addManga } = useMangaStore()
    const [title, setTitle] = useState("")
    const [coverImageUrl, setCoverImageUrl] = useState("")
    const [bannerImgUrl, setBannerImgUrl] = useState("")
    const [creating, setCreating] = useState<boolean>(false)
    

    const sendDataToInsert = async () => {  
        setCreating(true)
        try {
            const docRef = await addDoc(collection(db, "manga"), {
                title,
                coverImageUrl
            })
            const newManga: Manga = {
                id: docRef.id,
                title,
                coverImageUrl,
                bannerImgUrl,
                purchasedVolumes: 0,
                totalVolumes: 0
            }
            addManga(newManga)
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
                    <Text style={styles.formTitle}>Agregar nuevo manga</Text>
                    <TextInput
                    label="Titulo"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.input}
                    />
                    <TextInput
                    label="URL de la portada"
                    value={coverImageUrl}
                    keyboardType='url'
                    onChangeText={text => setCoverImageUrl(text)}
                    style={styles.input}
                    />
                    <TextInput
                    label="URL de banner"
                    value={bannerImgUrl}
                    keyboardType='url'
                    onChangeText={text => setBannerImgUrl(text)}
                    style={styles.input}
                    />
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
        backgroundColor: 'rgb(77, 67, 87)',
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
        color: 'white',
        fontSize: 32,
        marginBottom: 15,
    },
    input: {
        marginBottom: 15, 
        width: "100%", 
    },
    sendButton: {
        width: '50%',
        margin: 'auto'
    }
})
