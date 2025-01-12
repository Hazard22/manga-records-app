import { useMangaDetailsStore } from '@/store/useMangaDetailsStore'
import React, { useEffect, useRef } from 'react'
import { Animated, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper';

export default function MangaDetailsBanner() {

    const { manga } = useMangaDetailsStore()

    const slideAnim = useRef(new Animated.Value(500)).current;

    const calcTotalVolumes = () => {  
        if(manga){
            return manga.volumes.length
        }
    }

    const calcPurchasedVolumes = () => {  
        if(manga){
            return manga.volumes.filter((volume) => volume.bought).length
        }
    }

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,  // Desplazarse a la posición original
            duration: 500,  // Duración de la animación
            useNativeDriver: true,  // Usar el driver nativo para mejor rendimiento
        }).start()
    }, [slideAnim])
    

    return (
        <View style={styles.banner}>
            <Animated.View style={[styles.imageWrapper, { transform: [{ translateX: slideAnim }] }]}>
                {manga?.bannerImgUrl && (
                    <ImageBackground
                    source={{ uri: manga.bannerImgUrl }}
                    style={styles.imageBackground}
                    imageStyle={styles.imageBackgroundStyle}
                />
                )}
            </Animated.View>
            <View style={styles.content}>
                <View style={styles.bannerHeader}>
                    <Text style={styles.title}>{manga?.title}</Text>
                    <IconButton icon='image-edit-outline'/>
                </View>
                <View style={styles.data}>
                    <Text style={styles.dataText}>
                        Comprados: {calcPurchasedVolumes()}/{calcTotalVolumes()}
                    </Text>
                    <Text style={styles.dataText}>Estatus: En curso</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        padding: 0,
        marginBottom: 5,  // Espacio en la parte inferior
        overflow: 'hidden',  // Asegura que cualquier contenido que se desborde verticalmente sea ocultado
        backgroundColor: 'rgb(77, 67, 87)'
    },
    imageWrapper: {
        width: '100%',
        height: 180,
        justifyContent: 'center',  // Centra la imagen
        borderRadius: 8,
        overflow: 'hidden',  // Asegura que la imagen no se desborde
    },
    imageBackground: {
        width: '100%',
        height: '100%',  // Asegura que la imagen ocupe todo el espacio del contenedor
        justifyContent: 'center',
    },
    imageBackgroundStyle: {
        borderRadius: 8,  // Redondea las esquinas de la imagen de fondo
    },
    content: {
        position: 'absolute',  // Esto asegura que el texto esté sobre la imagen
        top: '10%',
        left: 10,
        right: 10,
        bottom: 10,
    },
    bannerHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',  // Asegúrate de que el texto sea visible en el fondo
    },
    data: {
        flexDirection: 'column',
    },
    dataText: {
        fontSize: 22,
        color: 'white',
    },
});