#import <HapticsSpec/HapticsSpec.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Haptics : NSObject <NativeHapticsSpec>

@property (nonatomic, strong) UISelectionFeedbackGenerator *selectionGenerator;
@property (nonatomic, strong) UINotificationFeedbackGenerator *notificationGenerator;
@property (nonatomic, strong) NSMutableDictionary<NSString *, UIImpactFeedbackGenerator *> *impactGenerators;

@property (nonatomic, strong) NSDictionary<NSString *, NSNumber *> *impactStyles;
@property (nonatomic, strong) NSDictionary<NSString *, NSNumber *> *notificationTypes;

@end

NS_ASSUME_NONNULL_END
