import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MangaCardSkeleton() {
    return (
        <View style={styles.card}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonContent}>
            <View style={styles.skeletonText} />
            <View style={styles.skeletonTextSmall} />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    skeletonImage: {
        width: 160,
        height: 200,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
        marginRight: 10,
    },
    skeletonContent: {
        flex: 1,
    },
    skeletonText: {
        width: '70%',
        height: 20,
        backgroundColor: '#e0e0e0',
        marginBottom: 8,
        borderRadius: 4,
    },
    skeletonTextSmall: {
        width: '50%',
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
});
