import React from "react"
import {View, ActivityIndicator} from 'react-native'

const Loading = () => {

return <View style = {{flex: 1,justifyContent: 'center', alignItem:'center'}}>
    <ActivityIndicator size="large" color="grey" />
</View>
}

export default Loading;