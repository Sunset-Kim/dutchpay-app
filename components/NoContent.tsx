interface NoContentProps extends React.PropsWithChildren {}

export default function NoContent({ children }: NoContentProps) {
  return <div>{children}</div>;
}
