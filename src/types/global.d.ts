type React = import("react");

type FCWithChildren<T = unknown> = React.FC<React.PropsWithChildren<T>>;
