import { useIsFetching } from "@tanstack/react-query";
import PageSpinner from "./PageSpinner";
export default function GlobalPageSpinner() {
  const isFetching = useIsFetching();

  return <PageSpinner isLoading={!!isFetching}></PageSpinner>;
}
