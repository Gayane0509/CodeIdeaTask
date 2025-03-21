import Foundation
import Foundation
import React

@objc(MessageModule)
class MessageModule: NSObject {

  @objc func sendMessage(_ message: String, callback: @escaping RCTResponseSenderBlock) {
    let response = "Received from iOS: \(message)"
    callback([response])
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
