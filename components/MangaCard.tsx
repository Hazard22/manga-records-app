
import { useMangaDetailsStore } from '@/store/useMangaDetailsStore';
import { Link } from 'expo-router';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type CardProps = {
    id: string;
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
    imageUrl: string;
    bannerImgUrl: string;
};

export default function MangaCard({ id, title, purchasedVolumes, totalVolumes, imageUrl, bannerImgUrl } : CardProps) {

    const { setMangaData } = useMangaDetailsStore()

    const handleSelectedMangaData = () => {  
        setMangaData({
            id,
            title,
            purchasedVolumes,
            totalVolumes,
            coverImageUrl: imageUrl,
            bannerImgUrl,
        })
    }

    return (
        <Link
        href={{
            pathname: '/details/[id]',
            params: { 
                id,
            },
        }}
        onPress={handleSelectedMangaData}
        >
                <View style={styles.card}>
                    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
                    <View style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{`${purchasedVolumes}/${totalVolumes}`}</Text>
                    </View>
                </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', 
        padding: 10,
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center', 
    },
    image: {
        width: 160,
        height: 200,
        borderRadius: 8,
        marginRight: 10, 
    },
    content: {
        flex: 1, 
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
  });
