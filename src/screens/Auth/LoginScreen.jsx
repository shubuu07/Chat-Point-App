import { View, Text, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import images from '../../constants/images'
import { COLORS, Hp } from '../../constants/theme';
import ButtonFill from '../../components/Button/ButtonFill'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextError from '../../components/ErrorComponent/TextError';
import { Eye, EyeSlash } from 'iconsax-react-native'
import { snackbarToast } from '../../Helper/PriceFormater';
import { loginUser } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

    const { handleSubmit, register, reset, control, watch, formState: { errors } } = useForm();
    const [togglePass, settogglePass] = useState(true);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch()

    //====================== Custom validation function for email =============================
    const validateEmail = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (emailPattern.test(value)) {
            return true;
        }
        return 'Invalid email address*';
    };

    //====================== Custom validation function for Password ========================

    const validatePassword = (password) => {
        if (password.length < 4) return 'Password must be at least 4 characters long*';
        return true;
    };


    const onSubmit = async (data) => {
        try {
            setLoader(true)
            await loginUser(data).then(async res => {
                console.log("🚀 ~ file: LoginScreen.jsx:46 ~ awaitloginUser ~ res:", res?.data)
                if (res?.status === "success") {
                    dispatch(setUserDetails(res?.data))
                    snackbarToast({ text: "Login Successfully", type: "success" })
                    await AsyncStorage.setItem('@token', res?.token);
                    setLoader(false)
                    navigation.replace('Home')
                } else {
                    setLoader(false)
                    snackbarToast({ text: res?.message, type: "error" })
                }
            })
        } catch (error) {
            console.log("🚀 ~ file: RegistrationScreen.jsx:56 ~ onSubmit ~ error:", error)
            setLoader(false)
            snackbarToast({ text: error?.message, type: "error" })
        } finally {
            setLoader(false)
            reset()
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white ">
            <StatusBar backgroundColor="#fff" barStyle='dark-content' />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                behavior={'padding'}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                alwaysBounceVertical={false}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                enableAutomaticScroll={true}
                contentContainerStyle={{ rowGap: Hp(1), paddingVertical: Hp(2) }}
            >
                <FastImage source={images.Registar} style={{ width: "100%", height: Hp(26) }} resizeMode='cover' />
                <View className='space-y-2 pt-8' >
                    <Text className='font-ftBold text-black px-4' style={{ fontSize: Hp(3.6) }}>Login</Text>
                    <Text className='font-ftMed text-slate-400 px-4' style={{ fontSize: Hp(2) }}>Join our community and Expertence a seamless finding your relationship.</Text>
                    <View className="py-4 px-4 space-y-3 ios:space-y-5" >
                        <View className='space-y-2.5' >
                            <Text className='font-ftSemi text-black' style={{ fontSize: Hp(2.2) }}>Email</Text>
                            <View >
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email is required*",
                                        validate: validateEmail,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={{ fontSize: Hp(2.2) }}
                                            className="  py-3 font-ftSemi bg-slate1  rounded-full px-4 ios:py-[18px] text-black"
                                            placeholder="Enter your email"
                                            keyboardType="default"
                                            returnKeyType='next'
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            placeholderTextColor={"#94a3b8"}
                                            value={value}
                                            maxLength={40}
                                            onChangeText={onChange}
                                            cursorColor={COLORS.primary}
                                        />
                                    )}
                                />
                            </View>
                            {errors.email && <TextError title={errors.email.message} />}
                        </View>
                        <View className='space-y-2.5' >
                            <Text className='font-ftSemi text-black' style={{ fontSize: Hp(2.2) }}>Password</Text>
                            <View className='flex-row items-center py-1 font-ftSemi bg-slate1  rounded-full px-4 ios:py-[18px] text-black' >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "Password is required*",
                                        validate: validatePassword,
                                    }}
                                    name="password"
                                    render={({ field }) => (
                                        <TextInput
                                            className='flex-1 font-ftSemi  text-black'
                                            placeholder="••••••••••••"
                                            maxLength={30}
                                            secureTextEntry={togglePass}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ fontSize: Hp(2.2) }}
                                            placeholderTextColor={COLORS.darkGray}
                                            onChangeText={field.onChange}
                                            cursorColor={COLORS.primary}
                                            value={field.value}
                                        />
                                    )}
                                />
                                <TouchableOpacity activeOpacity={0.9} onPress={() => settogglePass(!togglePass)} className="absolute right-1 p-2 bg-transparent ">
                                    {togglePass ? <EyeSlash color={COLORS.darkGray} size={Hp(3)} /> :
                                        <Eye size={Hp(3)} color={COLORS.darkGray} />}
                                </TouchableOpacity>
                            </View>
                            {errors?.password && <TextError title={errors?.password?.message} />}
                        </View>
                    </View>
                    <View className='bg-white px-4 ios:pb-0 ' >
                        <ButtonFill onPress={handleSubmit(onSubmit)} title="Save" iosStyle={true} loader={loader} />
                    </View>
                    <View className='flex-row items-center justify-center ios:my-1.5'>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")} className="flex-row items-center pb-4" activeOpacity={0.9}>
                            <Text className="text-center text-slate-400  font-ftSemi" style={{ fontSize: Hp(2) }}>You don't have an account? </Text>
                            <Text className="text-blue-600 font-ftBold" style={{ fontSize: Hp(2) }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen