//
//  RCTMapManager.m
//  ChiApp
//
//  Created by wcweb on 11/6/15.
//
//

#import "RCTMaperManager.h"
#import "RCTViewManager.h"
#import <MapKit/MapKit.h>


@implementation RCTMaperManager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(pitchEnabled, BOOL)

- (UIView *) view
{
    return [[MKMapView alloc] init];
}
@end
