import MangaVolumeCardSkeleton from '@/components/MangaVolumeCardSkeleton'
import MangaDetailsBanner from '@/components/MangaDetailsBanner'
import MangaVolumeCard from '@/components/MangaVolumeCard'
import { db } from '@/services/firebaseConfig'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import AddVolumeForm from '@/components/AddVolumeForm'

type Volume = {
    id: string;
    //title: string;
    imageUrl: string;
    bought: boolean;
    available: boolean;
    volume: number;
}

export default function MangaDetailsScreen() {

    const { id, title, purchasedVolumes, totalVolumes } = useLocalSearchParams()

    const [volumesData, setVolumesData] = useState<Volume[] | null>(null);
    const [addVolumeFormVisible, setAddVolumeFormVisible] = useState<boolean>(false)

    const searchRelatedVolumes = async () => {  
        try {
            const mangaDocRef = doc(db, 'manga', id)
            const q = query(
                collection(db, 'volume'), 
                where('mangaId', '==', mangaDocRef), 
                orderBy('volume', 'asc')
            );
            const querySnapshot = await getDocs(q);
            const volumesData: Volume[] = querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            volume: doc.data().volume,
            available: doc.data().available,
            bought: doc.data().bought,
            }));
            console.log(volumesData);
            setVolumesData(volumesData)
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
        <View style={styles.container}>
            <MangaDetailsBanner title={title} purchasedVolumes={purchasedVolumes} totalVolumes={totalVolumes}/>
            <FlatList
            data={volumesData || skeletonData}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item ? item.id : `skeleton-${index}`)}
            numColumns={3}
            columnWrapperStyle={styles.row}
            style={styles.list}
            />
            <FAB icon="plus" style={styles.fab} onPress={handlePress} />
            <AddVolumeForm mangaId={id} visible={addVolumeFormVisible} setVisible={setAddVolumeFormVisible}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    row: {
        justifyContent: 'space-between', // Alinea los ítems en cada fila
    },
    list: {
        marginTop: 10,
        padding: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
