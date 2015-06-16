//
//  ViewController.m
//  ChiApp
//
//  Created by wcweb on 11/6/15.
//
//

#import "ViewController.h"
#import "ReactView.h"

@interface ViewController ()
{
    NSMutableArray *_jsonData;
    NSMutableArray *bookList;
    NSString *tempDir;
    NSString *downloadURL;
    BOOL failed;
    NSMutableDictionary *resourcesfile;
}

@property (weak, nonatomic) IBOutlet ReactView *reactView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    tempDir = @"/testDemo";
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


#pragma deleteBook





- (IBAction)deleteBook:(id)sender {
    [FCFileManager removeItemsInDirectoryAtPath:tempDir];
    bookList = nil;
}

#pragma fetchJson->handleJson
- (IBAction)BT_download:(id)sender {
    
    
    if([FCFileManager isDirectoryItemAtPath:tempDir]){
        [FCFileManager removeItemsInDirectoryAtPath:tempDir];
    }else{
        [FCFileManager createDirectoriesForPath:tempDir];
    }
    
    NSString *fetchJsonUrl = @"http://localhost:5000/getlist";
    NSURL *url = [NSURL URLWithString:fetchJsonUrl];
    request = [ASIHTTPRequest requestWithURL:url];

    [request addRequestHeader:@"User-Agent" value:@"ASIHTTPRequest"];
    [request addRequestHeader:@"Content-Type" value:@"application/json"];
    [request setDelegate:self];
    [request startAsynchronous];
    
    
}

-(void)requestFinished:(ASIHTTPRequest  *)httprequest
{
    NSData *responseData = [httprequest responseData];
    NSString *outString = [[NSString alloc] initWithData:responseData encoding:NSUTF8StringEncoding];
    NSLog(@" %@ ",outString);
    
    SBJson4ValueBlock block = ^(id v, BOOL *stop){

        BOOL isObject = [v isKindOfClass:[NSMutableDictionary class]];
        NSLog(@"Found: %@", @([v isKindOfClass:[NSMutableDictionary class]]));
        if(isObject){
            if ([v objectForKey:@"zip" ]){
                downloadURL = [v objectForKey:@"zip" ];
            }
            NSLog(@"zip source: %@", [v objectForKey:@"zip" ]);
        }

    };
    SBJson4ErrorBlock eh = ^(NSError* err) {
        NSLog(@"OOPS: %@", err);
    };
    id parser = [SBJson4Parser parserWithBlock:block allowMultiRoot:NO unwrapRootArray:YES errorHandler:eh];
   

     [parser parse:responseData];
    
    [self downloadFileInJSON];

}



#pragma downloadfile->unarchiver->writeIntoDatabase

- (void)downloadFileInJSON{
    if(!networkQueue){
        networkQueue = [[ASINetworkQueue alloc] init];
        
    }
    failed = NO;
    
    
    [networkQueue reset];
    [networkQueue setRequestDidFailSelector:@selector(DownLoadFailed:)];
    [networkQueue setRequestDidFinishSelector:@selector(DownLoadComplete:)];
    
    [networkQueue setDelegate:self];
    

    NSLog(@"download file from: %@", downloadURL);
    request = [ASIHTTPRequest requestWithURL:[NSURL URLWithString:downloadURL]];
    
    [request setDownloadDestinationPath:[[FCFileManager pathForDocumentsDirectoryWithPath:tempDir] stringByAppendingPathComponent:@"001.zip"]];
    //[request setTemporaryFileDownloadPath:[[FCFileManager pathForTemporaryDirectoryWithPath:tempDir] stringByAppendingPathComponent:@"001.zip"]];
    
    
    [request setDownloadProgressDelegate:self];// how delegat
    
    [request setAllowResumeForFileDownloads:YES];
    [request setUserInfo:[NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithInt:1], @"nameID", nil]];
    
    //[request setUserInfo:[NSDictionary dictionaryWithObject:userinfo forKey:@"book"]];
    [networkQueue addOperation:request];
    
    
    
    [networkQueue go];
//    NSUserDefaults *userDefaults = nsuserdefaults 
    
}

#pragma mark -
#pragma mark ASIProgressDelegate method

- (void)request:(ASIHTTPRequest *)request didReceiveBytes:(long long)bytes{
    NSLog(@"didReceiveBytes : %lld", bytes);
}
- (void)setProgress:(float)newProgress {//进度条的代理
    NSLog(@"setProgress : %f", newProgress);
//    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
//    //从持久化里面取出内容的总大小
//    self.contentLength = [[userDefaults objectForKey:[NSString stringWithFormat:@"book_%d_contentLength",bookID]] floatValue];
//    //设置进度文本
//    downText.text = [NSString stringWithFormat:@"%.2f/%.2fM",self.contentLength*newProgress,self.contentLength];
//    //设置自己的进度条
//    imageProView.frame = CGRectMake(75, 121, 150*newProgress, 4);
//    //设置系统的进度条
//    zztjProView.progress = newProgress;
}
//-(void)downloadProgress:(ASIHTTPRequest *)request
//{
//    
//}

- (void)DownLoadComplete:(ASIHTTPRequest *)request
{
    
    
    NSArray *files = [FCFileManager listFilesInDirectoryAtPath:[FCFileManager pathForDocumentsDirectoryWithPath:tempDir]];
    NSLog(@"array: %@", files);
    BOOL testFileExists = [FCFileManager existsItemAtPath:@"/testDemo/001.zip"];
    NSLog(@"download complete %@",@(testFileExists));
    
    ZipArchive *unzip = [[ZipArchive alloc] init];
    BOOL result;
    
    if([FCFileManager isDirectoryItemAtPath:@"/testDemo/001/"]){
        [FCFileManager removeItemsInDirectoryAtPath:@"/testDemo/001/"];
    }else{
        [FCFileManager createDirectoriesForPath:@"/testDemo/001/"];
    }
    
    if ([unzip UnzipOpenFile:[FCFileManager pathForDocumentsDirectoryWithPath:@"/testDemo/001.zip"]]) {
        result = [unzip UnzipFileTo:[FCFileManager pathForDocumentsDirectoryWithPath:@"/testDemo/001/"] overWrite:YES];
        if(!result){
            NSLog(@"unzip fail.....");
        }else{
            [self performSelector:@selector(finishUnzip) withObject:nil afterDelay:3];
        }
    }
    [unzip UnzipCloseFile];
    
}
- (void)finishUnzip
{
    NSLog(@"unzip finish....");
    
    
    NSData *packageJSON = [FCFileManager readFileAtPathAsData:@"/testDemo/001/package.json" ];
    

    
    SBJson4ValueBlock block = ^(id v, BOOL *stop){
        NSLog(@"*");
        BOOL isObject = [v isKindOfClass:[NSMutableDictionary class]];
        NSLog(@"Found: %@ dictionary ", @([v isKindOfClass:[NSMutableDictionary class]]));
    
        if(isObject){
            
             resourcesfile = [v mutableCopy]  ;
            
            if ([v objectForKey:@"resoures" ]){
                NSLog(@"resoures source: %@", [v objectForKey:@"resoures" ]);
            }
            NSLog(@"main source: %@", [v objectForKey:@"main" ]);
        }
        
    };
    SBJson4ErrorBlock eh = ^(NSError* err) {
        NSLog(@"OOPS: %@", err);
    };
    id parser = [SBJson4Parser parserWithBlock:block allowMultiRoot:NO unwrapRootArray:NO errorHandler:eh];
    
    
   NSLog(@"main source: %@", [resourcesfile objectForKey:@"main" ]);// null
    
    switch ( [parser parse:packageJSON]) {
        case SBJson4ParserError:
            NSLog(@"Found an error");
                      break;
        case SBJson4ParserComplete:
        case SBJson4ParserStopped:
            parser = nil;
            break;
        case SBJson4ParserWaitingForData:
            NSLog(@"Waiting for more data!");
            break;
    }
}
- (void)DownLoadFailed:(ASIHTTPRequest *)request
{
    if (!failed) {
        NSLog(@"download failed");
        failed = YES;
    }
}



- (void)requestFailed:(ASIHTTPRequest *)request {
    	NSLog(@"down fail.....");
}

@end
