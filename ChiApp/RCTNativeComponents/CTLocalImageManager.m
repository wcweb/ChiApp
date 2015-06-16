//
//  CTLocalImageManager.m
//  RCTLocalImage
//
//  Created by wcweb on 11/6/15.
//
//

#import "CTLocalImageManager.h"


#import "RCTEventDispatcher.h"
#import "RCTBridge.h"
#import "RCTLocalImage.h"
#import "UIView+React.h"


@implementation CTLocalImageManager
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()


- (UIView *) view
{
    RCTLocalImage   *loi = [[RCTLocalImage alloc] init];
    return loi;
}

- (void)onChange:(RCTLocalImage *) sender
{
    if (sender.wasOn != sender.on){
        [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:@{
                                                                                @"target":sender.reactTag,
                                                                                @"value":@(sender.on)
                                                                                }];
        sender.wasOn = sender.on;
    }
}

RCT_EXPORT_VIEW_PROPERTY(onTintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(thumbTintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(on, BOOL);
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL);


@end
