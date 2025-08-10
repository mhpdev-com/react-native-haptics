#import "Haptics.h"

static inline void runOnMainThread(dispatch_block_t block) {
  if ([NSThread isMainThread]) {
    block();
  } else {
    dispatch_async(dispatch_get_main_queue(), block);
  }
}

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
      
      _impactGenerators = [NSMutableDictionary new];

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
  runOnMainThread(^{
    UIImpactFeedbackGenerator *generator = self.impactGenerators[style];

    if (!generator) {
      generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:(UIImpactFeedbackStyle)styleValue.integerValue];
      [generator prepare];
      self.impactGenerators[style] = generator;
    }
    [generator impactOccurred];
  });
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
  runOnMainThread(^{
    [self.notificationGenerator notificationOccurred:(UINotificationFeedbackType)typeValue.integerValue];
  });
  resolve(nil);
}

- (void)selection:(nonnull RCTPromiseResolveBlock)resolve
        reject:(nonnull RCTPromiseRejectBlock)reject {
  runOnMainThread(^{
    [self.selectionGenerator selectionChanged];
  });
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
