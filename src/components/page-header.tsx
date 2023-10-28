import { Header } from "./header";

interface Props {
  text: string;
}
type Component = (props: Props) => JSX.Element;

export const PageHeader: Component = ({ text }) => {
  return (
    <div className="bg-white h-24 p-4 border-b-2 border-black-200">
      <Header text={text} />
    </div>
  );
};
