import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    SafeAreaView
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { MotiView, useAnimationState } from 'moti'
import { Shadow } from 'react-native-shadow-2';
import {
    IconButton,
    TextButton
} from '../../components';
import {
    COLORS,
    SIZES,
    FONTS,
    icons,
    images,
    constants
} from '../../constants';



const Walkthrough = ({ navigation }) => {

    // const [selectedOption, setSelectedOption] = useState(constants.scan_product_option.camera)

    // Moti
    const loaderAnimationState = useAnimationState({
        start: {
            opacity: 1
        },
        stop: {
            opacity: 0
        }
    })

    const productAnimationState = useAnimationState({
        hide: {
            opacity: 0,
            translateY: -10
        },
        show: {
            opacity: 1,
            translateY: 10
        }
    })

    // Handler

    React.useEffect(() => {
        productAnimationState.transitionTo('hide')
        loaderAnimationState.transitionTo('stop')
    }, [])

    // const requestCameraPermission = React.useCallback(async () => {
    //     const permission = await Camera.requestCameraPermission();
    //     if (permission == 'denied') await Linking.openSettings()
    // }, [])

    // Render
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: SIZES.padding * 2,
                    paddingBottom: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                    backgroundColor: COLORS.light,
                    zIndex: 1
                }}
            >
                {/* Close Button */}

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.close}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            //tintColor: COLORS.secondary
                        }}
                    />
                </TouchableOpacity>


                {/* <IconButton icon={icons.close} onPress={() => navigation.goBack()}
                    style={{
                        paddingTop: 50
                    }}
                /> */}

                {/* Title */}
                <Text
                    style={{
                        flex: 1,
                        marginLeft: SIZES.base,
                        ...FONTS.h2
                    }}
                >
                    Scan QR Code
                </Text>

                {/* Add Option */}
                <TouchableOpacity
                    onPress={() => console.log("flash")}
                >
                    <Image
                        source={icons.flash}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,

                        }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 90,
                    paddingTop: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <TextButton
                    label="Scan QR Code"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: COLORS.secondary
                    }}
                    onPress={() => console.log("Scanning...")}
                />
                {/* <TextButton
                    label="Scan Camera"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        marginLeft: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOption == constants.scan_product_option.camera ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOption == constants.scan_product_option.camera ? COLORS.secondary : COLORS.primary
                    }}
                    onPress={() => { setSelectedOption(constants.scan_product_option.camera) }}
                /> */}
            </View>
        )
    }

    function renderCamera() {
        return (
            <View
                style={{ flex: 1, backgroundColor: COLORS.transparent }}
            >
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={{ flex: 1 }}
                    captureAudio={false}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    //onBarCodeRead={onBarCodeRead}
                    androidCameraPermissionOptions={{
                        title: "Permission to use camera",
                        message: "ChekkitApp needs camera for barcode scanning",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }}
                >
                    {/* Loading  / Scanning View */}
                    <MotiView
                        state={loaderAnimationState}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.dark60
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h2,
                                color: COLORS.light
                            }}
                        >
                            Scanning...
                        </Text>
                    </MotiView>


                    {/* Scan Button */}

                    <View
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            bottom: SIZES.padding,
                            left: 0,
                            right: 0
                        }}
                    >
                        <IconButton
                            icon={icons.scan}
                            containerStyle={{
                                height: 60,
                                width: 60,
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.light
                            }}
                            iconStyle={{
                                width: 50,
                                height: 50,
                                tintColor: COLORS.primary
                            }}
                            onPress={() => {
                                loaderAnimationState.transitionTo('start')
                                setTimeout(() => {
                                    loaderAnimationState.transitionTo('stop')
                                    productAnimationState.transitionTo('show')
                                }, 2000)
                            }}
                        />
                    </View>


                    {/* Product */}
                    <MotiView
                        state={productAnimationState}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120,
                            paddingVertical: SIZES.radius,
                            alignItems: 'center',
                            zIndex: 1
                        }}
                    >
                        <Shadow>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    width: SIZES.width - (SIZES.padding * 2),
                                    alignItems: 'center',
                                    paddingHorizontal: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.light
                                }}
                            >
                                <Image
                                    source={images.nivea1}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30
                                    }}
                                />
                                {/* Product Name */}
                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: SIZES.radius
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            color: COLORS.primary
                                        }}
                                    >
                                        Product Name
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body4,

                                        }}
                                    >
                                        Nivea
                                    </Text>
                                </View>
                                {/* <Text
                                    style={{
                                        ...FONTS.h4,
                                        color: COLORS.primary,
                                        marginTop: SIZES.padding
                                    }}
                                >
                                    Scan Completed
                                </Text> */}
                            </TouchableOpacity>
                        </Shadow>
                    </MotiView>


                    {/* {renderHeader()}
                {renderScanFocus()}
                {renderPaymentMethods()} */}
                </RNCamera>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* renderCamera */}
            {renderCamera()}


            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default Walkthrough;