import { HeaderReturnButton } from "@/components/HeaderButton";

import AppLayout from "./AppLayout";

export default function InnerAppLayout(
  props: React.ComponentProps<typeof AppLayout>
) {
  return <AppLayout {...props} headerLeftContent={<HeaderReturnButton />} />;
}
