import MangaVolumeCardSkeleton from '@/components/MangaVolumeCardSkeleton'
import MangaDetailsBanner from '@/components/MangaDetailsBanner'
import MangaVolumeCard from '@/components/MangaVolumeCard'
import { db } from '@/services/firebaseConfig'
import { Stack, useLocalSearchParams } from 'expo-router'
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import AddVolumeForm from '@/components/AddVolumeForm'
import { useMangaDetailsStore } from '@/store/useMangaDetailsStore'

interface Volume {
    id: string,
    title: string,
    imageUrl: string;
    available: boolean;
    bought: boolean;
}

export default function MangaDetailsScreen() {

    const { id } = useLocalSearchParams()

    const { manga, setVolumes } = useMangaDetailsStore()

    const [addVolumeFormVisible, setAddVolumeFormVisible] = useState<boolean>(false)

    const searchRelatedVolumes = async () => {  
        try {
            const mangaDocRef = doc(db, 'manga', id as string)
            const q = query(
                collection(db, 'volume'), 
                where('mangaId', '==', mangaDocRef), 
                orderBy('volume', 'asc')
            );
            const querySnapshot = await getDocs(q);
            const volumesData: Volume[] = querySnapshot.docs.map((doc) => ({
                id: doc.id, 
                title: doc.data().title as string,
                imageUrl: doc.data().imageUrl as string,
                volumenId: doc.data().volumenId as string, 
                available: doc.data().available as boolean,
                bought: doc.data().bought as boolean,
            }));
            //console.log(volumesData);
            setVolumes(volumesData)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePress = () => {
        setAddVolumeFormVisible(true)
      };

    useEffect(() => {
      
        searchRelatedVolumes()

    }, [])

    const renderItem = ({ item }: { item: Volume | null }) => {
        if (!item) {
            return <MangaVolumeCardSkeleton/>;
        }
        return (
            <MangaVolumeCard
            volumenId={item.id}
            imageUrl={item.imageUrl}
            available={item.available}
            bought={item.bought}
            />
        );
    };

    const skeletonData = Array(9).fill(null);

    return (
        <>
            <Stack.Screen options={{title: manga?.title}}/>
            <View style={styles.container}>
                <MangaDetailsBanner />
                <FlatList
                data={manga?.volumes || skeletonData}
                renderItem={renderItem}
                keyExtractor={(item, index) => (item ? item.id : `skeleton-${index}`)}
                numColumns={3}
                columnWrapperStyle={styles.row}
                style={styles.list}
                />
                <FAB icon="plus" style={styles.fab} onPress={handlePress} />
                <AddVolumeForm visible={addVolumeFormVisible} setVisible={setAddVolumeFormVisible}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    row: {
        justifyContent: 'space-between', 
    },
    list: {
        marginTop: 5,
        padding: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
