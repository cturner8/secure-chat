import { useEffect, useState } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function NoSSR({ children }: Props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return <>{isClient ? children : null}</>;
}
