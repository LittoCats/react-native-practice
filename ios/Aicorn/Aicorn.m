/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:51:03
 *  @Modified  2019-11-02 12:00:40
 *
 *  Copyright (C) 2019 AICORN.C <developer@aicorn.cn>
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this document, and changing it is allowed as long as the
 *  name is changed.
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */


#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <React/RCTBridge.h>
#import <React/RCTPlatform.h>

@interface Aicorn : NSObject <RCTBridgeModule>

@end

@implementation Aicorn

RCT_EXPORT_MODULE(NativeAicorn)

+(BOOL)requiresMainQueueSetup {
  return YES;
}

-(NSDictionary *)constantsToExport {
  NSMutableDictionary* constants = [NSMutableDictionary new];
  
  // device info
  {
    NSMutableDictionary* platform = [NSMutableDictionary new];
    
    UIDevice* device = [UIDevice currentDevice];
    platform[@"udid"] = [device identifierForVendor];
    platform[@"name"] = [device name];
    platform[@"model"] = [device model];
    platform[@"localizedModel"] = [device localizedModel];
    
    UIScreen* screen = [UIScreen mainScreen];
    platform[@"size"] = @{
      @"width": @([screen bounds].size.width),
      @"height": @([screen bounds].size.height)
    };
    platform[@"scale"] = @([screen scale]);
    platform[@"nativeSize"] = @{
      @"width": @([screen nativeBounds].size.width),
      @"height": @([screen nativeBounds].size.height)
    };
    platform[@"nativeScale"] = @([screen nativeScale]);
    
    constants[@"platform"] = platform;
  }
  
  // window
  {
    NSMutableDictionary* window = [NSMutableDictionary new];
    UIWindow* uiwindow = [[[UIApplication sharedApplication] delegate] window];
    
    if (@available(iOS 11, *)) {
      window[@"safeAreaInsets"] = @{
        @"top": @(uiwindow.safeAreaInsets.top),
        @"left": @(uiwindow.safeAreaInsets.left),
        @"right": @(uiwindow.safeAreaInsets.right),
        @"bottom": @(uiwindow.safeAreaInsets.bottom),
      };
    } else {
      window[@"safeAreaInsets"] = @{
        @"top": @(0),
        @"left": @(0),
        @"right": @(0),
        @"bottom": @(0),
      };
    }
    
    constants[@"window"] = window;
  }
  return constants;
}

@end
