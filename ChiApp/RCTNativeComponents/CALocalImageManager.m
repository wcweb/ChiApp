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
#import "UIView+React.h"
#import "CALocalImage.h"


@implementation CALocalImageManager
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()


- (UIView *) view
{
    CALocalImage   *calocalimage = [[CALocalImage alloc] init];
    
    return calocalimage;
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

RCT_CUSTOM_VIEW_PROPERTY(src, NSURL, CALocalImage)
{
  [RCTConvert NSURL:json];
}
@end
