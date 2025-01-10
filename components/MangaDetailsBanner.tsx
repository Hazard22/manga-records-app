import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type BannerProps = {
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
}

export default function MangaDetailsBanner({ title, purchasedVolumes, totalVolumes }: BannerProps) {
  return (
    <View style={styles.banner}>
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.dataText}>Comprados: {purchasedVolumes}/{totalVolumes}</Text>
            <Text style={styles.dataText}>Estatus: En curso</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    banner:{
        padding: 10,
        borderRadius: 8,
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold'
    },
    data:{
        flexDirection: 'column',
    },
    dataText: {
        fontSize: 22
    }
})
