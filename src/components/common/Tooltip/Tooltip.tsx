import { cloneElement, useState } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from '@floating-ui/react-dom-interactions';

import * as S from './Tooltip.styles';

interface Props {
  label: string;
  placement?: Placement;
  children: JSX.Element;
}

export const TooltipComponent = ({
  children,
  label,
  placement = 'top',
}: Props) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props }),
      )}
      {open && (
        <S.TooltipStyle
          {...getFloatingProps({
            ref: floating,
            className: 'Tooltip',
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
          })}
        >
          {label}
        </S.TooltipStyle>
      )}
    </>
  );
};
