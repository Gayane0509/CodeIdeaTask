#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MessageModule, NSObject)

RCT_EXTERN_METHOD(sendMessage:(NSString *)message callback:(RCTResponseSenderBlock)callback)

@end
