#import "Haptics.h"
#import <React/RCTLog.h>

@implementation Haptics

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _notificationGenerator = [UINotificationFeedbackGenerator new];
        [_notificationGenerator prepare];
        
        _selectionGenerator = [UISelectionFeedbackGenerator new];
        [_selectionGenerator prepare];
        
        _impactStyles = @{
            @"light": @(UIImpactFeedbackStyleLight),
            @"medium": @(UIImpactFeedbackStyleMedium),
            @"heavy": @(UIImpactFeedbackStyleHeavy),
            @"soft": @(UIImpactFeedbackStyleSoft),
            @"rigid": @(UIImpactFeedbackStyleRigid)
        };

        _notificationTypes = @{
            @"success": @(UINotificationFeedbackTypeSuccess),
            @"warning": @(UINotificationFeedbackTypeWarning),
            @"error": @(UINotificationFeedbackTypeError)
        };
    }
    return self;
}

- (void)impact:(NSString *)style
        resolve:(nonnull RCTPromiseResolveBlock)resolve
        reject:(nonnull RCTPromiseRejectBlock)reject
{
  NSNumber *styleValue = self.impactStyles[style];

  if (!styleValue) {
    reject(@"E_INVALID_STYLE", [NSString stringWithFormat:@"Invalid impact style '%@'", style], nil);
    return;
  }
  UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc]
                                          initWithStyle:(UIImpactFeedbackStyle)styleValue.integerValue];
  [generator prepare];
  [generator impactOccurred];

  resolve(nil);
}

- (void)notification:(NSString *)type
        resolve:(nonnull RCTPromiseResolveBlock)resolve
        reject:(nonnull RCTPromiseRejectBlock)reject
{
  NSNumber *typeValue = self.notificationTypes[type];

  if (!typeValue) {
    reject(@"E_INVALID_TYPE", [NSString stringWithFormat:@"Invalid notification type '%@'", type], nil);
    return;
  }
  [self.notificationGenerator notificationOccurred:(UINotificationFeedbackType)typeValue.integerValue];
  resolve(nil);
}

- (void)selection:(nonnull RCTPromiseResolveBlock)resolve
        reject:(nonnull RCTPromiseRejectBlock)reject {
  [self.selectionGenerator prepare];
  [self.selectionGenerator selectionChanged];
  resolve(nil);
}

- (void)androidHaptics:(nonnull NSString *)type
        resolve:(nonnull RCTPromiseResolveBlock)resolve
        reject:(nonnull RCTPromiseRejectBlock)reject {
  resolve(nil);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeHapticsSpecJSI>(params);
}

@end
