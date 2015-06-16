//
//  ViewController.h
//  ChiApp
//
//  Created by wcweb on 11/6/15.
//
//

#import <UIKit/UIKit.h>
#import "ASIHTTPRequest.h"
#import "ASINetworkQueue.h"
#import "SBJSON4.h"
#import "FCFileManager.h"
#import "ZipArchive.h"

@interface ViewController : UIViewController
{
    ASIHTTPRequest *request;
    ASINetworkQueue *networkQueue;
    
}
- (IBAction)BT_download:(id)sender;
- (IBAction)deleteBook:(id)sender;
@property (weak, nonatomic) IBOutlet UIProgressView *downloadProgress;

@end

