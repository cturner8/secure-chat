interface Props {
  text: string;
}
type Component = (props: Props) => JSX.Element;

export const Header: Component = ({ text }) => {
  return <h1 className="mb-4 text-2xl font-medium">{text}</h1>;
};
