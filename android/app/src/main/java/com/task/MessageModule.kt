package com.task

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class MessageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "MessageModule"
    }

    @ReactMethod
    fun sendMessage(message: String, callback: Callback) {
        val response = "Received from Android: $message"
        callback.invoke(response) 
    }
}
