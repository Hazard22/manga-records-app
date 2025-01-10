import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MangaVolumeCardSkeleton() {
    return (
        <View style={styles.skeletonCard}>
            <View style={styles.skeletonCover} />
        </View>
    );
}

const styles = StyleSheet.create({
    skeletonCard: {
        width: 160,
        height: 200,
        borderRadius: 8,
        backgroundColor: '#e0e0e0', 
        overflow: 'hidden',
        marginBottom: 5,
    },
    skeletonCover: {
        flex: 1,
        backgroundColor: '#d6d6d6', 
    },
});