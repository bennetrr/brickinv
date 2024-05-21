import * as React from "react";
import useIconButtonDependencies from "../hooks/UseIconButtonDependencies.ts";
import useIconButtonVariation from "../hooks/UseIconButtonVariation.ts";
import IIconButtonProps from "../IIconButtonProps.ts";
import { Icon } from '../../icon';
import { StackLayout } from '../../stackLayout';

const IconButtonImplementation: React.FC<IIconButtonProps> = React.forwardRef(
  (
    {
      style,
      className,
      onPress,
      disabled,
      icon,
      elementName,
      type = "button",
      automationId,
      isLoading,
    },
    ref
  ) => {
    const { iconVariation } = useIconButtonVariation();
    const { loadingIndicator } = useIconButtonDependencies();

    const content = isLoading ? loadingIndicator() : (
      <Icon
        icon={icon}
        variationKey={iconVariation}
      />
    );

    return (
      <button
        ref={ref as any}
        type={type}
        style={style}
        className={className}
        onClick={onPress}
        disabled={disabled}
        role="button"
        name={elementName}
        data-automation-id={automationId}
      >
        <StackLayout
          hCenter
          vCenter
        >
          {content}
        </StackLayout>
      </button>
    );
  }
);

export default IconButtonImplementation;
