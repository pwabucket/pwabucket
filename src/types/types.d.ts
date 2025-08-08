export type DynamicAsProp<T extends React.ElementType> = {
  as?: T;
};

export type DynamicComponentProps<
  T extends React.ElementType,
  ExtraProps = object
> = DynamicAsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ExtraProps | "as"> &
  ExtraProps;

export type DynamicComponent<
  DefaultComponent extends React.ElementType,
  ExtraProps = object
> = <T extends React.ElementType = DefaultComponent>(
  props: DynamicComponentProps<T, ExtraProps> & {
    ref?: React.Ref<React.ElementRef<T>>;
  }
) => React.ReactElement | null;
