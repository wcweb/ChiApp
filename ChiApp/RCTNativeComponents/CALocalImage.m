//
//  CALocalImage.m
//  ChiApp
//
//  Created by wcweb on 12/6/15.
//
//

#import "CALocalImage.h"

#import "RCTViewManager.h"


@implementation CALocalImage

//RCT_EXPORT_MODULE()
//RCT_EXPORT_VIEW_PROPERTY(pitchEnabled, BOOL)

- (UIView *) view
{
//    return [[MKMapView alloc] init];
    return [[UIView alloc] init];
}

- (NSURL *) setAbsolutePath
{
    
   NSString *filePath = [[NSBundle mainBundle] pathForResource:_relativeSrc ofType:@"png"];
    _absoluteSrc = filePath;
    NSURL *urlPath = [NSURL URLWithString:filePath];
    return urlPath;
}

@end
