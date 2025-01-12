import MangaCard from '@/components/MangaCard';
import MangaCardSkeleton from '@/components/MangaCardSkeleton';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { FAB } from 'react-native-paper';
import { db } from '@/services/firebaseConfig';
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler';
import AddMangaForm from '@/components/AddMangaForm';
import { useMangaStore } from '@/store/useMangaStore';

interface Manga {
  id: string;
  title: string;
  purchasedVolumes: number;
  totalVolumes: number;
  coverImageUrl: string;
  bannerImgUrl: string;
}

export default function HomeScreen() {

  const { mangas, setMangaData } = useMangaStore()

  //const [mangaData, setMangaData] = useState<Manga[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [addMangaFormVisible, setAddMangaFormVisible] = useState<boolean>(false)

  const handlePress = () => {
    setAddMangaFormVisible(true)
  };

  const fetchMangas = async (firstLoad: boolean) => {
    if(firstLoad){
      setRefreshing(true)
    }
    try {
      const querySnapshot = await getDocs(collection(db, "manga"));
      const mangasList: Manga[] = await Promise.all(
        querySnapshot.docs.map(async (manga) => {
          const mangaDocRef = doc(db, "manga", manga.id);
          const volumesRef = collection(db, "volume");

          const q = query(volumesRef, where("mangaId", "==", mangaDocRef));
          const volumeSnapshot = await getDocs(q);
          const volumesData = volumeSnapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const purchasedVolumes = volumesData.filter(vol => vol.bought).length;

          return {
            id: manga.id,
            title: manga.data().title,
            purchasedVolumes,
            totalVolumes: volumesData.length,
            coverImageUrl: manga.data().coverImageUrl,
            bannerImgUrl: manga.data().bannerImgUrl,
          };
        })
      );
      console.log(mangasList);
      
      setMangaData(mangasList);
      if(firstLoad){
        setRefreshing(false)
      }
    } catch (error) {
      console.error("Error fetching mangas: ", error);
    }
  };

  useEffect(() => {

    fetchMangas(true);

  }, []);

  const renderItem = ({ item }: { item: Manga | null }) => {
    if (!item) {
      return <MangaCardSkeleton />;
    }
    return (
      <MangaCard
        key={item.id}
        id={item.id}
        title={item.title}
        purchasedVolumes={item.purchasedVolumes}
        totalVolumes={item.totalVolumes}
        imageUrl={item.coverImageUrl}
        bannerImgUrl={item.bannerImgUrl}
      />
    );
  };

  const skeletonData = Array(10).fill(null); // Array para mostrar 10 skeletons mientras carga

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <FlatList
          data={mangas || skeletonData} 
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => fetchMangas(false)}/>
          }
          keyExtractor={(item, index) => (item ? item.id : `skeleton-${index}`)}
          contentContainerStyle={styles.list}
        />
        <FAB icon="plus" style={styles.fab} onPress={handlePress} />
        <AddMangaForm 
        visible={addMangaFormVisible}
        setVisible={setAddMangaFormVisible}
        />
      </View>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
