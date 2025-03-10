import { HeaderReturnButton } from "@/components/HeaderButton";

import AppLayout from "./AppLayout";

export default function InnerAppLayout(props) {
  return <AppLayout {...props} headerLeftContent={<HeaderReturnButton />} />;
}
