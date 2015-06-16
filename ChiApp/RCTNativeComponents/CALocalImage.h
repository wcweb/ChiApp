//
//  CALocalImage.h
//  ChiApp
//
//  Created by wcweb on 12/6/15.
//
//

#import <UIKit/UIKit.h>
#import "ASIHTTPRequest.h"
#import "ASINetworkQueue.h"
#import "SBJSON4.h"
#import "FCFileManager.h"
#import "ZipArchive.h"


@interface CALocalImage : UIView
{
    NSMutableArray *_jsonData;
    NSMutableArray *bookList;
    NSString *tempDir;
    NSString *downloadURL;
    BOOL failed;
    NSMutableDictionary *resourcesfile;
    ASIHTTPRequest *request;
    ASINetworkQueue *networkQueue;
    
}
-(void)downloadBook;
-(void)deleteBook;



@property (nonatomic) NSString *relativeSrc;
@property (nonatomic) NSString *absoluteSrc;
@end
