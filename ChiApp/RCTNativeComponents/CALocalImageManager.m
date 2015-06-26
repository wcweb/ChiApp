//
//  CALocalImageManager.m
//  ChiApp
//
//  Created by wcweb on 12/6/15.
//
//

#import "CALocalImageManager.h"
#import "RCTEventDispatcher.h"
#import "RCTBridge.h"
#import "RCTLog.h"
#import "UIView+React.h"
#import "CALocalImage.h"


@implementation CALocalImageManager
{
    CALocalImage *calocalimage;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

RCT_CUSTOM_VIEW_PROPERTY(src, NSURL, CALocalImage)
{
    [RCTConvert NSURL:json];
}

RCT_EXPORT_METHOD(downloadBook:(RCTResponseSenderBlock) callback)
{
    [calocalimage downloadBook];
    RCTLogInfo(@"Pretending to downloadBook");
    NSLog(@"pretend to download");
    
    NSMutableDictionary *jsonback = [[NSMutableDictionary alloc] init];
    jsonback[@"something"] = @"waaaaa";
    jsonback[@"badge"] = @"badge is fuck badge";
    
    [_bridge.eventDispatcher sendAppEventWithName:@"clickDownloadBtn" body:jsonback];
    
    
    NSUInteger types = 0;
    if ([UIApplication instancesRespondToSelector:@selector(currentUserNotificationSettings)]) {
        types = [[[UIApplication sharedApplication] currentUserNotificationSettings] types];
    } else {
        
#if __IPHONE_OS_VERSION_MIN_REQUIRED < __IPHONE_8_0
        
        types = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
        
#endif
    }
    
    NSMutableDictionary *permissions = [[NSMutableDictionary alloc] init];
    permissions[@"alert"] = @((types & UIUserNotificationTypeAlert) > 0);
    permissions[@"badge"] = @((types & UIUserNotificationTypeBadge) > 0);
    permissions[@"sound"] = @((types & UIUserNotificationTypeSound) > 0);
    
    callback(@[permissions]);
//    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//        // Call long-running code on background thread
//        ...
//        // You can invoke callback from any thread/queue
//        callback(@[...]);
//    });
    
}

    - (void)testDownLoad{
    NSLog(@"pretend to testDownLoad");

}

    - (void)setBridge:(RCTBridge *)bridge
    {
        _bridge = bridge;
    }
- (UIView *) view
{
    calocalimage = [[CALocalImage alloc] init];
//    [calocalimage downloadBook];
    
    NSMutableDictionary *jsonback = [[NSMutableDictionary alloc] init];
    jsonback[@"something"] = @"waaaaa";
    jsonback[@"badge"] = @"badge is fuck badge";
    
    // send twice?
    [_bridge.eventDispatcher sendAppEventWithName:@"initCALocalImage" body:jsonback];
    
    
    return calocalimage;
}

RCT_EXPORT_METHOD(sendEvent)
{
    NSMutableDictionary *jsonback = [[NSMutableDictionary alloc] init];
    jsonback[@"something"] = @"waaaaa";
    jsonback[@"badge"] = @"badge is fuck badge";
    [_bridge.eventDispatcher sendAppEventWithName:@"initCALocalImage" body:jsonback];
    
//    [_bridge.eventDispatcher sendEvent:<#(id<RCTEvent>)#>]

}

//- (void)onChange:(CALocalImage *) sender
//{
//    if (sender.wasOn != sender.on){
//        [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:@{
//                                                                                @"target":sender.reactTag,
//                                                                                @"value":@(sender.on)
//                                                                                }];
//        sender.wasOn = sender.on;
//    }
//}

//RCT_EXPORT_VIEW_PROPERTY(onTintColor, UIColor);
//RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor);
//RCT_EXPORT_VIEW_PROPERTY(thumbTintColor, UIColor);
//RCT_EXPORT_VIEW_PROPERTY(on, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL);



@end
