import { db } from '@/services/firebaseConfig';
import { Link } from 'expo-router';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type CardProps = {
    id: string;
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
    imageUrl: string;
};

export default function MangaCard({ id, title, purchasedVolumes, totalVolumes, imageUrl } : CardProps) {

    return (
        <Link
        href={{
            pathname: '/details/[id]',
            params: { 
                id,
                title,
                purchasedVolumes,
                totalVolumes 
            },
        }}
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
